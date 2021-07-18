import React from "react";
import {
  Link
} from "react-router-dom";
const Nav = ({ Userfront }) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link to="/" className="p-2 text-dark">
          Productos
        </Link>
        <Link to="/dashboard" className="p-2 text-dark">
          Dashboard
        </Link>
        <Link to="/reset" className="p-2 text-dark">
          Reset
        </Link>
      </nav>
      {!Userfront.accessToken() ? (
        <>
          <Link className="btn btn-link" to="/sign-up">
            Sign up
          </Link>
          <Link className="btn ml-1 btn-outline-primary" to="/login">
            Login
          </Link>
        </>
      ) : (
        <>
          <Link className="btn ml-1 btn-outline-primary" to="">
            <img
              src={Userfront.user.image}
              className="mr-1 rounded-circle img-fluid"
              width="35"
              alt="Logo"
            />
            {Userfront.user.name}
          </Link>
          <button className="btn btn-link" onClick={Userfront.logout}>Logout</button>
        </>
      )}
    </div>
  )
}
export default Nav;