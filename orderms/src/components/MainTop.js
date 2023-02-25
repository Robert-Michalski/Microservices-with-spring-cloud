import { useContext } from "react"
import StateContext from "../StateContext"

function MainTop(props) {
  const appState = useContext(StateContext)
  return (
    <div className="d-flex orders-top p-4 align-items-center">
      <div className="ms-4">{props.label}</div>
      <span className="material-symbols-outlined ms-auto">search</span>
      <span className="material-symbols-outlined ms-3">notifications</span>
      <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
    </div>
  )
}
export default MainTop
