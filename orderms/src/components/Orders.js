import React, { useContext } from "react"
import { useNavigate } from "react-router"
import SingleOrder from "./SingleOrder"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Navigation from "./Navigation"
import Axios from "axios"
function Orders() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  function handleLogout() {
    appDispatch({ type: "logout" })
    navigate("/")
  }

  return (
    <div className="d-flex container">
      {/* Leftie and rightie */}
      <Navigation />
      <div className="col-10 mx-auto p-1 mt-4 bg-gray">
        <div className="d-flex orders-top p-4 align-items-center">
          <div className="ms-4">Orders</div>
          <span className="material-symbols-outlined ms-auto">search</span>
          <span className="material-symbols-outlined ms-3">notifications</span>
          <div className="ms-5">John Doe</div>
        </div>
        <hr />
        <div className="container p-3">
          <div className="d-flex">
            <div className="ms-3 fs-2">My orders</div>
            <div className="ms-auto me-4 search-order">
              <input type="text" placeholder="Find an order"></input>
            </div>
          </div>
          <div className="bg-white row mt-4 ms-2 orders p-3">
            <div className="col-sm grid-header">Order ID</div>
            <div className="col-sm grid-header">Item</div>
            <div className="col-sm grid-header">Buyer</div>
            <div className="col-sm grid-header">Date</div>
            <div className="col-sm grid-header">Status</div>
            <div className="col-sm grid-header">Amount</div>
            <div className="w-100"></div>
            <hr className="mt-3" />
            <SingleOrder />
            <SingleOrder />
            <SingleOrder />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
