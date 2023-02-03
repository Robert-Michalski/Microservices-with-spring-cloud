import { useContext, useState } from "react"
import StateContext from "../StateContext"
import Axios from "axios"
import { useEffect } from "react"
import CartView from "./CartView"
import DeliveryView from "./DeliveryView"
function Cart() {
  const appState = useContext(StateContext)

  const [shoppingCart, setShoppingCart] = useState([])
  const [showing, setShowing] = useState("cart")

  useEffect(() => {
    async function fetchCartItems() {
      const ourRequest = Axios.CancelToken.source()
      try {
        const response = await Axios.get(`/api/order/show/` + appState.user.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setShoppingCart(response.data)
      } catch (e) {
        console.log("Something wrong during cart items loading " + e)
      }
    }
    fetchCartItems()
  }, [])

  function nextStep() {
    if (showing === "cart") {
      setShowing("delivery")
    }
    if (showing === "delivery") {
      setShowing("payment")
    }
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
      <div className="container p-3 d-flex flex-column">{showing === "cart" ? <CartView shoppingCart={shoppingCart} nextView={nextStep} /> : showing === "delivery" ? <DeliveryView shoppingCart={shoppingCart} nextView={nextStep} /> : "payment"}</div>
    </div>
  )
}

export default Cart
