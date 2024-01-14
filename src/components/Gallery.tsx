/*
Gallery Component
*/

import { useWallet } from '@txnlab/use-wallet'

// types
export type GalleryItem = {
  imageUrl: string
  address?: string // TODO: required
  date: string // TODO: timestamp
}

const Gallery = () => {
  // TODO: query all nfts with unitName that starts with "dia" from the connected account
  const { activeAddress } = useWallet()

  const fetchContent = (): GalleryItem[] => {
    return [
      {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1280px-The_Great_Wave_off_Kanagawa.jpg',
        date: '2024-01-13',
      },
    ]
  }
  const galleryContents = fetchContent()

  return (
    activeAddress && (
      <div className="grid grid-cols-4 gap-4 mt-8">
        {galleryContents.map((item, index) => (
          // TODO: display the nfts in a grid with Create Date showing at the bottom of the image
          <div key={index} className="bg-white p-2 rounded-lg" style={{ border: '2px solid 	#b2d8d8' }}>
            <img src={item.imageUrl} className="w-full h-48 object-cover rounded-lg" />
            <p className="text-center text-sm mt-2">{item.date}</p>
          </div>
        ))}
      </div>
    )
  )
}

export default Gallery
