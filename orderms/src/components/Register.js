import React, { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router"
import warehousebg from "./img/register-warehouse.jpg"
function Register() {
  const navigate = useNavigate()
  const initialState = {
    mail: {
      value: "",
      hasErrors: false
    },
    password: {
      value: "",
      hasErrors: false
    },
    firstName: {
      value: "",
      hasErrors: false
    },
    lastName: {
      value: "",
      hasErrors: false
    },
    phone: {
      value: "",
      hasErrors: false
    }
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "emailImmediately":
        draft.mail.hasErrors = false
        draft.mail.value = action.value
        return
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        return
      case "firstNameImmediately":
        draft.firstName.hasErrors = false
        draft.firstName.value = action.value
        return
      case "lastNameImmediately":
        draft.lastName.hasErrors = false
        draft.lastName.value = action.value
        return
      case "phoneImmediately":
        draft.phone.hasErrors = false
        draft.phone.value = action.value
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  async function handleSubmit(e) {
    e.preventDefault()
    const ourRequest = Axios.CancelToken.source()
    console.log(state)
    try {
      // const response = await Axios.post("api/user", { firstName: state.firstName, lastName: state.lastName, phone: state.phone, mail: state.mail, password: state.password }, { cancelToken: ourRequest.token })
      // if (response.request.status == 201) {
      //   navigate("/")
      // }
    } catch (e) {
      console.log("something went drong during register " + e)
    }
  }

  return (
    <div className="container bg-gray mt-4">
      <form className="d-flex flex-column register mt-5" onSubmit={handleSubmit}>
        <div className="mb-5 mt-5 d-flex p-2">
          <div className="col-6 register-bg">
            <img src={warehousebg} alt="Picture with steel sheets on a shelf" />
          </div>
          <div className="col-6 register-right">
            <div className="container d-flex flex-column">
              <div className="d-flex mb-5 mt-4">
                <span className="fs-5 fw-bolder">Sign up</span>
                <span className="ms-4 fs-5 fc-blue ">Log in</span>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input type="text" placeholder="E-mail" className="container" />
                <div className="material-symbols-outlined" style={{ color: "red" }}>
                  cancel
                </div>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input type="password" placeholder="Password" className="container" />
                <div className="material-symbols-outlined" style={{ color: "green" }}>
                  check_circle
                </div>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input type="text" placeholder="First name" className="container" />
                <div className="material-symbols-outlined" style={{ color: "green" }}>
                  check_circle
                </div>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input type="text" placeholder="Last name" className="container" />
                <div className="material-symbols-outlined" style={{ color: "green" }}>
                  check_circle
                </div>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input type="text" placeholder="Phone" className="container" />
                <div className="material-symbols-outlined" style={{ color: "green" }}>
                  check_circle
                </div>
              </div>
              <div className="d-flex">
                <button type="input" className="btn btn-primary fs-5">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={() => console.log(appState)}>check state</button> */}
      </form>
    </div>
  )
}

export default Register
