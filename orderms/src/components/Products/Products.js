import React, { useEffect, useContext, useState } from "react"
import StateContext from "../../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router"
import SingleProduct from "./SingleProduct"
import { Link } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import LoadingIcon from "../LoadingIcon"
function Products() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, isLoading] = useState(false)
  const [sortBy, setSortBy] = useState("price")
  const [order, setOrder] = useState("descending")
  const category = searchParams.get("category")
  const page = searchParams.get("page")
  const [state, setState] = useImmer({
    products: [],
    reloadCounter: 0
  })

  useEffect(() => {
    if (appState.loggedIn) {
      isLoading(prev => (prev = true))
      const ourRequest = Axios.CancelToken.source()
      async function fetchData() {
        try {
          const url = new URL("http://localhost:8011/api/product")
          url.searchParams.append("category", category)
          url.searchParams.append("page", page)
          url.searchParams.append("sortBy", sortBy)
          url.searchParams.append("order", order)
          const responseProducts = await Axios.get(url, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.products = responseProducts.data
          })
          isLoading(prev => (prev = false))
        } catch (e) {
          console.log("there was a problem fetching the data " + e)
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
      <div className="mt-4 ms-5 fs-5">
        Home &gt;
        <Link to="/categories" className="fc-blue">
          {" "}
          Products
        </Link>
      </div>
      <div className="container p-3">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">{category}</div>

          <div className="ms-auto"></div>
          <div className="me-5">
            Sort by
            <select
              className="ms-2 products-select"
              onChange={e => {
                setSortBy(prev => (prev = e.target.value))
                refresh()
                console.log("click")
              }}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <select
              className="ms-2 products-select"
              onChange={e => {
                setOrder(prev => e.target.value)
                refresh()
              }}
            >
              <option value="ascending">asc</option>
              <option value="descending">desc</option>
            </select>
          </div>
          {appState.user.role === "ROLE_ADMIN" || appState.user.role === "ROLE_MANAGER" ? (
            <Link to="/products/add" className="me-3 btn btn-primary">
              Add new
            </Link>
          ) : null}

          <div className="me-4 search-order">
            <input type="text" placeholder="Find product"></input>
          </div>
        </div>

        <div className="bg-white container d-flex flex-wrap mt-4 ms-2 orders p-3 ">
          {loading ? (
            <LoadingIcon />
          ) : (
            state.products.map(product => {
              return <SingleProduct product={product} key={product.id} refresh={refresh} />
            })
          )}
        </div>
        <div className="mt-2 ms-2 fs-3">
          <Link to={`/products?category=${category}&page=${0}`} onClick={refresh} className="me-3 fc-blue">
            1
          </Link>
          <Link to={`/products?category=${category}&page=${1}`} onClick={refresh} className="fc-blue">
            2
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Products
