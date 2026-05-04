'use client'

import { useState } from 'react'
import { signatureDesigns } from './designs'

function toPlainText(html: string) {
  if (typeof window === 'undefined') return html
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent?.replace(/\s+/g, ' ').trim() ?? ''
}

function selectRenderedSignature(id: string) {
  const element = document.getElementById(id)
  if (!element) return false

  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection?.removeAllRanges()
  selection?.addRange(range)

  const copied = document.execCommand('copy')
  selection?.removeAllRanges()
  return copied
}

export default function EmailSignaturePage() {
  const [copyStatus, setCopyStatus] = useState<{ id: string; label: string } | null>(null)

  async function copySignature(id: string, html: string) {
    const signatureElementId = `signature-${id}`
    const plainText = toPlainText(html)

    let label = 'Copied'

    try {
      if (navigator.clipboard && 'ClipboardItem' in window) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
          }),
        ])
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainText)
      } else {
        label = selectRenderedSignature(signatureElementId) ? 'Selected' : 'Select manually'
      }
    } catch {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(plainText)
        } else {
          label = selectRenderedSignature(signatureElementId) ? 'Selected' : 'Select manually'
        }
      } catch {
        label = selectRenderedSignature(signatureElementId) ? 'Selected' : 'Select manually'
      }
    }

    setCopyStatus({ id, label })
    window.setTimeout(() => setCopyStatus(null), 1800)
  }

  return (
    <main
      className="min-h-screen px-5 py-10 md:px-10 md:py-14"
      style={{ background: '#0a0d14', color: '#ffffff', fontFamily: 'Manrope, Arial, sans-serif' }}
    >
      <style jsx global>{`
        @media (max-width: 640px) {
          .email-signature-preview-inner {
            zoom: 0.62;
          }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .email-signature-preview-inner {
            zoom: 0.78;
          }
        }
      `}</style>
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p
              className="mb-4 text-xs font-semibold uppercase"
              style={{ color: 'rgba(255,255,255,0.42)', letterSpacing: '0.18em' }}
            >
              Kaz Viskanta
            </p>
            <h1
              className="font-medium"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5.7rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Email signature studio
            </h1>
          </div>

          <div
            className="max-w-sm text-sm leading-6"
            style={{ color: 'rgba(255,255,255,0.58)' }}
          >
            Six local Gmail-ready mockups. Pick a direction, click copy, then paste into Google&apos;s
            signature editor.
          </div>
        </header>

        <section className="mb-12 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
          <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
              <p
                className="mb-2 text-xs font-semibold uppercase"
                style={{ color: 'rgba(255,255,255,0.36)', letterSpacing: '0.16em' }}
              >
                Reference
              </p>
              <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                The example image informs the graphic rhythm only. The signatures below are fresh
                builds using this site&apos;s typography and tone.
              </p>
            </div>
            <div className="bg-white p-5">
              <img
                src="/email-signature/example.jpg"
                alt="Email signature layout reference"
                className="h-auto w-full max-w-2xl"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          {signatureDesigns.map((design, index) => (
            <article
              key={design.id}
              className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
            >
              <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p
                    className="mb-1 text-xs font-semibold uppercase"
                    style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.16em' }}
                  >
                    Design {index + 1}
                  </p>
                  <h2 className="text-xl font-medium text-white">{design.name}</h2>
                  <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {design.direction}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => copySignature(design.id, design.html)}
                  className="w-full rounded-full border px-5 py-3 text-sm font-semibold uppercase transition-opacity hover:opacity-85 md:w-auto"
                  style={{
                    background: copyStatus?.id === design.id ? '#ffffff' : 'transparent',
                    borderColor: 'rgba(255,255,255,0.22)',
                    color: copyStatus?.id === design.id ? '#0a0d14' : '#ffffff',
                    letterSpacing: '0.08em',
                  }}
                >
                  {copyStatus?.id === design.id ? copyStatus.label : 'Copy signature'}
                </button>
              </div>

              <div className="overflow-x-auto bg-white p-5 md:p-8">
                <div
                  className="email-signature-preview-inner"
                  id={`signature-${design.id}`}
                  style={{ width: design.width, maxWidth: 'none' }}
                  dangerouslySetInnerHTML={{ __html: design.html }}
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
