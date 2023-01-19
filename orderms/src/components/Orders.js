import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import SingleOrder from "./SingleOrder"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Navigation from "./Navigation"
import { useImmer } from "use-immer"
import Axios from "axios"
function Orders() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [state, setState] = useImmer({
    orders: []
  })

  useEffect(() => {
    if (appState.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchData() {
        try {
          const responseOrders = await Axios.get(`/api/order/user/` + appState.user.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.orders = responseOrders.data
          })
        } catch (e) {
          console.log("there was a problem fetching the data")
        }
      }

      fetchData()
      return () => {
        ourRequest.cancel()
      }
    } else {
      navigate("/")
    }
  }, [])
  function checkState() {
    console.log(state)
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Orders</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
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
          <div className="col-sm grid-header">Date</div>
          <div className="col-sm grid-header">Status</div>
          <div className="col-sm grid-header">Total</div>
          <div className="w-100"></div>
          <hr className="mt-3" />
          {state.orders.map(order => {
            return <SingleOrder order={order} key={order.id} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Orders
