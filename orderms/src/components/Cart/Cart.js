import { useContext, useState } from "react"
import StateContext from "../../StateContext"
import Axios from "axios"
import { useEffect } from "react"
import CartView from "./CartView"
import DeliveryView from "./DeliveryView"
import { useImmer } from "use-immer"
import SummaryView from "./SummaryView"
import DispatchContext from "../../DispatchContext"
import { useNavigate } from "react-router"
import MainTop from "../MainTop"
function Cart() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  const [state, setState] = useImmer({
    shoppingCart: [],
    showing: "cart",
    addressToDeliver: {},
    refreshCount: 0
  })

  useEffect(() => {
    async function fetchCartItems() {
      const ourRequest = Axios.CancelToken.source()
      try {
        const response = await Axios.get(`/api/order/cart/` + appState.user.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setState(draft => {
          draft.shoppingCart = response.data
        })
      } catch (e) {
        console.log("Something wrong during cart items loading " + e)
      }
    }
    fetchCartItems()
  }, [state.refreshCount])

  function nextStep() {
    console.log(state.addressToDeliver)
    if (state.showing === "cart" && state.shoppingCart.length > 0) {
      setState(draft => {
        draft.showing = "delivery"
      })
    } else if (state.showing === "cart" && state.shoppingCart.length === 0) {
      appDispatch({ type: "flashMessage", value: "No items added to cart !", bg: "red" })
    }
    if (state.showing === "delivery" && Object.keys(state.addressToDeliver).length > 0) {
      setState(draft => {
        draft.showing = "payment"
      })
    } else if (state.showing === "delivery" && Object.keys(state.addressToDeliver).length === 0) {
      appDispatch({ type: "flashMessage", value: "Select an address !", bg: "red" })
    }
  }

  function updateAddressToDeliver(address) {
    setState(draft => {
      draft.addressToDeliver = address
    })
  }

  async function handleOrder() {
    const ourRequest = Axios.CancelToken.source()
    try {
      await Axios.patch(`/api/order/status`, { orderId: state.shoppingCart[0].orderId, addressId: state.addressToDeliver.id, status: 1 }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      appDispatch({ type: "flashMessage", value: "Order received !" })
      navigate("/orders")
    } catch (e) {
      console.log("Something wrong during cart items loading " + e)
    }
  }

  function refresh() {
    setState(draft => {
      draft.refreshCount++
    })
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <MainTop label="Cart" />
      <hr />
      <div className="container p-3 d-flex flex-column">{state.showing === "cart" ? <CartView shoppingCart={state.shoppingCart} nextView={nextStep} refresh={refresh} /> : state.showing === "delivery" ? <DeliveryView shoppingCart={state.shoppingCart} nextView={nextStep} updateAddress={updateAddressToDeliver} /> : <SummaryView shoppingCart={state.shoppingCart} addressToDeliver={state.addressToDeliver} handleOrder={handleOrder} />}</div>
    </div>
  )
}

export default Cart
