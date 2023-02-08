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
        console.log(response.data)
      } catch (e) {
        console.log("Something wrong during cart items loading " + e)
      }
    }
    fetchCartItems()
  }, [state.refreshCount])

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
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Cart</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3 d-flex flex-column">{state.showing === "cart" ? <CartView shoppingCart={state.shoppingCart} nextView={nextStep} refresh={refresh} /> : state.showing === "delivery" ? <DeliveryView shoppingCart={state.shoppingCart} nextView={nextStep} updateAddress={updateAddressToDeliver} /> : <SummaryView shoppingCart={state.shoppingCart} addressToDeliver={state.addressToDeliver} handleOrder={handleOrder} />}</div>
    </div>
  )
}

export default Cart
