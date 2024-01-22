/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Gallery Component
*/

import { useWallet } from '@txnlab/use-wallet'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAlgodClient } from '../utils/setupClients'

const PD = 'pd'

const Gallery = () => {
  const [diaryAssets, setDiaryAssets] = useState<Record<string, any>[]>([])
  const wallet = useWallet()

  // Set up algod, Indexer
  const algodClient = getAlgodClient()

  //get Image Url from metadata Url uploaded on IPFS
  const getIpfsUrl = async (url: string) => {
    const slicedUrl = url.slice(7, url.length + 1)
    const response = await axios.get(`https://ipfs.algonode.xyz/ipfs/${slicedUrl}`)
    const responseImage = response.data.image
    const slicedResponseImage = responseImage.slice(7, url.length + 1)
    return `https://ipfs.algonode.xyz/ipfs/${slicedResponseImage}`
  }

  const fetchAssetUnitNames = async () => {
    if (wallet && wallet.activeAddress) {
      try {
        const balances = await wallet.getAssets()
        const diaryAssets: Record<string, any>[] = []

        for (const balance of balances) {
          const assetInfo = await algodClient.getAssetByID(balance['asset-id']).do()
          if (assetInfo.params['unit-name'] === undefined) {
            continue
          }

          if (assetInfo.params['unit-name'].startsWith(PD)) {
            const ipfsUrl = await getIpfsUrl(assetInfo.params['url'])
            assetInfo['image'] = ipfsUrl
            diaryAssets.push(assetInfo)
          }
        }
        console.log('diaryAssets: ', diaryAssets)
        return diaryAssets
      } catch (error) {
        console.error('Error fetching asset balances:', error)
        return
      }
    }
    return
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
  }, [wallet.activeAddress])

  return (
    wallet.activeAddress && (
      <div className="flex justify-center min-h-screen">
        {diaryAssets.length > 0 ? (
          <div className="container grid grid-cols-4 gap-4 mt-8 h-full">
            {diaryAssets.map((item, index) => (
              <div key={index} className="bg-white p-2 rounded-lg" style={{ border: '2px solid 	#b2d8d8' }}>
                <img src={diaryAssets[index].image} className="w-full h-48 object-cover rounded-lg" alt="Photo Diary" />
                <p className="text-center text-sm mt-2">{item.params['name']}</p>
              </div>
            ))}
          </div>
        ) : (
          <span className="loading loading-spinner" />
        )}
      </div>
    )
  )
}

export default Gallery
