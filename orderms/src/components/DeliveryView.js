import Axios from "axios"
import { useState } from "react"
function DeliveryView(props) {
  const [address, setAddress] = useState([
    {
      address: "Warszawska 10/1",
      city: "Warsaw",
      country: "Poland",
      postalCode: "72-467"
    }
  ])

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="ms-3 fs-2">My cart</div>
      </div>
      <div className="d-flex justify-content-around align-items-center fs-5 mt-4">
        <div className="d-flex align-items-center fc-green">
          <div>Cart</div>
          <span className="material-symbols-outlined ms-2">check_circle</span>
        </div>
        <div className="fw-bold d-flex align-items-center cart-order">
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
          <div className="col-sm">Known addresses</div>
          <div className="w-100"></div>
          <div className="col-sm text-right cart-product">Warszawska 10/1, 72-467 Warsaw, Poland</div>
          <div className="w-100"></div>
          <div className="col-sm text-right cart-product">Warszawska 10/1, 72-467 Warsaw, Poland</div>
        </div>
        <div className="ms-auto col-3">
          <div className="bg-white d-flex flex-column orders p-3">
            <div>
              Total: <span className="fw-bold ms-2">365.00$</span>
            </div>
            <div>
              <button className="btn bg-green fc-white col-12 mt-4" onClick={props.nextView}>
                PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DeliveryView
