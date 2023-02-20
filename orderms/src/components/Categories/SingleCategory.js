import { Link } from "react-router-dom"
import GetImage from "../GetImage"
function SingleCategory(props) {
  return (
    <div className="d-flex category mb-3">
      <div className="category-img col-2">{GetImage(props.img)}</div>
      <Link to={`/products?category=${props.category.name}&page=0`} className="align-self-center fs-2 fw-bold ms-4">
        {props.category.name}
      </Link>
    </div>
  )
}

export default SingleCategory
