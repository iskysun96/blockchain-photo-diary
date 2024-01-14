import React from 'react'
import ConnectWallet from './ConnectWallet'

// types
interface WalletConnectControlProps {
  activeAddress: string | undefined
  toggleWalletModal: () => void
  openWalletModal: boolean
}

const WalletConnectControl: React.FC<WalletConnectControlProps> = ({ activeAddress, toggleWalletModal, openWalletModal }) => {
  return (
    <div>
      <button
        className="btn m-2 bg-green-500 rounded border-none hover:bg-green-600 transition-colors duration-300"
        onClick={toggleWalletModal}
      >
        {activeAddress ? 'Disconnect' : 'Connect Wallet'}
      </button>
      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
    </div>
  )
}

export default WalletConnectControl
