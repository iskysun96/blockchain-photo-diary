/*
Gallery Component
*/

import { Asset, useWallet } from '@txnlab/use-wallet'
import { useEffect } from 'react'

const DIA = 'dia'

// types
export type GalleryItem = {
  imageUrl: string
  address?: string // TODO: required
  date: string // TODO: timestamp
}

const Gallery = () => {
  const wallet = useWallet()

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

  let diaAssets: Asset[] = []
  useEffect(() => {
    const fetchData = async () => {
      if (wallet && wallet.activeAddress) {
        try {
          const assets = await wallet.getAssets()
          diaAssets = assets.filter((asset) => asset['unit-name'].startsWith(DIA))
        } catch (error) {
          console.error('Error fetching assets:', error)
        }
      }
    }

    fetchData()
  }, [wallet])

  return (
    wallet.activeAddress && (
      <div className="grid grid-cols-4 gap-4 mt-8">
        {galleryContents.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-lg" style={{ border: '2px solid 	#b2d8d8' }}>
            <img src={item.imageUrl} className="w-full h-48 object-cover rounded-lg" />
            <p className="text-center text-sm mt-2">{item.date}</p>
          </div>
        ))}
        {/* {diaAssets.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-lg" style={{ border: '2px solid 	#b2d8d8' }}>
            <img src={item.name} className="w-full h-48 object-cover rounded-lg" />
            <p className="text-center text-sm mt-2">{'TODO: REPLACE THIS WITH ACTUAL DATE'}</p>
            //{' '}
          </div>
        ))} */}
      </div>
    )
  )
}

export default Gallery
