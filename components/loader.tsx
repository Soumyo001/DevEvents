const Loader = () => {
  return (
    <div className='relative w-10 h-10'>
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin' />
        <div className='absolute inset-1.5 rounded-full border-2 border-transparent border-b-primary/50 border-l-primary/50 animate-[spin_0.7s_linear_infinite_reverse]' />
    </div>
  )
}

export default Loader