import Axios from "axios"
import { useContext } from "react"
import StateContext from "../../StateContext"
function SingleOrderPending(props) {
  const appState = useContext(StateContext)
  function getFormattedDate() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }
    const date = new Date(props.order.orderDate).toLocaleString("en-EN", options)
    return date
  }

  async function handleSend() {
    const ourRequest = Axios.CancelToken.source()

    try {
      await Axios.patch("/api/order/status", { orderId: props.order.orderId, addressId: props.order.addressId, status: "DELIVERY" }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
    } catch (e) {
      console.log("Something went wrong during loading pending orders " + e)
    }
  }

  return (
    <>
      <div className={"col-sm-4 items-row text-center"}>{props.order.productName}</div>
      <div className={"col-sm-2 items-row text-center "}>{props.order.quantity}</div>
      <div className={"col-sm-3 items-row text-center "}>{getFormattedDate()}</div>
      <div className="col-sm-3 items-row d-flex justify-content-center">
        <div>
          <button className="btn btn-primary" onClick={handleSend}>
            SEND
          </button>
        </div>
        <div>
          <button className="btn btn-secondary bg-red ms-2">CANCEL</button>
        </div>
      </div>
      <hr />
      <div className="w-100"></div>
    </>
  )
}
export default SingleOrderPending
