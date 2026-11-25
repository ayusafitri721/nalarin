import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const CDP = 'http://127.0.0.1:9222'
const OUT = join(process.cwd(), 'screenshots')
mkdirSync(OUT, { recursive: true })

const targets = await (await fetch(`${CDP}/json/list`)).json()
const page = targets.find((t) => t.type === 'page')
if (!page) throw new Error('No page target')

const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result)
  }
}
const send = (method, params = {}) => new Promise((res, rej) => {
  const n = ++id
  pending.set(n, { res, rej })
  ws.send(JSON.stringify({ id: n, method, params }))
})

await send('Page.enable')
await send('Runtime.enable')

for (const [width, height] of [[1440, 1000], [1280, 900], [768, 1024], [390, 844]]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 })
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
  await new Promise((r) => setTimeout(r, 1800))

  const metrics = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      theme: document.documentElement.dataset.theme || 'none',
      bg: getComputedStyle(document.querySelector('.landing-light')).backgroundColor,
      brokenImages: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)
    })`,
  })
  console.log(width, JSON.stringify(metrics.result.value))

  const layout = await send('Page.getLayoutMetrics')
  const contentHeight = Math.min(Math.ceil(layout.cssContentSize.height), 5000)
  await send('Emulation.setDeviceMetricsOverride', { width, height: contentHeight, deviceScaleFactor: 1, mobile: width < 768 })
  await new Promise((r) => setTimeout(r, 300))

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  writeFileSync(join(OUT, `verified-${width}.png`), Buffer.from(shot.data, 'base64'))
}

ws.close()
