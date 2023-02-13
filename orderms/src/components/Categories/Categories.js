import React, { useEffect, useContext } from "react"
import StateContext from "../../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router"
import SingleProduct from "../SingleProduct"
import { Link } from "react-router-dom"
function Categories() {
  const appState = useContext(StateContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function getCategories() {
      try {
        const response = await Axios.get("/api/category/all", { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        console.log(response.data)
      } catch (e) {
        console.log("Something went wrong when loading categories " + e)
      }
    }
    getCategories()
  }, [])

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
        </div>

        <div className="bg-white mt-4 ms-2 orders p-3"></div>
      </div>
    </div>
  )
}

export default Categories
