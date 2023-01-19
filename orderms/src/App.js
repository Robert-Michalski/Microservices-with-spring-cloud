import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Orders from "./components/Orders"
import Login from "./components/Login"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import { useContext, useEffect } from "react"
import Register from "./components/Register"
import Products from "./components/Products"
import MainView from "./components/MainView"
import Dashboard from "./components/Dashboard"
import Cookies from "universal-cookie"
import jwt from "jwt-decode"
Axios.defaults.baseURL = "http://localhost:8011/"
Axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

function App() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const cookies = new Cookies()
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("userId")),
    user: {
      id: localStorage.getItem("userId"),
      // token: localStorage.getItem("userToken"),
      token: cookies.get("jwt"),
      login: localStorage.getItem("userLogin"),
      firstName: localStorage.getItem("userFirstName"),
      lastName: localStorage.getItem("userLastName")
    }
  }
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        state.loggedIn = true
        state.user.id = action.data.id
        state.user.login = action.data.login
        state.user.firstName = action.details.firstName
        state.user.lastName = action.details.lastName
        cookies.set("jwt", action.data.accessToken)
        console.log(jwt(action.data.accessToken))
        break
      case "logout":
        state.loggedIn = false
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("userId", state.user.id)
      localStorage.setItem("userLogin", state.user.login)
      localStorage.setItem("userToken", state.user.token)
      localStorage.setItem("userFirstName", state.user.firstName)
      localStorage.setItem("userLastName", state.user.lastName)
    } else {
      localStorage.removeItem("userId")
      localStorage.removeItem("userLogin")
      localStorage.removeItem("userToken")
      localStorage.removeItem("userFirstName")
      localStorage.removeItem("userLastName")
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<MainView view={Orders} />} />
            <Route path="/products" element={<MainView view={Products} />} />
            <Route path="/dashboard" element={<MainView view={Dashboard} />} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
