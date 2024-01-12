import { useState } from 'react'
import ConnectWallet from './ConnectWallet'

/*
NFT Minting / Wallet Connect component

TODO

Wallet Connect
- Create button to connect wallet
- once connected, the button disappear and shows the minting component with connect wallet address at the top

Minting
- Create drag and drop component for uploading images
- Create input field for NFT name (one word to describe my emotion of the day)
- create button to mint NFT
- Integrate with Pinata to upload image to IPFS
- Minting should:
  = upload image to IPFS
  - unitName should start with "dia"+ today's date?
  = NFT name should be the emotion of the day + date (e.g. "happy 2021-09-01")
*/

const MintNft = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  // const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }
  return (
    <div>
      <button
        className="btn m-2 bg-green-500 rounded border-none hover:bg-green-600 transition-colors duration-300"
        onClick={toggleWalletModal}
      >
        Connect Wallet
      </button>
      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    </div>
  )
}

export default MintNft
