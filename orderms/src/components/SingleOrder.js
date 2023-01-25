import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useContext } from "react"
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
  return (
    <>
      <div className="col-sm p-3">{props.order.id}</div>
      <div className="col-sm p-3">{productDetails.name}</div>
      <div className="col-sm p-3">17 January 2023</div>
      <div className="col-sm p-3 ">
        <span className={getStatusBg(props.order.status) + " p-2"} id="status">
          {props.order.status}
        </span>
      </div>
      <div className="col-sm p-3">{getFormattedTotal()}</div>
      <hr className="mt-2" />
      <div className="w-100"></div>
    </>
  )
}

export default SingleOrder
