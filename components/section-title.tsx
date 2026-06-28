interface SectionTitleProps {
  title: string
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}
