import Axios from "axios"
import { useContext } from "react"
import StateContext from "../../StateContext"
function ProductView(props) {
  const appState = useContext(StateContext)

  function getBackground() {
    if (props.bgIndex % 2 === 0) return " bg-gray "
    else return " bg-white "
  }
  function getTotal() {
    return (props.item.price * props.item.quantity).toFixed(2) + " $"
  }
  //  TODO: Maybe do it better somehow
  function getRadiusLeft() {
    if (props.bgIndex === 0) return " cart-product-radius-top-left "
    if (props.bgIndex === props.max - 1) return " cart-product-radius-bottom-left "
  }
  function getRadiusRight() {
    if (props.bgIndex === 0) return " cart-product-radius-top-right "
    if (props.bgIndex === props.max - 1) return " cart-product-radius-bottom-left "
  }
  function handleDelete() {
    const ourRequest = Axios.CancelToken.source()
    console.log(props)
    try {
      Axios.delete("/api/order/" + props.item.orderId, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      props.refresh()
    } catch (e) {
      console.log("There was a problem when trying to delete from cart: " + e)
    }
  }
  return (
    <>
      <div className={"col-sm cart-product" + getBackground() + getRadiusLeft()}>{props.item.productName}</div>
      <div className={"col-sm cart-product" + getBackground()}>{props.item.price.toFixed(2) + " $"}</div>
      <div className={"col-sm cart-product" + getBackground()}>Quantity: {props.item.quantity}</div>
      <div className={"col-sm cart-product" + getBackground()}>Total: {getTotal()}</div>
      <div className={"col-sm ms-auto cart-product" + getBackground() + getRadiusRight()}>
        <span className="material-symbols-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>
      <div className="w-100"></div>
    </>
  )
}

export default ProductView
