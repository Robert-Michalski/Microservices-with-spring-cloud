import React, { useContext, useState } from "react"
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { Link, useNavigate } from "react-router-dom"
import GetImage from "./GetImage"
function SingleProduct(props) {
  const [amount, setAmount] = useState(0)
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  function handleOrder() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = Axios.post("api/order", { customerId: appState.user.id, productId: props.product.id, quantity: amount }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      response
        .then(res => {
          if (res.request.status === 201) {
            setAmount(prev => (prev = 0))
            appDispatch({ type: "flashMessage", value: "Order placed succesfully" })
          }
        })
        .catch(err => {
          if (err.response) {
            // client received an error response (5xx, 4xx)
            if (err.response.status === 404) {
              navigate("/notFound")
            }
            if (err.response.status === 400) {
              appDispatch({ type: "flashMessage", value: "Something went wrong", bg: "red" })
              console.log("400 from 400")
            }
          } else if (err.request) {
            // client never received a response, or request never left
            console.log(err.response.status)
          } else {
            // anything else
            console.log(err.response.status)
          }
        })
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

  async function handleDelete() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = await Axios.delete("/api/product/" + props.product.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      if (response.request.status === 200) {
        props.refresh()
      }
    } catch (e) {
      console.log("something wrong during product delete " + e)
    }

    return () => {
      ourRequest.cancel()
    }
  }

  return (
    <div className="col-3 d-flex flex-column p-3 product-box">
      <div className="container d-flex flex-column product-box-inside">
        <div>{GetImage(props.product.image)}</div>
        <div>{props.product.name}</div>
      </div>
      <div className="ms-3 mt-2 d-flex flex-column fw-light">
        <span>Ram: 8GB</span>
        <span>Space: 256GB</span>
        <span>Snapdragon 420</span>
      </div>
      <div className="mt-3 ms-3 fw-bold">{getFormattedPrice()}</div>
    </div>
  )
}

export default SingleProduct
