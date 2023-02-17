function SmartphoneLabel(props) {
  return (
    <div className="d-flex flex-column col-5">
      <span>
        <span className="fw-light">Display:</span> {props.product.productDetails.productSmartphoneDetails.displayInInches}"
      </span>
      <span>
        <span className="fw-light">Processor:</span> {props.product.productDetails.productSmartphoneDetails.processorName}
      </span>
      <span>
        <span className="fw-light">Ram:</span> {props.product.productDetails.productSmartphoneDetails.ram} GB
      </span>
      <span>
        <span className="fw-light">Storage:</span> {props.product.productDetails.productSmartphoneDetails.storage} GB
      </span>
      <span>
        <span className="fw-light">Color:</span> {props.product.productDetails.productSmartphoneDetails.color}
      </span>
      <span>
        <span className="fw-light">Camera:</span> {props.product.productDetails.productSmartphoneDetails.cameraInMpx} mpx
      </span>
    </div>
  )
}
export default SmartphoneLabel
