function GraphicsCardLabel(props) {
  console.log(props)
  return (
    <div className="d-flex flex-column col-5 fw-bold ">
      <span>
        <span className="fw-light">Memory type:</span> {props.product.productDetails.memoryType}"
      </span>
      <span>
        <span className="fw-light">Memory:</span> {props.product.productDetails.memoryInGb} GB
      </span>
      <span>
        <span className="fw-light">Connectors:</span> {props.product.productDetails.connectors} GB
      </span>
      <span>
        <span className="fw-light">Clock speed:</span> {props.product.productDetails.clockSpeedInMHz} Ghz
      </span>
      <span>
        <span className="fw-light">Destination:</span> {props.product.productDetails.destination}
      </span>
      <span>
        <span className="fw-light">Backlight:</span> {props.product.productDetails.backlight}
      </span>
    </div>
  )
}
export default GraphicsCardLabel
