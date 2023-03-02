import { useState } from "react"
import Axios from "axios"
import { useContext } from "react"
import StateContext from "../../StateContext"
import { useEffect } from "react"
function ProductView(props) {
  const appState = useContext(StateContext)
  const [amountToDelete, setAmountToDelete] = useState(props.item.quantity)

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

  async function handleDelete() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = await Axios.delete("/api/order/" + props.item.orderId + "/product", { params: { productId: props.item.productId, amountToDelete }, headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      props.refresh()
    } catch (e) {
      console.log("There was a problem when trying to delete from cart: " + e)
    }
  }
  useEffect(() => {
    getQuantity()
  }, [amountToDelete])

  function getQuantity() {
    var options = []
    for (var i = 1; i <= props.item.quantity; i++) {
      options.push(
        <option value={i} selected={i === props.item.quantity}>
          {i}
        </option>
      )
    }
    return options
  }
  return (
    <>
      {props.bgIndex >= 1 ? <div className="w-100"></div> : null}
      <div className={"col-sm-5 cart-product" + getBackground() + getRadiusLeft()}>{props.item.productName}</div>
      <div className={"col-sm-3 cart-product" + getBackground()}>{props.item.price.toFixed(2) + " PLN"}</div>
      <div className={"col-sm-3 cart-product" + getBackground()}>
        Quantity:
        <select className={"ms-1 borderless " + getBackground()} onChange={e => setAmountToDelete(prev => (prev = e.target.value))}>
          {getQuantity()}
        </select>
      </div>
      <div className={"col-sm-1 ms-auto cart-product" + getBackground() + getRadiusRight()}>
        <span className="material-symbols-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>
    </>
  )
}

export default ProductView
