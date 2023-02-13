import { Link } from "react-router-dom"

function SingleCategory(props) {
  function getImage() {
    if (props.img) {
      const a = Buffer.from(props.img, "base64")
      console.log(a)
    } else {
      return "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-turing/overview/shop-2080-ti-300@2x.jpg"
    }
  }

  return (
    <div className="d-flex category mb-3">
      <div className="category-img col-5">
        <img src={getImage()} />
      </div>
      <Link to={"/products?category=" + props.category.name} className="align-self-center fs-2 fw-bold ms-4">
        {props.category.name}
      </Link>
    </div>
  )
}

export default SingleCategory
