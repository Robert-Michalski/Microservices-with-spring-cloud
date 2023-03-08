import { useContext, useEffect, useState } from "react"
import MainTop from "../MainTop"
import Axios from "axios"
import StateContext from "../../StateContext"
import SingleOrderPending from "./SingleOrderPending"
function OrdersPending() {
  //
  const [orders, setOrders] = useState([])
  const [refreshCount, setRefreshCount] = useState([0])
  const appState = useContext(StateContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchOrders() {
      try {
        const ordersResponse = await Axios.get("/api/order/pending", { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setOrders(prev => (prev = ordersResponse.data))
      } catch (e) {
        console.log("Something went wrong during loading pending orders " + e)
      }
    }
    fetchOrders()
  }, [refreshCount])

  function refresh() {
    setRefreshCount(prev => (prev += 1))
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <MainTop label="Dashboard" />
      <hr />
      <div className="container p-3 d-flex flex-column">
        <div className="bg-white row mt-4 ms-2 orders ">
          <div className="col-sm-3 grid-header items-row text-center">Date</div>
          <div className="col-sm-3 grid-header items-row text-center">Total</div>
          <div className="col-sm-5 grid-header items-row text-center">ACTION</div>
          <div className="w-100"></div>
          <hr className="p-2" />
          {orders.map((order, index) => {
            return <SingleOrderPending key={order.orderId} order={order} idx={index} refresh={refresh} />
          })}
        </div>
      </div>
    </div>
  )
}
export default OrdersPending
