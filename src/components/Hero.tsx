import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import MintNft from './MintNft'
import WalletConnectControl from './WalletConnectControl'

const Hero = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            {activeAddress
              ? 'Enjoy your permanent photo diary recorded on the Algorand blockchain'
              : 'Welcome to your Photo Diary on the Blockchain. Connect your wallet to get started.'}
          </p>
          <WalletConnectControl activeAddress={activeAddress} toggleWalletModal={toggleWalletModal} openWalletModal={openWalletModal} />
          {activeAddress && <MintNft />}
        </div>
      </div>
    </div>
  )
}

export default Hero
