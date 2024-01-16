// import styled from 'styled-components'
import { useWallet } from '@txnlab/use-wallet'
import { useState } from 'react'
import ConnectWallet from './ConnectWallet'
// types
interface NavItemProps {
  active?: boolean
}

interface MyNavbarProps {
  activeTab: number
  setActiveTab: (tab: number) => void
}

// styled components
// const StyledNavbar = styled.nav`
//   background-color: #333;
//   color: white;
//   display: flex;
//   align-items: center;
//   padding: 1em;
// `

// const Title = styled.h1`
//   margin-right: 2em;
//   font-size: 1.5em;
// `

// const NavItem = styled.div<NavItemProps>`
//   color: white;
//   margin-right: 1em;
//   padding: 0.5em 1em;
//   font-size: 1.2em;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     color: #ddd;
//     background-color: #444;
//   }

//   background-color: ${(props) => (props.active ? '#555' : 'transparent')};

// styled component implementation
// export const Navbar = ({ setActiveTab, activeTab }: MyNavbarProps) => {
//   return (
//     <StyledNavbar>
//       <Title>Blockchain Photo Diary</Title>
//       <NavItem onClick={() => setActiveTab(0)} active={activeTab === 0}>
//         Mint
//       </NavItem>
//       <NavItem onClick={() => setActiveTab(1)} active={activeTab === 1}>
//         Gallery
//       </NavItem>
//     </StyledNavbar>
//   )
// }

// // tailwind implementation
export const Navbar = ({ setActiveTab, activeTab }: MyNavbarProps) => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }
  return (
    <div className=" navbar bg-gray-800 text-white flex items-center p-4 h-16">
      <h1 className="navbar-start text-xl mr-8">Blockchain Photo Diary</h1>
      <div className="navbar-center flex">
        <div
          className={`mr-4 px-4 py-2 text-lg cursor-pointer rounded ${activeTab === 0 ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Mint
        </div>
        <div className={`px-4 py-2 text-lg cursor-pointer rounded ${activeTab === 1 ? 'bg-gray-700' : ''}`} onClick={() => setActiveTab(1)}>
          Gallery
        </div>
      </div>
      <div className="navbar-end">
        {activeAddress && (
          <div className="flex-end">
            <button
              className="btn m-2 bg-green-500 rounded border-none hover:bg-green-600 transition-colors duration-300"
              onClick={toggleWalletModal}
            >
              Disconnect
            </button>
            <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          </div>
        )}
      </div>
    </div>
  )
}
