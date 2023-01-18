import React, { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router"
import StateContext from "../StateContext"
import DashboardInfoBox from "./DashboardInfoBox"
function Dashboard() {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    orderCount: 0,
    userCount: 0,
    productCount: 0,
    user: {
      id: "",
      firstName: "",
      lastName: "",
      mail: "",
      phone: "",
      role: ""
    }
  })

  useEffect(() => {
    if (appState.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchData() {
        try {
          const response = await Axios.get(`/api/user/` + appState.user.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          const orderCountResponse = await Axios.get("/api/order/count-all", { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          const productCountResponse = await Axios.get("/api/product/count-all", { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          const userCountResponse = await Axios.get("/api/user/count-all", { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          setState(draft => {
            draft.orderCount = orderCountResponse.data
            draft.userCount = userCountResponse.data
            draft.productCount = productCountResponse.data
            draft.user = response.data
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
  }, [])

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Dashboard</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{state.user.firstName + " " + state.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3">
        <div className="d-flex">
          <div className="d-flex container">
            <DashboardInfoBox background="blue" title="Orders" count={state.orderCount} />
            <DashboardInfoBox background="green" title="Users" count={state.userCount} />
            <DashboardInfoBox background="red" title="Products" count={state.productCount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
