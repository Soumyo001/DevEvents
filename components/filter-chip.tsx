import { cn } from "@/lib/utils"

const FilterChip = ({active, onClick, text}: {
    active: boolean,
    onClick: () => void,
    text: string
}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className={cn(
            "px-2 py-1 border border-accent rounded-lg text-sm max-sm:text-xs text-muted-foreground font-semibold bg-background/30",
            active
                ? "bg-accent/60 border-border text-primary"
                : "hover:bg-accent/60"
        )}
    >
        {text}
    </button>
  )
}

export default FilterChip