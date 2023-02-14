import { Link } from "react-router-dom"
import { Buffer } from "buffer"
function SingleCategory(props) {
  function getImage() {
    if (props.img) {
      const buffer = Buffer.from(props.img, "base64")
      const imgString = buffer.toString("base64")
      return <img src={"data:image/png;base64," + imgString} alt="Red dot" />
    } else {
      return <img src="" alt="Red dot" />
    }
  }

  return (
    <div className="d-flex category mb-3">
      <div className="category-img col-2">{getImage()}</div>
      <Link to={"/products?category=" + props.category.name} className="align-self-center fs-2 fw-bold ms-4">
        {props.category.name}
      </Link>
    </div>
  )
}

export default SingleCategory
