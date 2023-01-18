import React, { useEffect } from "react"
import { useImmer } from "use-immer"
import Axios from "axios"
import { Navigate } from "react-router"
import { useNavigate } from "react-router"
function Register() {
  const navigate = useNavigate()
  const [state, setState] = useImmer({
    mail: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  })

  function handleSubmit(e) {
    e.preventDefault()
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = Axios.post("api/user", { firstName: state.firstName, lastName: state.lastName, phone: state.phone, mail: state.mail, password: state.password })
      response.then(res => {
        if (res.status == 201) {
          navigate("/")
        }
      })
    } catch (e) {
      console.log("something went drong during register " + e)
    }
  }

  return (
    <div className="container bg-gray mt-4">
      <form className="d-flex flex-column register" onSubmit={handleSubmit}>
        <div className="mx-auto fs-login">Create account</div>
        <div className="d-flex align-items-center mx-auto col-4">
          <span className="material-symbols-outlined mt-4 p-2">account_circle</span>
          <input
            type="email"
            className="mt-4 p-2 col-8"
            onChange={e => {
              setState(draft => {
                draft.mail = e.target.value
              })
            }}
            placeholder="Email"
          />
        </div>
        <div className="d-flex align-items-center mx-auto col-4">
          <span className="material-symbols-outlined mt-4 p-2">lock</span>
          <input
            type="password"
            className="mt-4 p-2 col-8 "
            onChange={e => {
              setState(draft => {
                draft.password = e.target.value
              })
            }}
            placeholder="Password"
          />
        </div>
        <div className="d-flex align-items-center mx-auto col-4">
          <span className="material-symbols-outlined mt-4 p-2">account_circle</span>
          <input
            type="text"
            className="mt-4 p-2 col-8"
            onChange={e => {
              setState(draft => {
                draft.firstName = e.target.value
              })
            }}
            placeholder="First Name"
          />
        </div>
        <div className="d-flex align-items-center mx-auto col-4">
          <span className="material-symbols-outlined mt-4 p-2">account_circle</span>
          <input
            type="text"
            className="mt-4 p-2 col-8"
            onChange={e => {
              setState(draft => {
                draft.lastName = e.target.value
              })
            }}
            placeholder="Last name"
          />
        </div>
        <div className="d-flex align-items-center mx-auto col-4">
          <span className="material-symbols-outlined mt-4 p-2">phone_iphone</span>
          <input
            type="number"
            className="mt-4 p-2 col-8"
            onChange={e => {
              setState(draft => {
                draft.phone = e.target.value
              })
            }}
            placeholder="Phone"
          />
        </div>
        <div className="d-flex align-items-center mx-auto col-4 mt-4">
          <button type="submit" className="btn btn-primary col-9 ms-3 mt-3 mb-5">
            CREATE
          </button>
        </div>

        {/* <button onClick={() => console.log(appState)}>check state</button> */}
      </form>
    </div>
  )
}

export default Register
