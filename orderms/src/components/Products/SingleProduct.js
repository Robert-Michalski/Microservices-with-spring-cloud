import { Link } from "react-router-dom"
import GetImage from "../GetImage"
import SmartphoneLabel from "./SmartphoneLabel"
import GraphicsCardLabel from "./GraphicsCardLabel"
import ProcessorLabel from "./ProcessorLabel"
import KeyboardLabel from "./KeyboardLabel"
import MouseLabel from "./MouseLabel"
function SingleProduct(props) {
  console.log(props)
  function getFormattedPrice() {
    const formatted = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatted.format(props.product.price) + " PLN"
  }
  return (
    <Link className="col-3 d-flex flex-column p-3 product-box" to={"/products/" + props.product.id}>
      <div className="container d-flex flex-column product-box-inside">
        <div>{GetImage(props.product.image)}</div>
        <div>{props.product.name}</div>
      </div>
      <div className="ms-3 mt-2 d-flex flex-column fw-light">
        <span>Ram: 8GB</span>
        <span>Space: 256GB</span>
        <span>Snapdragon 420</span>
      </div>
      <div className="mt-3 ms-3 fw-bold">{getFormattedPrice()}</div>
    </Link>
  )
}

export default SingleProduct
