import React, { useEffect } from "react"
import StateContext from "../StateContext"
function ManageProductView() {
  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Products</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{state.user.firstName + " " + state.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3">
        <div className="d-flex">
          <div className="ms-3 fs-2">All products</div>
          <div className="ms-auto me-4 search-order">
            <input type="text" placeholder="Find product"></input>
          </div>
        </div>
        <div className="bg-white row mt-4 ms-2 orders p-3">
          <div className="col-sm grid-header">Item ID</div>
          <div className="col-sm grid-header">Name</div>
          <div className="col-sm grid-header">Available</div>
          <div className="col-sm grid-header">Price</div>
          <div className="col-sm grid-header">Quantity</div>
          <div className="col-sm grid-header">Action</div>
          <div className="w-100"></div>
          <hr className="mt-3" />
        </div>
      </div>
    </div>
  )
}

export default ManageProductView
