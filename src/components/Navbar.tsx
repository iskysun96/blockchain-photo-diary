import styled from 'styled-components'

// types
interface NavItemProps {
  active?: boolean
}

interface MyNavbarProps {
  activeTab: number
  setActiveTab: (tab: number) => void
}

// styled components
const StyledNavbar = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 1em;
`

const Title = styled.h1`
  margin-right: 2em;
  font-size: 1.5em;
`

const NavItem = styled.div<NavItemProps>`
  color: white;
  margin-right: 1em;
  padding: 0.5em 1em;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: #ddd;
    background-color: #444;
  }

  background-color: ${(props) => (props.active ? '#555' : 'transparent')};
`

// styled component implementation
export const Navbar = ({ setActiveTab, activeTab }: MyNavbarProps) => {
  return (
    <StyledNavbar>
      <Title>Blockchain Photo Diary</Title>
      <NavItem onClick={() => setActiveTab(0)} active={activeTab === 0}>
        Mint
      </NavItem>
      <NavItem onClick={() => setActiveTab(1)} active={activeTab === 1}>
        Gallery
      </NavItem>
    </StyledNavbar>
  )
}

// // tailwind implementation
// export const Navbar = ({ setActiveTab, activeTab }: MyNavbarProps) => {
//   return (
//     <nav className="bg-gray-800 text-white flex items-center p-4">
//       <h1 className="text-xl mr-8">Blockchain Photo Diary</h1>
//       <div className="flex">
//         <div
//           className={`mr-4 px-4 py-2 text-lg cursor-pointer rounded ${activeTab === 0 ? 'bg-gray-700' : ''}`}
//           onClick={() => setActiveTab(0)}
//         >
//           Mint
//         </div>
//         <div className={`px-4 py-2 text-lg cursor-pointer rounded ${activeTab === 1 ? 'bg-gray-700' : ''}`} onClick={() => setActiveTab(1)}>
//           Gallery
//         </div>
//       </div>
//     </nav>
//   )
// }
