import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Clock, Lightbulb, PartyPopper, RotateCcw, X } from 'lucide-react'
import { EmptyState, ProgressBar } from '@/components/ui'
import { getQuiz, quizzes } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'
import type { QuizResult } from '@/store/useAppStore'

export function QuizPage() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const quiz = getQuiz(quizId ?? '')
  const submitQuiz = useAppStore((s) => s.submitQuiz)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [seconds, setSeconds] = useState(45)

  const question = quiz.questions[index]
  const score = quiz.questions.filter((q) => answers[q.id] === q.correctId).length

  useEffect(() => {
    setSeconds(45)
    const timer = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [index])

  useEffect(() => {
    if (seconds !== 0 || feedback || !question) return
    const choice = selected ?? ''
    setFeedback(choice === question.correctId ? 'correct' : 'wrong')
    setAnswers((prev) => ({ ...prev, [question.id]: choice }))
  }, [seconds, feedback, selected, question])

  const confirm = () => {
    if (!selected || feedback) return
    const correct = selected === question.correctId
    setFeedback(correct ? 'correct' : 'wrong')
    setAnswers((prev) => ({ ...prev, [question.id]: selected }))
  }

  const proceed = () => {
    if (!feedback) return
    if (index < quiz.questions.length - 1) {
      setIndex(index + 1)
      setSelected(null)
      setFeedback(null)
      return
    }
    const finalAnswers = { ...answers, [question.id]: selected! }
    const finalScore = quiz.questions.filter((q) => finalAnswers[q.id] === q.correctId).length
    const result: QuizResult = { quizId: quiz.id, score: finalScore, total: quiz.questions.length, answers: finalAnswers, completedAt: new Date().toISOString() }
    sessionStorage.setItem(`nalarin-quiz-${quiz.id}`, JSON.stringify(result))
    submitQuiz(result)
    navigate(`/app/quiz/${quiz.id}/result`)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-muted">Kuis · {quiz.topicTitle}</p>
          <h1 className="font-display text-xl font-extrabold sm:text-2xl">Pertanyaan {index + 1} dari {quiz.questions.length}</h1>
        </div>
        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-extrabold', seconds <= 10 ? 'bg-danger/15 text-danger' : 'bg-accent-soft text-accent')}>
          <Clock size={16} />
          {seconds === 0 ? 'Waktu habis' : `00:${String(seconds).padStart(2, '0')}`}
        </span>
      </div>

      <ProgressBar value={((index + (feedback ? 1 : 0)) / quiz.questions.length) * 100} />

      <div className="card !p-6">
        <h2 className="font-display text-lg font-extrabold leading-snug sm:text-xl">{question.prompt}</h2>
        <div className="mt-5 space-y-2.5">
          {question.options.map((opt) => {
            const isSelected = selected === opt.id
            const isCorrect = feedback && opt.id === question.correctId
            const isWrong = feedback && isSelected && opt.id !== question.correctId
            return (
              <button
                key={opt.id}
                disabled={Boolean(feedback)}
                onClick={() => setSelected(opt.id)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm transition-all',
                  isCorrect ? 'border-success bg-success/10' : isWrong ? 'border-danger bg-danger/10' : isSelected ? 'border-accent bg-accent-soft' : 'border-line hover:border-accent/50',
                )}
              >
                <span className={cn('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-xs font-extrabold', isCorrect ? 'border-success bg-success text-white' : isWrong ? 'border-danger bg-danger text-white' : isSelected ? 'border-accent bg-accent text-white' : 'border-line text-muted')}>
                  {isCorrect ? <Check size={13} /> : isWrong ? <X size={13} /> : opt.id.toUpperCase()}
                </span>
                <span className="leading-relaxed">{opt.label}</span>
              </button>
            )
          })}
        </div>

        {feedback && (
          <div className={cn('mt-5 rounded-2xl p-4 text-sm leading-relaxed', feedback === 'correct' ? 'bg-success/10' : 'bg-danger/10')}>
            <p className="flex items-center gap-2 font-display font-extrabold">
              {feedback === 'correct' ? <><Check size={16} className="text-success" /> Jawaban benar!</> : <><X size={16} className="text-danger" /> Belum tepat.</>}
            </p>
            <p className="mt-2 flex items-start gap-2 text-muted"><Lightbulb size={15} className="mt-0.5 shrink-0 text-warning" /> {question.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs text-muted">Skor sementara: <strong className="text-ink">{score}/{quiz.questions.length}</strong></p>
          {feedback ? (
            <button onClick={proceed} className="btn btn-primary">{index === quiz.questions.length - 1 ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'} <ArrowRight size={15} /></button>
          ) : (
            <button onClick={confirm} disabled={!selected} className="btn btn-primary">Konfirmasi Jawaban</button>
          )}
        </div>
      </div>
    </div>
  )
}

export function QuizResultPage() {
  const { quizId } = useParams()
  const result = useAppStore((s) => s.quizResults.find((r) => r.quizId === quizId))
  const stored = result ?? (() => {
    try {
      const raw = sessionStorage.getItem(`nalarin-quiz-${quizId}`)
      return raw ? (JSON.parse(raw) as QuizResult) : null
    } catch { return null }
  })()
  const quiz = quizzes.find((q) => q.id === quizId) ?? quizzes[0]

  if (!stored) return <EmptyState title="Belum ada hasil kuis" description="Selesaikan kuis terlebih dahulu untuk melihat hasilnya." action={<Link className="btn btn-primary" to="/app/explore">Cari materi</Link>} />

  const percentage = Math.round((stored.score / stored.total) * 100)
  const passed = percentage >= 60

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="card relative overflow-hidden text-center !py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-accent-soft blur-2xl" />
        <div className="relative">
          <span className="mx-auto block w-fit">{passed ? <PartyPopper size={48} className="text-success" /> : <RotateCcw size={48} className="text-accent" />}</span>
          <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">{passed ? 'Kuis selesai!' : 'Terus berlatih!'}</h1>
          <p className="mt-2 text-sm text-muted">{quiz.topicTitle}</p>
          <p className="mt-6 font-display text-5xl font-extrabold text-accent">{percentage}%</p>
          <p className="mt-1 text-sm text-muted">{stored.score} dari {stored.total} jawaban benar</p>
          <div className="mx-auto mt-5 max-w-xs"><ProgressBar value={percentage} /></div>
          <span className="pill mt-5 !bg-success/15 !text-success">+30 XP diperoleh</span>
        </div>
      </div>

      <section className="card">
        <h2 className="section-title">Pembahasan</h2>
        <div className="mt-4 space-y-4">
          {quiz.questions.map((q, i) => {
            const answer = stored.answers[q.id]
            const correct = answer === q.correctId
            return (
              <div key={q.id} className="rounded-2xl border border-line p-4">
                <p className="text-xs font-bold text-muted">Pertanyaan {i + 1}</p>
                <p className="mt-1 font-display text-sm font-extrabold">{q.prompt}</p>
                <p className={cn('mt-2 flex items-center gap-2 text-xs font-bold', correct ? 'text-success' : 'text-danger')}>
                  {correct ? <Check size={14} /> : <X size={14} />} Jawabanmu: {q.options.find((o) => o.id === answer)?.label ?? 'Tidak dijawab'}
                </p>
                {!correct && <p className="mt-1 text-xs font-bold text-success">Jawaban benar: {q.options.find((o) => o.id === q.correctId)?.label}</p>}
                <p className="mt-2 text-xs leading-relaxed text-muted">{q.explanation}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/app/explore" className="btn btn-primary flex-1">Lanjutkan Belajar <ArrowRight size={15} /></Link>
        <Link to={`/app/quiz/${quiz.id}`} className="btn btn-outline"><RotateCcw size={15} /> Coba Lagi</Link>
      </div>
    </div>
  )
}
