import ProductView from "./ProductView"
import StateContext from "../../StateContext"
import { useContext } from "react"
function SummaryView(props) {
  const appState = useContext(StateContext)
  function getTotal() {
    let total = 0
    props.shoppingCart.forEach(product => {
      total += product.quantity * product.price
    })
    return total.toFixed(2) + " $"
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="ms-3 fs-2">My cart</div>
      </div>
      <div className="d-flex justify-content-around align-items-center fs-5 mt-5">
        <div className=" d-flex align-items-center cart-order fc-green">
          <div>Cart</div>
          <span className="material-symbols-outlined ms-2">check_circle</span>
        </div>
        <div className=" d-flex align-items-center cart-order fc-green">
          <div>Delivery</div>
          <span className="material-symbols-outlined ms-2">check_circle</span>
        </div>
        <div className="fw-bold d-flex align-items-center cart-order cart-order-active">
          <div>Summary</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
      </div>
      <div className="d-flex container mt-4">
        <div>
          <div className="bg-white row ms-2 orders col-11">
            {props.shoppingCart.map((product, index) => {
              return <ProductView item={product} key={index} bgIndex={index} max={props.shoppingCart.length} />
            })}
          </div>
        </div>
        {/* -------------- */}
        <div className="ms-auto me-4 col-3 d-flex flex-column">
          <div className="text-right cart-product fw-bold address-box mb-3">
            <span>{appState.user.firstName + " " + appState.user.lastName}</span>
            <br />
            <span>{props.addressToDeliver.address}</span>
            <br />
            {props.addressToDeliver.city + ", " + props.addressToDeliver.country}
            <br />
            <span>{props.addressToDeliver.postalCode}</span>
          </div>
          <div className="d-flex flex-column">
            <div className="bg-white d-flex flex-column orders p-3">
              <div>
                Total: <span className="fw-bold ms-2">{getTotal()}</span>
              </div>
              <div className="">
                <button className="btn bg-green fc-white col-12 mt-4" onClick={props.handleOrder}>
                  PAYMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SummaryView
