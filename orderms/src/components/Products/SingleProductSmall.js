import { Link } from "react-router-dom"
import GetImage from "../GetImage"

function SingleProductSmall(props) {
  function getFormattedPrice() {
    const formatted = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return formatted.format(props.product.price) + " PLN"
  }

  return (
    <Link className="col-3 d-flex flex-column p-3" to={"/products/" + props.product.id}>
      <div className="container d-flex flex-column">
        <div>{GetImage(props.product.image)}</div>
        <div>{props.product.name}</div>
      </div>
      <div className="mt-2 ms-3 fw-bold">{getFormattedPrice()}</div>
    </Link>
  )
}
export default SingleProductSmall
