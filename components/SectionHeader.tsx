type SectionHeaderProps = {
  title: string
  caption?: string
}

export function SectionHeader({ title, caption }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {caption ? (
        <p className="mt-1 text-sm text-muted">{caption}</p>
      ) : null}
    </div>
  )
}

export default SectionHeader

