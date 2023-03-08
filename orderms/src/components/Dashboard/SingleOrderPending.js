import Axios from "axios"
import { useContext } from "react"
import StateContext from "../../StateContext"
import getFormattedDate from "../GetFormattedDate"
import { Link } from "react-router-dom"
function SingleOrderPending(props) {
  const appState = useContext(StateContext)

  async function handleSend() {
    const ourRequest = Axios.CancelToken.source()

    try {
      await Axios.patch("/api/order/status", { orderId: props.order.orderId, addressId: props.order.addressId, status: "DELIVERY" }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      props.refresh()
    } catch (e) {
      console.log("Something went wrong during loading pending orders " + e)
    }
  }
  function getTotal() {
    let total = 0
    props.order.products.forEach(product => {
      total += product.quantityOrdered * product.price
    })
    return total.toFixed(2) + " PLN"
  }
  return (
    <>
      <div className={"col-sm-3 items-row text-center "}>{getFormattedDate(props.order.orderDate)}</div>
      <div className={"col-sm-3 items-row text-center "}>{getTotal()}</div>
      <div className="col-sm-5 items-row d-flex justify-content-center">
        <div>
          <button className="btn btn-primary" onClick={handleSend}>
            SEND
          </button>
        </div>
        <div>
          <button className="btn btn-secondary bg-red ms-2">CANCEL</button>
        </div>
        <div>
          <Link to={"/orders/" + props.order.orderId} className="btn btn-secondary bg-green ms-2">
            VIEW
          </Link>
        </div>
      </div>

      <hr />
      <div className="w-100"></div>
    </>
  )
}
export default SingleOrderPending
