import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import { Navbar } from '../components/Navbar'

const ActiveTab = () => {
  const [activeTab, setActiveTab] = useState(0) // 0 = Mint; 1 = Gallery

  const { activeAddress } = useWallet()

  return (
    <div>
      {activeAddress ? (
        <div>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 0 && <Hero />}
          {activeTab === 1 && <Gallery />}
        </div>
      ) : (
        <Hero />
      )}
    </div>
  )
}

export default ActiveTab
