function ProcessorLabel(props) {
  return (
    <div className="d-flex flex-column col-5 fw-bold ">
      <span>
        <span className="fw-light">Socket:</span> {props.product.productDetails.socket}
      </span>
      <span>
        <span className="fw-light">Clock speed:</span> {props.product.productDetails.clockSpeedInMHz / 1000} GHz
      </span>
      <span>
        <span className="fw-light">Cores:</span> {props.product.productDetails.cores}
      </span>
      <span>
        <span className="fw-light">Cache:</span> {props.product.productDetails.cacheInMb} MB
      </span>
    </div>
  )
}
export default ProcessorLabel
