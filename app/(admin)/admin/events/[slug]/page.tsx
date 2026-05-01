import React, { use } from 'react'

const EventBySlug = ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = use(params);
  return (
    <div>{slug}</div>
  )
}

export default EventBySlug