import { Link } from "react-router-dom"
import GetImage from "../GetImage"
import { useState, useEffect } from "react"
import Axios from "axios"
function SingleProduct(props) {
  const [imgData, setImgData] = useState([])

  function getFormattedPrice() {
    const formatted = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatted.format(props.product.price) + " PLN"
  }

  useEffect(() => {
    async function fetchImg() {
      try {
        const response = await Axios.get("http://localhost:9092/api/image/" + props.product.imageId)
        setImgData(prev => (prev = response.data.data))
      } catch (e) {
        console.log("something went wrong when loading image " + e)
      }
    }
    fetchImg()
  }, [])

  return (
    <Link className="col-3 d-flex flex-column p-3 product-box" to={"/products/" + props.product.id}>
      <div className="container d-flex flex-column product-box-inside">
        <div>{GetImage(imgData)}</div>
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
