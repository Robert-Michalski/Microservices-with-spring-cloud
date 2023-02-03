import React, { useContext, useState } from "react"
import Axios from "axios"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { Link, useNavigate } from "react-router-dom"
function SingleProduct(props) {
  const [amount, setAmount] = useState(0)
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  function handleOrder(e) {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = Axios.post("api/order", { productId: props.product.id, quantity: amount, customerId: appState.user.id, token: appState.user.token }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
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
    <>
      <div className="col-sm p-3">{props.product.id}</div>
      <div className="col-sm p-3">{props.product.name}</div>
      <div className="col-sm p-3 ">{props.product.quantity}</div>
      <div className="col-sm p-3">{getFormattedPrice()}</div>
      <div className="col-sm p-3">
        <input
          type="number"
          min="1"
          step="1"
          className="col-5"
          onChange={e => {
            if (e.target.value >= 1) setAmount(e.target.value)
          }}
          value={amount <= 0 ? "" : amount}
        />
      </div>
      {appState.user.role === "ROLE_ADMIN" || appState.user.role === "ROLE_MANAGER" ? (
        <div className="col-sm p-3">
          <Link to={props.product.id + `/edit`}>
            <button className="material-symbols-outlined me-3 btn btn-primary action-icon">edit</button>
          </Link>
          <button className="material-symbols-outlined action-icon btn btn-danger" onClick={handleDelete}>
            delete
          </button>
        </div>
      ) : (
        <div className="col-sm p-3">
          <span className="material-symbols-outlined" onClick={handleOrder}>
            add_shopping_cart
          </span>
        </div>
      )}

      <hr className="mt-2" />
      <div className="w-100"></div>
    </>
  )
}

export default SingleProduct
