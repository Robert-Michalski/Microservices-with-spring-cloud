import { useContext, useState } from "react"
import StateContext from "../StateContext"
import Axios from "axios"
import LoadingIcon from "./LoadingIcon"
import SingleProductSmall from "./Product/SingleProductSmall"
import Notification from "./Notification/Notification"
function MainTop(props) {
  const appState = useContext(StateContext)
  const [showSearch, setShowSearch] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  function toggleSearch() {
    setShowSearch(prev => !prev)
  }

  function handleSearch(e) {
    if (e.target.value.length >= 3) {
      setLoading(prev => (prev = true))
      const timer = setTimeout(() => {
        searchProducts(e.target.value)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      setProducts([...[]])
    }
  }

  async function searchProducts(productName) {
    try {
      const url = new URL("http://localhost:8011/api/product/search")
      url.searchParams.append("name", productName)
      const ourRequest = Axios.CancelToken.source()
      const responseProducts = await Axios.get(url, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      setProducts([...responseProducts.data])
      setLoading(prev => (prev = false))
    } catch (e) {
      console.log("Something went wrong during search " + e)
    }
  }

  return (
    <div className="d-flex orders-top p-4 align-items-center container">
      {showSearch ? (
        <div className="relative">
          <div className="absolute container search">
            <div className="d-flex flex-column align-items-center mt-5">
              <div className="d-flex mt-4 container align-items-center justify-content-center">
                <div className="col-6 ms-5">
                  <input type="text" placeholder="What are you looking for ? " className="container" onChange={e => handleSearch(e)} autoFocus />
                </div>
                <span className="material-symbols-outlined ms-2" onClick={toggleSearch}>
                  cancel
                </span>
              </div>
              <div className="d-flex flex-wrap mt-4 col-8">
                {loading ? (
                  <LoadingIcon />
                ) : products.length > 0 ? (
                  products.map((product, index) => {
                    console.log(product)
                    return <SingleProductSmall product={product} />
                  })
                ) : (
                  "No results found, start typing !"
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="ms-4">{props.label}</div>
      <div className="ms-auto d-flex">
        <span className="material-symbols-outlined " onClick={toggleSearch}>
          search
        </span>
      </div>
      <Notification />
      <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
    </div>
  )
}
export default MainTop
