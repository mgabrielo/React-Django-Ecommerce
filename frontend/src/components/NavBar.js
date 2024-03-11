import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
const NavBar = () => {
    return (
        <>
            <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">2
                    <LinkContainer to={'/'}>
                        <Nav.Link className="navbar-brand"> DjangoEcommerce</Nav.Link>
                    </LinkContainer>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <LinkContainer to={'/'}>
                                    <Nav.Link className="nav-link active">Home &nbsp;<i className="fa-solid fa-house"></i></Nav.Link>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to={'/cart'}>
                                    <Nav.Link className="nav-link active">Cart</Nav.Link>
                                </LinkContainer>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/"
                                    role="button" aria-haspopup="true" aria-expanded="false">New User?</a>
                                <div className="dropdown-menu">
                                    <LinkContainer to={'/login'}>
                                        <Nav.Link className="dropdown-item">Log in</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={'/signup'}>
                                        <Nav.Link className="dropdown-item">Sign Up</Nav.Link>
                                    </LinkContainer>
                                    <div className="dropdown-divider"></div>
                                    <LinkContainer to={'/'}>
                                        <Nav.Link className="dropdown-item">Log out</Nav.Link>
                                    </LinkContainer>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-sm-2" type="search" placeholder="Search" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </Navbar>
        </>
    )
}

export default NavBar