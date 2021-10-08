import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  MDBBadge,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from 'mdbreact'

import { logout } from 'store/auth/actions'
import { selectAllLiveData } from 'store/livedata/reducer'
import './Header.scss'

type Props = {
  match: {
    path: string
  }
  routes: any[]
  user: User
}

const Header: React.FC<Props> = ({ match, routes, user }) => {
  const [isOpen, setOpen] = useState(false)
  const liveData = useSelector(selectAllLiveData)

  const handleLogout = () => {
    logout()
  }

  const toggleCollapse = () => {
    setOpen(!isOpen)
  }

  const isPathActive = target => {
    const { path } = match
    return path === target
  }

  const generateMenuItem = route => {
    if (route.hide) return null

    return (
      <MDBNavItem key={route.path} active={isPathActive(route.path)}>
        <MDBNavLink to={route.path}>
          {route.title}
          {route.badge && !!user[route.badge] && (
            <MDBBadge color="danger" className="ml-2">
              {liveData[route.badge]}
            </MDBBadge>
          )}
        </MDBNavLink>
      </MDBNavItem>
    )
  }

  return (
    <MDBNavbar className="fixed-top" color="primary-color" expand="md" dark>
      <MDBNavbarBrand>
        <a href="/" className="white-text font-weight-bold">
          MagicCall
        </a>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          {routes.map(route => generateMenuItem(route))}
        </MDBNavbarNav>

        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu right basic>
                <MDBDropdownItem href="/profile">Profile</MDBDropdownItem>
                <MDBDropdownItem onClick={handleLogout}>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  )
}

export default withRouter(Header)
