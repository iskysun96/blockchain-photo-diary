/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Gallery Component
*/

import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import { getAlgodClient } from '../utils/setupClients'

const PD = 'pd'

const Gallery = () => {
  const [diaryAssets, setDiaryAssets] = useState<Record<string, any>[]>([])
  const wallet = useWallet()

  // Set up algod, Indexer
  const algodClient = getAlgodClient()

  const fetchAssetUnitNames = async () => {
    if (wallet && wallet.activeAddress) {
      try {
        const balances = await wallet.getAssets()
        const diaryAssets: Record<string, unknown>[] = []

        for (const balance of balances) {
          const assetInfo = await algodClient.getAssetByID(balance['asset-id']).do()
          if (assetInfo.params['unit-name'] === undefined) {
            continue
          }

          if (assetInfo.params['unit-name'].startsWith(PD)) {
            diaryAssets.push(assetInfo)
          }
        }
        return diaryAssets
      } catch (error) {
        console.error('Error fetching asset balances:', error)
        return
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (wallet && wallet.activeAddress) {
        try {
          const assets = await fetchAssetUnitNames()
          if (assets === undefined) {
            return
          }
          setDiaryAssets(assets)
        } catch (error) {
          console.error('Error fetching assets:', error)
        }
      }
    }

    fetchData()
    console.log('diaryAssets: ', diaryAssets)
  }, [])

  const getIpfsUrl = (url: string) => {
    const slicedUrl = url.slice(7, url.length - 6)
    console.log('slicedUrl: ', slicedUrl)
    const fullUrl = `https://ipfs.algonode.xyz/ipfs/${slicedUrl}?optimizer=image&width=75`
    console.log('fullUrl: ', fullUrl)
    return fullUrl
  }

  return (
    wallet.activeAddress &&
    diaryAssets?.length > 0 && (
      <div className="grid grid-cols-4 gap-4 mt-8">
        {diaryAssets?.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-lg" style={{ border: '2px solid 	#b2d8d8' }}>
            <img src={getIpfsUrl(item.params['url'])} className="w-full h-48 object-cover rounded-lg" optimi />
            <p className="text-center text-sm mt-2">{item.params['name']}</p>
            //{' '}
          </div>
        ))}
      </div>
    )
  )
}

export default Gallery
