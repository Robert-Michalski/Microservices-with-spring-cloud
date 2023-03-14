import { useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import StateContext from "../../StateContext"
import Axios from "axios"
import { useState } from "react"
import GetImage from "../GetImage"
import SmartphoneLabel from "./SmartphoneLabel"
import GraphicsCardLabel from "./GraphicsCardLabel"
import ProcessorLabel from "./ProcessorLabel"
import KeyboardLabel from "./KeyboardLabel"
import MouseLabel from "./MouseLabel"
import DispatchContext from "../../DispatchContext"
import MainTop from "../MainTop"
import LoadingIcon from "../LoadingIcon"
function SingleProductDetailed() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [amount, setAmount] = useState(1)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageData, setImageData] = useState({})

  useEffect(() => {
    async function fetchProduct() {
      const ourRequest = Axios.CancelToken.source()
      try {
        const productResponse = await Axios.get("/api/product/" + id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setProduct(productResponse.data)
      } catch (e) {
        console.log("something went wrong during product loading " + e)
      }
    }
    fetchProduct()
  }, [])

  useEffect(() => {
    async function fetchImage() {
      const ourRequest = Axios.CancelToken.source()
      try {
        setImageLoading(prev => (prev = true))
        const productResponse = await Axios.get("http://localhost:9092/api/image/" + product.imageId, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setImageData(productResponse.data)
        setImageLoading(prev => (prev = false))
      } catch (e) {
        console.log("something went wrong during product loading " + e)
      }
    }
    if (product.imageId) {
      fetchImage()
    }
  }, [product])

  async function handleAdd() {
    const ourRequest = Axios.CancelToken.source()
    try {
      const productResponse = await Axios.post("/api/order", { productId: product.id, quantity: amount, customerId: appState.user.id }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      if (productResponse.request.status === 201) {
        appDispatch({ type: "flashMessage", value: "Item added to cart !" })
      }
    } catch (e) {
      console.log("something went wrong during adding product to cart " + e)
    }
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <MainTop label="Products" />
      <hr />
      <div className="mt-4 ms-5 fs-5">
        <Link to="/categories" className="fc-blue">
          Products
        </Link>
        {" > "}
        <Link to={"/products?category=" + product?.category?.name} className="fc-blue">
          {product?.category?.name}
        </Link>
      </div>
      <div className="container mt-4 ms-2 p-3 d-flex bg-white orders">
        <div className="col-6">{imageLoading ? <LoadingIcon /> : GetImage(imageData.data)}</div>
        <div className="col-6 d-flex flex-column mt-4">
          <div>
            <span className="fs-4 fw-bold">{product.name}</span>
          </div>
          <div className="d-flex mt-5">
            {product?.productDetails && product.category.name === "Smartphones" && <SmartphoneLabel product={product} />}
            {product?.productDetails && product.category.name === "Graphics Cards" && <GraphicsCardLabel product={product} />}
            {product?.productDetails && product.category.name === "Processors" && <ProcessorLabel product={product} />}
            {product?.productDetails && product.category.name === "Keyboards" && <KeyboardLabel product={product} />}
            {product?.productDetails && product.category.name === "Mouses" && <MouseLabel product={product} />}
            <div className="container col-7 product-buy-right">
              <div className="d-flex flex-column orders p-3">
                <div className="text-end">
                  <span className="fs-4">{product.price}.00 PLN</span>
                  <div className="d-flex mt-3">
                    <input type="number" className="col-3 text-center" value={amount} onChange={e => setAmount(prev => (prev = e.target.value))} />
                    <button className="ms-auto bg-green fc-white d-flex p-2 col-8 fs-5 align-items-center" onClick={handleAdd}>
                      <span className="material-symbols-outlined me-3">add_shopping_cart</span>Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductDetailed
