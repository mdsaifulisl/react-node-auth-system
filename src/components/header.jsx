


import { Link } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
function Header() {
  const {isLoggedIn, logout} = useContext(AuthContext);
  return (
    <header className="bg-light shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-decoration-none">
          <h2 className="text-primary m-0">MyApp</h2>
        </Link>
        <div>
          {!isLoggedIn && <Link to="/login" className="btn btn-outline-primary me-2">
            Login
          </Link>}
          {!isLoggedIn && <Link to="/register" className="btn btn-primary">
            Register
          </Link>}
          {isLoggedIn && <button onClick={logout} className="btn btn-danger">
            Logout
          </button>}
        </div>
      </div>
    </header>
  ); 
}

export default Header;
