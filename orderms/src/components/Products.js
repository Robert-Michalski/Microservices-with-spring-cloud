import React, { useEffect, useContext } from "react"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import { useNavigate, useParams } from "react-router"
import SingleProduct from "./SingleProduct"
import { Link } from "react-router-dom"
function Products() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const { category } = useParams()
  const [state, setState] = useImmer({
    products: [],
    reloadCounter: 0
  })

  useEffect(() => {
    console.log(category)
    if (appState.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchData() {
        try {
          const responseProducts = await Axios.get(`/api/product/category/keyboards`, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.products = responseProducts.data
          })
        } catch (e) {
          console.log("there was a problem fetching the data")
        }
      }
      fetchData()
      return () => {
        ourRequest.cancel()
      }
    } else {
      navigate("/")
    }
  }, [state.reloadCounter])

  function refresh() {
    setState(draft => {
      draft.reloadCounter++
    })
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Products</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">All categories</div>
          <div className="ms-auto"></div>
          {appState.user.role === "ROLE_ADMIN" || appState.user.role === "ROLE_MANAGER" ? (
            <Link to="/products/add" className="me-3 btn btn-primary">
              Add new
            </Link>
          ) : null}

          <div className="me-4 search-order">
            <input type="text" placeholder="Find product"></input>
          </div>
        </div>

        <div className="bg-white row mt-4 ms-2 orders p-3">
          <div className="col-sm grid-header">Item ID</div>
          <div className="col-sm grid-header">Name</div>
          <div className="col-sm grid-header">Available</div>
          <div className="col-sm grid-header">Price</div>
          <div className="col-sm grid-header">Quantity</div>
          <div className="col-sm grid-header"></div>
          <div className="w-100"></div>
          <hr className="mt-3" />
          {state.products.map(product => {
            return <SingleProduct product={product} key={product.id} refresh={refresh} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Products
