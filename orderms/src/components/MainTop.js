import { useContext, useState } from "react"
import StateContext from "../StateContext"
function MainTop(props) {
  const appState = useContext(StateContext)
  const [showSearch, setShowSearch] = useState(false)
  function toggleSearch() {
    setShowSearch(prev => !prev)
  }

  return (
    <div className="d-flex orders-top p-4 align-items-center container">
      {showSearch ? (
        <div className="relative">
          <div className="absolute container search">
            <div className="d-flex flex-column align-items-center mt-4">
              <div className="d-flex mt-4 container align-items-center justify-content-center">
                <div className="col-6">
                  <input type="text" placeholder="What are you looking for ? " className="container" autoFocus />
                </div>
                <span className="material-symbols-outlined ms-2" onClick={toggleSearch}>
                  cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="ms-4">{props.label}</div>
      <span className="material-symbols-outlined ms-auto" onClick={toggleSearch}>
        search
      </span>
      <span className="material-symbols-outlined ms-3">notifications</span>
      <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
    </div>
  )
}
export default MainTop
