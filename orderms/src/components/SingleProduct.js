import React, { useContext, useState } from "react"
import Axios from "axios"
import StateContext from "../StateContext"
function SingleProduct(props) {
  const [amount, setAmount] = useState(0)
  const appState = useContext(StateContext)
  function handleOrder() {
    const ourRequest = Axios.CancelToken.source()
    try {
      Axios.post("api/order", { productId: props.product.id, quantity: amount, customerId: appState.user.id }, { cancelToken: ourRequest.token })
    } catch (e) {
      console.log("Error during order placement " + e)
    }
    return () => {
      ourRequest.cancel()
    }
  }
  function getFormattedPrice() {
    const formatted = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatted.format(props.product.price) + " PLN"
  }
  return (
    <>
      <div className="col-sm p-3">{props.product.id}</div>
      <div className="col-sm p-3">{props.product.name}</div>
      <div className="col-sm p-3 ">{props.product.quantity}</div>
      <div className="col-sm p-3">{getFormattedPrice()}</div>
      <div className="col-sm p-3">
        <input type="number" className="col-5" onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="col-sm p-3 btn btn-primary" onClick={handleOrder}>
        ORDER NOW
      </div>
      <hr className="mt-2" />
      <div className="w-100"></div>
    </>
  )
}

export default SingleProduct
