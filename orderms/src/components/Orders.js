import React, { useContext } from "react"
import SingleOrder from "./SingleOrder"
import StateContext from "../StateContext"
import Axios from "axios"
function Orders() {
  const appState = useContext(StateContext)

  return (
    <div className="d-flex container">
      {/* Leftie and rightie */}
      <div className="d-flex flex-column nav mt-4 p-4 bg-dark fc-white">
        <button onClick={() => console.log(appState)}>check state</button>
        <div className="d-flex">
          {/* Icon and text */}
          <div>
            <span className="material-symbols-outlined">shopping_cart</span>
          </div>
        </div>
        <hr className="bg-white" />
        <div className="d-flex mt-4 p-2">
          {/* Icon and text */}
          <div>
            <span className="material-symbols-outlined">speed</span>
          </div>
          <div className="ms-3 mt-1">DASHBOARD</div>
        </div>
        <hr className="bg-white" />
        <div className="d-flex p-2 mt-2">
          {/* Icon and text */}
          <div id="label-icon">
            <span className="material-symbols-outlined">label</span>
          </div>
          <div className="ms-3 mt-2">PRODUCTS</div>
        </div>
        <hr className="bg-white" />
        <div className="d-flex p-2 mt-2">
          {/* Icon and text */}
          <div>
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div className="ms-3 mt-1">ORDERS</div>
        </div>
        <hr className="bg-white" />
        <div className="d-flex p-2 mt-2">
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
            <span className="material-symbols-outlined">logout</span>
          </div>
        </div>
      </div>

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
