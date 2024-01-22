/* eslint-disable no-console */
/*
NFT Minting / Wallet Connect component

TODO

Wallet Connect
- Create button to connect wallet
- once connected, the button disappear and shows the minting component with connect wallet address at the top

Minting
- Create drag and drop component for uploading images
- Create input field for NFT name (one word to describe my emotion of the day)
- Create button to mint NFT
- Integrate with Pinata to upload image to IPFS
- Minting should:
  = upload image to IPFS
  - unitName should start with "dia"+ today's date?
  = NFT name should be one sentence explaining the day + date (e.g. "Walk in the park 2021-09-01")
*/

import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { pinFileToIPFS, pinJSONToIPFS } from '../utils/pinata'
import { getAlgodClient } from '../utils/setupClients'

const MintNft = () => {
  const [nftImageUrl, setNftImageUrl] = useState<string>('')
  const [nftImage, setNftImage] = useState<File | undefined>()
  const [nftName, setNftName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { enqueueSnackbar } = useSnackbar()
  const { signer, activeAddress } = useWallet()

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-CA')
  const DateWithoutDashes = formattedDate.replace(/-/g, '').substring(2)

  const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
    // setNFTImageUrl to preview image
    setNftImage(acceptedFiles[0])
    const reader = new FileReader()
    reader.onload = () => {
      setNftImageUrl(reader.result as string)
    }
    reader.readAsDataURL(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const imageToArc3 = async (file: File): Promise<string> => {
    const ipfsHash = await pinFileToIPFS(file)
    const metadataRoot = await pinJSONToIPFS(`${nftName} ${formattedDate}`, `dia${formattedDate}`, String(ipfsHash), file)

    console.log(metadataRoot)
    return String(metadataRoot)
  }

  // Set up algod, Indexer
  const algodClient = getAlgodClient()

  const handleTextInput = (e: { target: { value: string } }) => {
    setNftName(e.target.value)
  }

  const handleFormSummit = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }

    const signingAccount = { signer, addr: activeAddress } as TransactionSignerAccount

    if (!nftImage) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      setLoading(false)
      return
    }
    const metadataRoot = await imageToArc3(nftImage).catch((e: Error) => {
      enqueueSnackbar(`Error during image upload to IPFS: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return
    })
    console.log('metadataRoot: ', metadataRoot)
    console.log(DateWithoutDashes)
    try {
      const sp = await algodClient.getTransactionParams().do()
      const nftCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        suggestedParams: sp,
        defaultFrozen: false,
        assetName: `${nftName} ${formattedDate}`,
        unitName: `pd${DateWithoutDashes}`,
        manager: activeAddress,
        reserve: activeAddress,
        assetURL: `ipfs://${metadataRoot}/#arc3`,
        total: 1,
        decimals: 0,
      })

      const { confirmation } = await algokit.sendTransaction(
        {
          transaction: nftCreateTxn,
          from: signingAccount,
          sendParams: {
            suppressLog: true,
          },
        },
        algodClient,
      )

      enqueueSnackbar(`Successfully Created Photo Diary with Asset ID: ${confirmation?.assetIndex}`, { variant: 'success' })

      console.log(`Asset ID created: ${confirmation?.assetIndex}`)
      setNftImageUrl('')
      setNftImage(undefined)
      setNftName('')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log(nftImageUrl)
  }, [nftImageUrl])

  return (
    <div className="max-w-xl mt-4 mb-4">
      {nftImageUrl ? (
        <div className="form-control">
          <img src={nftImageUrl} />
          <input
            type="text"
            placeholder="What did you do today?"
            className="input rounded-r w-full my-4 font-black"
            onChange={handleTextInput}
            maxLength={21} //max asa name is 32 bytes so 32 characters long. 11 characters for date
          />
          <button
            className="btn m-2 bg-yellow-200 rounded border-none hover:bg-yellow-300 transition-colors duration-300"
            onClick={handleFormSummit}
          >
            {loading ? <span className="loading loading-spinner" /> : 'Create Photo Diary'}
          </button>
        </div>
      ) : (
        <label className="flex justify-center w-full h-64 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <div {...getRootProps()} className="flex items-center">
            {isDragActive ? (
              <p>Drag 'n' drop some files here, or click to select files</p>
            ) : (
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline"> browse</span>
                </span>
              </span>
            )}
            <input {...getInputProps()} />
          </div>
        </label>
      )}
    </div>
  )
}

export default MintNft
