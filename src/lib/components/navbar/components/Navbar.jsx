import React from "react"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import styled from 'styled-components';
import { auth } from "lib/utils/firebase"

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: 30px;
  z-index: 1;
`
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  a{
    margin: 0px 10px;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
`
export default ({ currentUser }) => {
  const user = currentUser?.currentUser
  return (
    <Container>
      <Navbar>
        <div className="title">
          <h1>DS</h1>
        </div>
        <Nav>
          <Link to="/stockx"> Stockx</Link> 
          {user === null &&
            <>
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          }
          {user?.id && <Link to="/" onClick={() => auth.signOut()}>Log out</Link>}
        </Nav>
      </Navbar>
    </Container>
  )

}