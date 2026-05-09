import React from 'react'

const SectionDivider = ({label, count}: {label: string, count: number}) => {
  return (
    <div className='flex items-center gap-3 mt-4 mb-3 w-full'>
      <h2 className='text-xs text-muted-foreground text-left font-medium uppercase tracking-wider whitespace-nowrap'>
        {label} · {count}
      </h2>
      <div className='flex-1 h-px bg-muted-foreground/20'/>
    </div>
  )
}

export default SectionDivider