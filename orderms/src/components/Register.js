import React, { useEffect } from "react"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router"
import warehousebg from "./img/register-warehouse.jpg"
import { useContext } from "react"
import DispatchContext from "../DispatchContext"
function Register() {
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  const initialState = {
    requestCount: 0,
    mail: {
      value: "",
      hasErrors: true,
      iconController: {
        icon: "cancel",
        color: "red"
      }
    },
    password: {
      value: "",
      hasErrors: true,
      iconController: {
        icon: "cancel",
        color: "red"
      },
      rulesController: {
        lowerCase: false,
        upperCase: false,
        digit: false,
        special: false,
        length: false
      }
    },
    firstName: {
      value: "",
      hasErrors: true,
      iconController: {
        icon: "cancel",
        color: "red"
      }
    },
    lastName: {
      value: "",
      hasErrors: true,
      iconController: {
        icon: "cancel",
        color: "red"
      }
    },
    phone: {
      value: "",
      hasErrors: true,
      iconController: {
        icon: "cancel",
        color: "red"
      }
    }
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "emailImmediately":
        draft.mail.value = action.value
        if (/^\S+@\S+$/.test(draft.mail.value)) {
          draft.mail.iconController.icon = "check_circle"
          draft.mail.iconController.color = "green"
          draft.mail.hasErrors = false
        }
        if (draft.mail.value.length == 0 || !/^\S+@\S+$/.test(draft.mail.value)) {
          draft.mail.iconController.icon = "cancel"
          draft.mail.iconController.color = "red"
          draft.mail.hasErrors = true
        }
        return
      case "passwordImmediately":
        draft.password.value = action.value
        draft.password.rulesController.lowerCase = /.*[a-z].*/.test(draft.password.value)
        draft.password.rulesController.upperCase = /.*[A-Z].*/.test(draft.password.value)
        draft.password.rulesController.digit = /.*[0-9].*/.test(draft.password.value)
        draft.password.rulesController.special = /[*@!#%&()^~{}]+/.test(draft.password.value)
        draft.password.rulesController.length = draft.password.value.length >= 8
        if (draft.password.rulesController.length && draft.password.rulesController.lowerCase && draft.password.rulesController.upperCase && draft.password.rulesController.digit && draft.password.rulesController.special) {
          draft.password.hasErrors = false
        } else {
          draft.password.hasErrors = true
        }
        if (draft.password.hasErrors) {
          draft.password.iconController.icon = "cancel"
          draft.password.iconController.color = "red"
        } else {
          draft.password.iconController.icon = "check_circle"
          draft.password.iconController.color = "green"
        }
        return
      case "firstNameImmediately":
        draft.firstName.value = action.value
        draft.firstName.hasErrors = draft.firstName.value < 1
        if (draft.firstName.hasErrors) {
          draft.firstName.iconController.icon = "cancel"
          draft.firstName.iconController.color = "red"
        } else {
          draft.firstName.iconController.icon = "check_circle"
          draft.firstName.iconController.color = "green"
        }
        return
      case "lastNameImmediately":
        draft.lastName.value = action.value
        draft.lastName.hasErrors = draft.lastName.value < 1
        if (draft.lastName.hasErrors) {
          draft.lastName.iconController.icon = "cancel"
          draft.lastName.iconController.color = "red"
        } else {
          draft.lastName.iconController.icon = "check_circle"
          draft.lastName.iconController.color = "green"
        }
        return
      case "phoneImmediately":
        draft.phone.value = action.value
        if (draft.phone.value.length == 9) {
          draft.phone.hasErrors = false
        } else {
          draft.phone.hasErrors = true
        }
        if (draft.phone.hasErrors) {
          draft.phone.iconController.icon = "cancel"
          draft.phone.iconController.color = "red"
        } else {
          draft.phone.iconController.icon = "check_circle"
          draft.phone.iconController.color = "green"
        }

        return
      case "submit":
        draft.requestCount++
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "submit" })
  }
  useEffect(() => {
    if (state.requestCount) {
      const fetchData = async () => {
        const ourRequest = Axios.CancelToken.source()
        try {
          const response = await Axios.post("api/user", { firstName: state.firstName.value, lastName: state.lastName.value, phone: state.phone.value, mail: state.mail.value, password: state.password.value }, { cancelToken: ourRequest.token })
          if (response.request.status == 201) {
            appDispatch({ type: "flashMessage", value: "User succesfully created" })
            navigate("/")
          }
        } catch (e) {
          console.log("something went drong during register " + e)
        }
      }
      fetchData()
    }
  }, [state.requestCount])
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
                <input
                  type="text"
                  placeholder="E-mail"
                  className="container"
                  onChange={e => {
                    dispatch({ type: "emailImmediately", value: e.target.value })
                  }}
                />
                <span className="material-symbols-outlined register-icon" style={{ color: state.mail.iconController.color }}>
                  {state.mail.iconController.icon}
                </span>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={e => {
                    dispatch({ type: "passwordImmediately", value: e.target.value })
                  }}
                  className="container"
                />
                <span className="material-symbols-outlined register-icon" style={{ color: state.password.iconController.color }}>
                  {state.password.iconController.icon}
                </span>
                <div className="d-flex flex-column password-rules">
                  Password should:
                  <span style={{ color: state.password.rulesController.length ? "green" : "red" }}>Be over 8 characters long</span>
                  <span style={{ color: state.password.rulesController.lowerCase ? "green" : "red" }}>Have at least 1 lower case</span>
                  <span style={{ color: state.password.rulesController.upperCase ? "green" : "red" }}>Have at least 1 upper case</span>
                  <span style={{ color: state.password.rulesController.digit ? "green" : "red" }}>Have at least 1 digit</span>
                  <span style={{ color: state.password.rulesController.special ? "green" : "red" }}>Have at least 1 special character</span>
                </div>
              </div>

              <div className="d-flex input-group input-group-register mb-4 ">
                <input
                  type="text"
                  placeholder="First name"
                  onChange={e => {
                    dispatch({ type: "firstNameImmediately", value: e.target.value })
                  }}
                  className="container"
                />
                <span className="material-symbols-outlined register-icon" style={{ color: state.firstName.iconController.color }}>
                  {state.firstName.iconController.icon}
                </span>
              </div>
              <div className="d-flex input-group input-group-register mb-4 ">
                <input
                  type="text"
                  placeholder="Last name"
                  onChange={e => {
                    dispatch({ type: "lastNameImmediately", value: e.target.value })
                  }}
                  className="container"
                />
                <span className="material-symbols-outlined register-icon" style={{ color: state.lastName.iconController.color }}>
                  {state.lastName.iconController.icon}
                </span>
              </div>
              <div className="d-flex input-group input-group-register mb-5 ">
                <input
                  type="number"
                  value={state.phone.value}
                  placeholder="Phone"
                  max={9}
                  onChange={e => {
                    dispatch({ type: "phoneImmediately", value: e.target.value })
                  }}
                  className="container"
                />
                <span className="material-symbols-outlined register-icon" style={{ color: state.phone.iconController.color }}>
                  {state.phone.iconController.icon}
                </span>
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
