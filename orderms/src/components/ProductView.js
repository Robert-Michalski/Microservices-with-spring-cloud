function ProductView(props) {
  function getBackground() {
    if (props.bgIndex % 2 === 0) return " bg-gray "
    else return " bg-white "
  }
  function getTotal() {
    return props.item.price * props.item.quantity
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
  return (
    <>
      <div className={"col-xl-4 cart-product" + getBackground() + getRadiusLeft()}>{props.item.productName}</div>
      <div className={"col-sm text-right cart-product" + getBackground()}>{props.item.price + "$"}</div>
      <div className={"col-sm cart-product" + getBackground()}>Quantity: {props.item.quantity}</div>
      <div className={"col-sm cart-product" + getBackground()}>Total: {getTotal()}$</div>
      <div className={"col-sm-1 ms-auto cart-product" + getBackground() + getRadiusRight()}>
        <span className="material-symbols-outlined">delete</span>
      </div>
      <div className="w-100"></div>
    </>
  )
}

export default ProductView
