import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronLeft, Minus, Plus, StickyNote } from 'lucide-react'
import { EmptyState, ProgressBar } from '@/components/ui'
import { topics } from '@/data/content'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

export default function Learning() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [fontSize, setFontSize] = useState(16)
  const [showNotes, setShowNotes] = useState(false)
  const completed = useAppStore((s) => s.completedLessons)
  const completeLesson = useAppStore((s) => s.completeLesson)
  const bookmarks = useAppStore((s) => s.bookmarks)
  const toggleBookmark = useAppStore((s) => s.toggleBookmark)
  const notes = useAppStore((s) => s.notes)
  const setNote = useAppStore((s) => s.setNote)

  const found = topics.map((topic) => ({ topic, lesson: topic.lessons.find((l) => l.id === lessonId) })).find((x) => x.lesson)
  if (!found) return <EmptyState title="Materi tidak ditemukan" description="Lesson yang kamu cari belum tersedia." action={<Link className="btn btn-primary" to="/app/explore">Kembali ke Explore</Link>} />

  const { topic, lesson } = found
  const index = topic.lessons.findIndex((l) => l.id === lesson!.id)
  const isDone = completed.includes(lesson!.id)
  const doneCount = topic.lessons.filter((l) => completed.includes(l.id)).length
  const progress = topic.lessons.length ? Math.round((doneCount / topic.lessons.length) * 100) : 0

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to={`/app/topic/${topic.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-accent"><ArrowLeft size={15} /> {topic.title}</Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted hover:text-accent" aria-label="Kecilkan teks"><Minus size={15} /></button>
          <span className="text-xs font-bold text-muted">{fontSize}px</span>
          <button onClick={() => setFontSize(Math.min(22, fontSize + 1))} className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted hover:text-accent" aria-label="Perbesar teks"><Plus size={15} /></button>
          <button onClick={() => setShowNotes(!showNotes)} className={cn('btn !px-3 !py-2 !text-xs', showNotes ? 'btn-primary' : 'btn-outline')}><StickyNote size={15} /> Catatan</button>
          <button onClick={() => toggleBookmark(lesson!.id)} className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted hover:text-accent" aria-label="Bookmark">
            <Bookmark size={16} fill={bookmarks.includes(lesson!.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[210px_1fr_240px]">
        <aside className="card h-fit !p-3 lg:sticky lg:top-20">
          <p className="mb-3 px-2 font-display text-xs font-extrabold uppercase tracking-wide text-muted">Modul pembelajaran</p>
          <nav className="space-y-1" aria-label="Daftar modul">
            {topic.lessons.map((l, i) => {
              const done = completed.includes(l.id)
              const active = l.id === lesson!.id
              return (
                <Link key={l.id} to={`/app/learn/${l.id}`} className={cn('flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold', active ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-accent-soft/50')}>
                  <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-extrabold', done ? 'bg-success text-white' : active ? 'bg-accent text-white' : 'bg-bg')}>{done ? <Check size={13} /> : i + 1}</span>
                  <span className="truncate">{l.title}</span>
                </Link>
              )
            })}
          </nav>
          <div className="mt-4 px-2">
            <div className="mb-1.5 flex justify-between text-[11px] font-bold text-muted"><span>Progress</span><span>{progress}%</span></div>
            <ProgressBar value={progress} className="!h-1.5" />
          </div>
        </aside>

        <article className="card min-w-0 !p-6 md:!p-8">
          <span className="pill !py-1 !text-[11px]">Modul {index + 1} dari {topic.lessons.length}</span>
          <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{lesson!.title}</h1>
          <p className="mt-1.5 text-xs text-muted">Estimasi {lesson!.duration} menit dibaca</p>
          <div className="mt-7 space-y-5" style={{ fontSize }}>
            {lesson!.blocks.map((block, i) => {
              switch (block.type) {
                case 'heading':
                  return <h2 key={i} className="font-display text-xl font-extrabold">{block.text}</h2>
                case 'paragraph':
                  return <p key={i} className="leading-[1.85] text-muted">{block.text}</p>
                case 'callout':
                  return <div key={i} className="rounded-2xl border-l-4 border-accent bg-accent-soft p-4 text-sm leading-relaxed"><strong className="font-extrabold text-accent">Tips belajar · </strong>{block.text}</div>
                case 'quote':
                  return <blockquote key={i} className="border-l-2 border-line pl-4 font-display text-base font-bold italic text-muted">“{block.text}”</blockquote>
                case 'list':
                  return <ul key={i} className="space-y-2">{block.items?.map((item) => <li key={item} className="flex items-start gap-2 text-muted"><Check size={16} className="mt-1 shrink-0 text-success" /> {item}</li>)}</ul>
                case 'summary':
                  return <div key={i} className="rounded-2xl bg-bg p-4 text-sm leading-relaxed"><strong className="font-display font-extrabold">Ringkasan. </strong>{block.text}</div>
                default:
                  return null
              }
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <button
              disabled={index === 0}
              onClick={() => navigate(`/app/learn/${topic.lessons[index - 1].id}`)}
              className="btn btn-outline disabled:opacity-40"
            ><ChevronLeft size={16} /> Sebelumnya</button>
            {isDone ? (
              <span className="pill !bg-success/15 !text-success"><Check size={14} /> Modul selesai</span>
            ) : (
              <button onClick={() => completeLesson(lesson!.id)} className="btn btn-primary"><Check size={16} /> Tandai Selesai</button>
            )}
            {index < topic.lessons.length - 1 ? (
              <button onClick={() => navigate(`/app/learn/${topic.lessons[index + 1].id}`)} className="btn btn-primary">Berikutnya <ArrowRight size={16} /></button>
            ) : (
              <Link to={`/app/quiz/${topic.quizId}`} className="btn btn-primary">Coba Kuis <ArrowRight size={16} /></Link>
            )}
          </div>
        </article>

        <aside className={cn('space-y-4', showNotes ? 'block' : 'hidden lg:block')}>
          <div className="card !p-4">
            <p className="font-display text-sm font-extrabold">Catatan pribadi</p>
            <p className="mt-1 text-xs text-muted">Tersimpan di akunmu.</p>
            <textarea
              className="input mt-3 min-h-40 resize-y"
              placeholder="Tulis poin penting dari materi ini..."
              value={notes[lesson!.id] ?? ''}
              onChange={(e) => setNote(lesson!.id, e.target.value)}
            />
          </div>
          <div className="card !p-4">
            <p className="font-display text-sm font-extrabold">Poin penting</p>
            <ul className="mt-3 space-y-2 text-xs text-muted">
              {topic.objectives.slice(0, 3).map((o) => <li key={o} className="flex gap-2"><Check size={14} className="shrink-0 text-success" /> {o}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
