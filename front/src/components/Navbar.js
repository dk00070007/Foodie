import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "../screens/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";
function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success"
        style={{
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
        <img src={process.env.PUBLIC_URL + '/icons8-hamburger-96.png'} alt="Logo" width="50" height="60" className="logo" />
          <Link className="navbar-brand fs-1 fst-italic " to="/">
          
            FOODIE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/Login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/creatuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart{""}
                  <Badge color="secondary" badgeContent={data.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
