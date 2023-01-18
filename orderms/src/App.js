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
Axios.defaults.baseURL = "http://localhost:8011/"
Axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

function App() {
  const appState = useContext(StateContext)

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("userId")),
    user: {
      id: localStorage.getItem("userId"),
      token: localStorage.getItem("userToken"),
      login: localStorage.getItem("userLogin")
    }
  }
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        state.loggedIn = true
        state.user.id = action.data.id
        state.user.token = action.data.accessToken
        state.user.login = action.data.login
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
    } else {
      localStorage.removeItem("userId")
      localStorage.removeItem("userLogin")
      localStorage.removeItem("userToken")
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
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
