import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
function Login() {
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = await Axios.post("api/user/login", { mail, password }, { cancelToken: ourRequest.token })
      const userDetailsResponse = await Axios.get(`/api/user/` + response.data.id, { headers: { Authorization: `Bearer ${response.data.accessToken}` } }, { cancelToken: ourRequest.token })

      if (response.data) {
        appDispatch({ type: "flashMessage", value: "Succesfully logged in !" })
        appDispatch({ type: "login", data: response.data, details: userDetailsResponse.data })
        navigate("/categories")
      }
    } catch (e) {
      if (e.response.status === 403) {
        console.log("Wrong credentials")
      } else {
        console.log("Something went wrong :" + e)
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/orders")
    }
  }, [])
  return (
    <div className="container bg-gray mt-4">
      <form className="d-flex flex-column login" onSubmit={handleSubmit}>
        <div className="mx-auto fs-login">User Login</div>
        <span className="material-symbols-outlined mx-auto mt-4">login</span>
        <input type="text" className="col-3 mx-auto mt-4 p-2" placeholder="Email" onChange={e => setMail(e.target.value)} autoFocus />
        <input type="password" className="col-3 mx-auto mt-3 p-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="col-3 mx-auto mt-3 mb-5 ">
          LOGIN
        </button>
        <Link to="/register" className="mx-auto btn btn-secondary mb-5" id="register-btn">
          REGISTER
        </Link>
        {/* <button onClick={() => console.log(appState)}>check state</button> */}
      </form>
    </div>
  )
}

export default Login
