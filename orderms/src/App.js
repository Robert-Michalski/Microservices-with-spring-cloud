import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Orders from "./components/Orders"
import Login from "./components/Login"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:8011/"
Axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"

function App() {
  const initialState = {
    loggedIn: false,
    user: {
      token: "",
      login: ""
    }
  }
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        state.loggedIn = true
        state.user.token = action.data.accessToken
        state.user.login = action.data.login
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
