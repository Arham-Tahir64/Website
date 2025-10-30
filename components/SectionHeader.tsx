type SectionHeaderProps = {
  title: string
  caption?: string
}

export function SectionHeader({ title, caption }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {caption && <p className="mt-2 text-sm text-muted leading-relaxed">{caption}</p>}
    </div>
  )
}

export default SectionHeader




