function KeyboardLabel(props) {
  return (
    <div className="d-flex flex-column col-5 fw-bold ">
      <span>
        <span className="fw-light">Destination:</span> {props.product.productDetails.destination}
      </span>
      <span>
        <span className="fw-light">Switches:</span> {props.product.productDetails.switches}
      </span>
      <span>
        <span className="fw-light">Connectivity:</span> {props.product.productDetails.connectivity}
      </span>
      <span>
        <span className="fw-light">Backlight:</span> {props.product.productDetails.backlight}
      </span>
    </div>
  )
}
export default KeyboardLabel
