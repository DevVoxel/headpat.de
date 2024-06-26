'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getGallery } from 'utils/actions/gallery-actions'
import { GalleryType } from 'utils/types'

export default function FetchGallery({ enableNsfw }) {
  const [gallery, setGallery] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getGalleryImageUrl = (galleryId: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/655ca6663497d9472539/files/${galleryId}/preview?project=6557c1a8b6c2739b3ecf&quality=100&height=500&operation=fit`
  }

  useEffect(() => {
    const fetchGalleryData = async () => {
      const filters = !enableNsfw ? `&queries[]=equal("nsfw",false)` : ``
      const pageSize = 500 // Number of items per page
      const offset = (currentPage - 1) * pageSize // Calculate offset based on current page
      const apiUrl = `${filters}&queries[]=limit(${pageSize})&queries[]=offset(${offset})`

      try {
        const data: GalleryType = await getGallery(apiUrl)

        setGallery(data.documents)
        setTotalPages(data.total / pageSize)
      } catch (err) {
        setError(err)
      }
    }

    fetchGalleryData()
  }, [currentPage, enableNsfw])

  return (
    <div>
      <div>
        <ul className="flex flex-wrap items-center justify-center gap-4 p-8">
          {gallery &&
            gallery.map((item) => (
              <div key={item.$id}>
                {item && (
                  <div
                    className={`h-64 overflow-hidden rounded-lg ${
                      item.nsfw && !enableNsfw ? 'relative' : ''
                    }`}
                  >
                    {item.nsfw && !enableNsfw && (
                      <div className="absolute inset-0 bg-black opacity-50"></div>
                    )}
                    <Link href={`/gallery/${item.$id}`}>
                      <Image
                        src={getGalleryImageUrl(item.galleryId)}
                        alt={item.imgAlt || 'Gallery Image'}
                        className={`h-full max-h-[600px] w-full max-w-[600px] object-cover`}
                        width={600}
                        height={600}
                        loading="lazy" // Add this attribute for lazy loading
                      />
                    </Link>
                  </div>
                )}
              </div>
            ))}
        </ul>
      </div>
    </div>
  )
}
