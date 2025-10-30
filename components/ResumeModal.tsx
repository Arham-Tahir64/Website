"use client";

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ResumeModalProps = {
  open: boolean
  onClose: () => void
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') trapFocus(e)
    }
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleKey)
      const focusable = getFocusable()
      focusable[0]?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      lastFocused.current?.focus()
    }
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const getFocusable = () => {
    if (!panelRef.current) return []
    return Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((n) => !n.hasAttribute('disabled'))
  }

  const trapFocus = (e: KeyboardEvent) => {
    const focusable = getFocusable()
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          aria-modal
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              ref={panelRef}
              className="glass w-full max-w-3xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Resume — Arham Tahir</h3>
              </div>
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-muted">
                PDF preview placeholder
              </div>
              <div className="flex justify-end gap-3">
                <a
                  href="#"
                  download
                  className="ghost-btn"
                >
                  Download PDF
                </a>
                <button className="ghost-btn" onClick={onClose}>Close</button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}





