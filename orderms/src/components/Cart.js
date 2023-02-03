import { useContext, useState } from "react"
import StateContext from "../StateContext"
import Axios from "axios"
import { useEffect } from "react"
import CartView from "./CartView"
import DeliveryView from "./DeliveryView"
import { useImmer } from "use-immer"
function Cart() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    shoppingCart: [],
    showing: "cart",
    addressToDeliver: {
      address: "",
      city: "",
      country: "",
      postalCode: ""
    }
  })

  useEffect(() => {
    async function fetchCartItems() {
      const ourRequest = Axios.CancelToken.source()
      try {
        const response = await Axios.get(`/api/order/show/` + appState.user.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setState(draft => {
          draft.shoppingCart = response.data
        })
      } catch (e) {
        console.log("Something wrong during cart items loading " + e)
      }
    }
    fetchCartItems()
  }, [])

  function nextStep() {
    if (state.showing === "cart") {
      setState(draft => {
        draft.showing = "delivery"
      })
    }
    if (state.showing === "delivery") {
      setState(draft => {
        draft.showing = "payment"
      })
    }
  }

  function updateAddressToDeliver(address) {
    setState(draft => {
      draft.addressToDeliver = address
    })
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Cart</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3 d-flex flex-column">{state.showing === "cart" ? <CartView shoppingCart={state.shoppingCart} nextView={nextStep} /> : state.showing === "delivery" ? <DeliveryView shoppingCart={state.shoppingCart} nextView={nextStep} updateAddress={updateAddressToDeliver} /> : "payment"}</div>
    </div>
  )
}

export default Cart
