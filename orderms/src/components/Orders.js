import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import SingleOrder from "./SingleOrder"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import MainTop from "./MainTop"
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
      <MainTop label="Orders" />
      <hr />
      <div className="container p-3">
        <div className="d-flex">
          <div className="ms-3 fs-2">My orders</div>
          <div className="ms-auto me-4 search-order">
            <input type="text" placeholder="Find an order"></input>
          </div>
        </div>
        <div className="bg-white row mt-4 ms-2 orders ">
          <div className="col-sm grid-header items-row">Order ID</div>
          <div className="col-sm grid-header items-row">Date</div>
          <div className="col-sm grid-header items-row">Status</div>
          <div className="col-sm grid-header items-row">Total</div>
          <div className="w-100"></div>
          <hr className="p-2" />
          {state.orders.map((order, index) => {
            return <SingleOrder order={order} key={order.id} bgIndex={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Orders
