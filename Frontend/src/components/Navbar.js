import React from 'react'
import { Link } from 'react-router-dom'

export const PublicNavbar = () => (
  <nav className="navbar navbar-expand-lg rounded navbar-bg">
    <div class="container-fluid">
      <section>
        <Link to="/">Home</Link>
        <Link to="/questions">Questions</Link>
      </section>
      <div>        
      <Link className='button bg-light' to="/login">SignIn</Link>
      </div>
    </div>
  </nav>
)

export const PrivateNavbar = ({ children }) => (
  <nav className="navbar navbar-expand-lg rounded navbar-bg">
    <div class="container-fluid">
      <section>
        <Link to="/">Home</Link>
        <Link to="/questions">Questions</Link>
        <Link to="/new">New</Link>
        <Link to="/list">List</Link>
        <Link to="/user">Profile</Link>
      </section>
      <div>
        {children}
      </div>
    </div>
  </nav>
)