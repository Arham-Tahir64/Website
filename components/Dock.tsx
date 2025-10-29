"use client";

import { motion } from 'framer-motion'
import { Home, FolderGit2, BriefcaseBusiness, FileText, Mail } from 'lucide-react'

type DockProps = {
  onOpenResume: () => void
}

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
]

export default function Dock({ onOpenResume }: DockProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center safe-bottom">
      <div className="glass flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5">
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground/90 hover:bg-white/5"
            aria-label={label}
          >
            <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center">
              <Icon size={18} className="opacity-90" />
            </motion.span>
            <span className="hidden sm:block opacity-90">{label}</span>
          </button>
        ))}

        <div className="mx-1 h-6 w-px bg-white/10" />

        <button
          onClick={onOpenResume}
          className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground/90 hover:bg-white/5"
          aria-label="Resume"
        >
          <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center">
            <FileText size={18} className="opacity-90" />
          </motion.span>
          <span className="hidden sm:block opacity-90">Resume</span>
        </button>

        <button
          onClick={() => scrollTo('contact')}
          className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground/90 hover:bg-white/5"
          aria-label="Contact"
        >
          <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center">
            <Mail size={18} className="opacity-90" />
          </motion.span>
          <span className="hidden sm:block opacity-90">Contact</span>
        </button>
      </div>
    </div>
  )
}


