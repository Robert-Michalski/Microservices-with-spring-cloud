import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import { useNavigate } from "react-router"
import DispatchContext from "../DispatchContext"
function Navigation() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  function handleLogout() {
    appDispatch({ type: "logout" })
    navigate("/")
  }
  return (
    <div className="d-flex flex-column nav mt-4 p-4 bg-dark fc-white">
      {/* <button onClick={() => console.log(appState)}>check state</button> */}
      <div className="d-flex">
        {/* Icon and text */}
        <div>
          <span className="material-symbols-outlined">shopping_cart</span>
        </div>
      </div>

      {appState.user.role == "ROLE_ADMIN" || appState.user.role == "ROLE_MANAGER" ? (
        <>
          <hr className="bg-white" />
          <div className="d-flex mt-4 p-2 nav-item">
            {/* Icon and text */}
            <div>
              <span className="material-symbols-outlined">speed</span>
            </div>
            <div
              className="ms-3 mt-1"
              onClick={() => {
                navigate("/dashboard")
              }}
            >
              DASHBOARD
            </div>
          </div>
        </>
      ) : null}

      <hr className="bg-white" />
      <div
        className="d-flex p-2 mt-2 nav-item"
        onClick={() => {
          navigate("/products")
        }}
      >
        {/* Icon and text */}
        <div id="label-icon">
          <span className="material-symbols-outlined">label</span>
        </div>
        <div className="ms-3 mt-2">PRODUCTS</div>
      </div>
      <hr className="bg-white" />
      <div
        className="d-flex p-2 mt-2 nav-item"
        onClick={() => {
          navigate("/orders")
        }}
      >
        {/* Icon and text */}
        <div>
          <span className="material-symbols-outlined">inventory_2</span>
        </div>
        <div className="ms-3 mt-1">ORDERS</div>
      </div>
      <hr className="bg-white" />
      <div className="d-flex p-2 mt-2 nav-item">
        {/* Icon and text */}
        <div>
          <span className="material-symbols-outlined">settings</span>
        </div>
        <div className="ms-3 mt-1">SETTINGS</div>
      </div>
      <hr className="bg-white" />
      <div className="d-flex p-2 mt-5">
        {/* Icon and text */}
        <div className="mx-auto mt-5">
          <span className="material-symbols-outlined" onClick={handleLogout}>
            logout
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navigation
