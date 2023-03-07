import { useState } from "react"
import MainTop from "../MainTop"
function OrdersPending() {
  const [orders, setOrders] = useState([])

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <MainTop label="Dashboard" />
      <hr />
      <div className="container p-3"></div>
    </div>
  )
}
export default OrdersPending
