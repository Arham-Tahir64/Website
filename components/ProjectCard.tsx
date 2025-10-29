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

export default function ProjectCard({ title, description, stack, meta = [], href = '#' }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }}>
      <GlassCard className="p-5 transition-shadow hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="mt-1 text-sm text-foreground/80">{description}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
              {s}
            </span>
          ))}
        </div>
        {meta.length ? (
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
            {meta.map((m) => (
              <span key={m} className="opacity-80">{m}</span>
            ))}
          </div>
        ) : null}
        <div className="mt-4">
          <a href={href} className="text-sm text-accent hover:underline">Learn more →</a>
        </div>
      </GlassCard>
    </motion.div>
  )
}


