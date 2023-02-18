import Axios from "axios"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { useImmer } from "use-immer"
import StateContext from "../../StateContext"
function DeliveryView(props) {
  const appState = useContext(StateContext)

  const [state, setState] = useImmer({
    addresses: []
  })

  function getTotal() {
    let total = 0
    props.shoppingCart.forEach(product => {
      total += product.quantity * product.price
    })
    return total.toFixed(2) + " $"
  }

  useEffect(() => {
    async function fetchAddresses() {
      const ourRequest = Axios.CancelToken.source()
      try {
        const response = await Axios.get(`api/user/` + appState.user.id + `/addresses`, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setState(draft => {
          draft.addresses = response.data
        })
      } catch (e) {
        console.log("Something wrong during addresses loading " + e)
      }
    }
    fetchAddresses()
  }, [])

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="ms-3 fs-2">Delivery</div>
      </div>
      <div className="d-flex justify-content-around align-items-center fs-5 mt-5">
        <div className=" d-flex align-items-center cart-order fc-green">
          <div>Cart</div>
          <span className="material-symbols-outlined ms-2">check_circle</span>
        </div>
        <div className="fw-bold d-flex align-items-center cart-order cart-order-active">
          <div>Delivery</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
        <div className="d-flex align-items-center cart-order">
          <div>Summary</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
      </div>
      <div className="d-flex container mt-4">
        <div className="d-flex flex-wrap ms-2 col-8">
          {state.addresses.map((address, index) => {
            return (
              <div key={index} className="mb-3">
                <div className="col-sm text-right cart-product fw-bold address-box" tabIndex={index} onClick={() => props.updateAddress(address)}>
                  <span>{address.address}</span>
                  <br />
                  {address.city + ", " + address.country}
                  <br />
                  <span>{address.postalCode}</span>
                </div>
                <div className="w-100"></div>
              </div>
            )
          })}
        </div>
        <div className="ms-auto col-3">
          <div className="bg-white d-flex flex-column orders p-3">
            <div>
              Total: <span className="fw-bold ms-2">{getTotal()}</span>
            </div>
            <div>
              <button className="btn bg-green fc-white col-12 mt-4" onClick={props.nextView}>
                PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 ms-3">
        <Link to="/user/address/new" className="btn btn-primary">
          Add new address
        </Link>
      </div>
    </>
  )
}
export default DeliveryView
