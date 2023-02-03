import { useContext, useState } from "react"
import StateContext from "../StateContext"
import ProductView from "./ProductView"
import Axios from "axios"
import { useEffect } from "react"
function Cart() {
  const appState = useContext(StateContext)

  const [shoppingCart, setShoppingCart] = useState([])

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
  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Cart</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3 d-flex flex-column">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">My cart</div>
        </div>
        <div className="d-flex justify-content-around align-items-center fs-5">
          <div className="fw-bold d-flex align-items-center cart-order">
            <div>Cart</div>
            <span className="material-symbols-outlined ms-2">cancel</span>
          </div>
          <div className=" d-flex align-items-center">
            <div>Delivery</div>
            <span className="material-symbols-outlined ms-2">cancel</span>
          </div>
          <div className="d-flex align-items-center">
            <div>Payment</div>
            <span className="material-symbols-outlined ms-2">cancel</span>
          </div>
        </div>
        <div className="d-flex container mt-4">
          <div className="bg-white row ms-2 orders col-8">
            {shoppingCart.map((product, index) => {
              return <ProductView item={product} key={index} bgIndex={index} max={shoppingCart.length} />
            })}
          </div>
          {/* -------------- */}
          <div className="ms-auto col-3">
            <div className="bg-white d-flex flex-column orders p-3">
              <div>
                Total: <span className="fw-bold ms-2">365.00$</span>
              </div>
              <div className="">
                <button className="btn bg-green fc-white col-12 mt-4">DELIVERY</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
