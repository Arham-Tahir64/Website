"use client";

import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

type ProjectCardProps = {
  title: string
  description: string
  stack: string[]
  meta?: string[]
  href?: string
}

export default function ProjectCard({ title, description, stack, meta, href = '#' }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <GlassCard className="p-6 hover:border-white/12">
        <div className="mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <span key={s} className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/75 font-medium">
              {s}
            </span>
          ))}
        </div>
        {meta && meta.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-2.5 text-xs text-muted">
            {meta.map((m) => (
              <span key={m} className="opacity-75">{m}</span>
            ))}
          </div>
        )}
        <div className="mt-4">
          <a href={href} className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1 transition-colors">Learn more <span>→</span></a>
        </div>
      </GlassCard>
    </motion.div>
  )
}


