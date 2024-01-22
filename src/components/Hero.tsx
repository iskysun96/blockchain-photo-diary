import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import ConnectWallet from './ConnectWallet'
import MintNft from './MintNft'

const Hero = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: "url('assets/hero-background.jpg')" }}>
      <div className="hero-content text-center">
        <div className="max-w-md ">
          <div className="py-6 text-white">
            {activeAddress ? (
              <h1 className="text-3xl font-bold ">Upload a photo of the day</h1>
            ) : (
              <h1 className="text-7xl font-bold">Keep Your Memories Forever</h1>
            )}

            {activeAddress ? (
              <p className="text-1xl">We will mint your photo as an NFT and store it on the blockchain.</p>
            ) : (
              <p className="text-2xl">Welcome to your Blockchain Photo Diary. Connect your wallet to get started.</p>
            )}
          </div>
          <div>
            {activeAddress ? (
              <MintNft />
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
    </div>
  )
}

export default Hero
