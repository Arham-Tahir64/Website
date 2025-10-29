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
    <motion.div whileHover={{ y: -3 }}>
      <GlassCard className="p-5 transition-shadow hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">{company}</h3>
            <p className="mt-1 text-sm text-foreground/80">{role}{dates ? ` • ${dates}` : ''}</p>
          </div>
          {badge ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-foreground/80">{badge}</span>
          ) : null}
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/85">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  )
}


