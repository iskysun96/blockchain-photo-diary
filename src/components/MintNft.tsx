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
  = NFT name should be the emotion of the day + date (e.g. "happy 2021-09-01")
*/

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const MintNft = () => {
  const [nftImageUrl, setNftImageUrl] = useState<string>('')
  const [nftName, setNftName] = useState<string>('')
  const onDrop = useCallback((acceptedFiles: FileList) => {
    // setNFTImageUrl to preview image
    const reader = new FileReader()
    reader.onload = () => {
      setNftImageUrl(reader.result as string)
    }
    reader.readAsDataURL(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleTextInput = (e: { target: { value: string } }) => {
    setNftName(e.target.value)
  }

  useEffect(() => {
    console.log(nftImageUrl)
  }, [nftImageUrl])

  return (
    <div className="max-w-xl mt-4 mb-4">
      {nftImageUrl ? (
        <div className="flex flex-col">
          <img src={nftImageUrl} />
          <input type="text" className="rounded mt-2 mb-2" placeholder="Enter NFT Name" onChange={handleTextInput} />
          <button>Create Photo Diary</button>
        </div>
      ) : (
        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
