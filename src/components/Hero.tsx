import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import ConnectWallet from './ConnectWallet'
import MintNft from './MintNft'

const Hero = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openTransactModal, setOpenTransactModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleTransactModal = () => {
    setOpenTransactModal(!openTransactModal)
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

          {activeAddress ? (
            <div>
              <MintNft />
            </div>
          ) : (
            <div>
              <button
                className="btn m-2 bg-yellow-200 rounded border-none hover:bg-yellow-300 transition-colors duration-300"
                onClick={toggleWalletModal}
              >
                {activeAddress ? 'Disconnect' : 'Connect Wallet'}
              </button>
              <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
