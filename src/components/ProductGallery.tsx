'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  name: string
  badge?: string
}

export default function ProductGallery({ images, name, badge }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="w-full min-w-0">
      <div className="relative rounded-2xl overflow-hidden aspect-square mb-3 bg-cream w-full">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-contain"
          priority
        />
        {badge && (
          <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-cream ${
                active === i
                  ? 'border-primary shadow-sm'
                  : 'border-transparent opacity-55 hover:opacity-90 hover:border-border'
              }`}
            >
              <Image src={img} alt={`${name} view ${i + 1}`} fill className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
