function SmartphoneLabel(props) {
  return (
    <div className="d-flex flex-column col-5 fw-bold ">
      <span>
        <span className="fw-light">Display:</span> {props.product.productDetails.displayInInches}"
      </span>
      <span>
        <span className="fw-light">Processor:</span> {props.product.productDetails.processorName}
      </span>
      <span>
        <span className="fw-light">Ram:</span> {props.product.productDetails.ram} GB
      </span>
      <span>
        <span className="fw-light">Storage:</span> {props.product.productDetails.storageInGb} GB
      </span>
      <span>
        <span className="fw-light">Color:</span> {props.product.productDetails.color}
      </span>
      <span>
        <span className="fw-light">Camera:</span> {props.product.productDetails.mainCameraInMpx} mpx
      </span>
    </div>
  )
}
export default SmartphoneLabel
