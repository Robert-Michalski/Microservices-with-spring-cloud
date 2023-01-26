import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import StateContext from "../StateContext"
function SingleOrder(props) {
  const appState = useContext(StateContext)
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    details: ""
  })

  function getStatusBg(status) {
    if (status === "RECEIVED") return "bg-green"
    else {
      return "bg-red"
    }
  }
  async function getProduct() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const product = await Axios.get("api/product/" + props.order.productId, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      setProductDetails(product.data)
    } catch (e) {
      console.log("Something wrong during get product details" + e)
    }
  }
  useEffect(() => {
    getProduct()
  }, [])

  function getFormattedTotal() {
    const total = props.order.quantity * productDetails.price
    const formatted = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatted.format(total) + " PLN"
  }
  function getBackground() {
    if (props.bgIndex % 2 === 0) return " bg-gray"
    else return " bg-white"
  }
  return (
    <>
      <div className={"col-sm items-row " + getBackground()}>{props.order.id}</div>
      <div className={"col-sm items-row " + getBackground()}>{productDetails.name}</div>
      <div className={"col-sm items-row " + getBackground()}>17 January 2023</div>
      <div className={"col-sm items-row " + getBackground()}>
        <span className={getStatusBg(props.order.status) + " p-2 "} id="status">
          {props.order.status}
        </span>
      </div>
      <div className={"col-sm items-row " + getBackground()}>{getFormattedTotal()}</div>
      <hr />
      <div className="w-100"></div>
    </>
  )
}

export default SingleOrder
