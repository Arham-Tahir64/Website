"use client";

import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

type ExperienceCardProps = {
  company: string
  role: string
  dates?: string
  bullets: string[]
  badge?: string
}

export default function ExperienceCard({ company, role, dates, bullets, badge }: ExperienceCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <GlassCard className="p-6 hover:border-white/12">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg font-semibold">{company}</h3>
            <p className="mt-0.5 text-sm text-foreground/75">{role}{dates && ` • ${dates}`}</p>
          </div>
          {badge && (
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-foreground/75 font-medium">{badge}</span>
          )}
        </div>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-foreground/80 leading-relaxed">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  )
}





