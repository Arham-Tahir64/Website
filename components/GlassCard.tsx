import { ReactNode } from 'react'

type GlassCardProps = {
  className?: string
  children: ReactNode
}

export function GlassCard({ className = '', children }: GlassCardProps) {
  return (
    <div className={`glass ${className}`}>
      {children}
    </div>
  )
}

export default GlassCard

