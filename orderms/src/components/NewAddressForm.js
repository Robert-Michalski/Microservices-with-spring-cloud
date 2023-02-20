import { useContext } from "react"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import { useNavigate } from "react-router"
function NewAddressForm() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [state, setState] = useImmer({
    address: "",
    city: "",
    country: "",
    postalCode: ""
  })
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const ourRequest = Axios.CancelToken.source()
      const response = await Axios.post("/api/address", { userId: appState.user.id, address: state.address, city: state.city, country: state.country, postalCode: state.postalCode }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      if (response.request.status === 201) {
        appDispatch({ type: "liveMessage", value: "Address added succesfully" })
        navigate("/cart")
      }
    } catch (e) {
      console.log("Something went wrong during address adding " + e)
    }
  }
  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Address</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3 mx-auto">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">Add new address</div>
        </div>
        <form className="d-flex flex-column p-3" onSubmit={handleSubmit}>
          <div className="row col-6 ">
            <div className="col-sm fs-3">Full address</div>
            <div className="col-sm">
              <input
                type="text"
                className="product-add-input"
                placeholder="Szczecinska 38/3b"
                onChange={e =>
                  setState(draft => {
                    draft.address = e.target.value
                  })
                }
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">City</div>
            <div className="col-sm">
              <input
                type="text"
                className="product-add-input"
                placeholder="Szczecin"
                onChange={e =>
                  setState(draft => {
                    draft.city = e.target.value
                  })
                }
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">Country</div>
            <div className="col-sm">
              <input
                type="text"
                className="product-add-input"
                placeholder="Poland"
                onChange={e =>
                  setState(draft => {
                    draft.country = e.target.value
                  })
                }
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">Postal Code</div>
            <div className="col-sm">
              <input
                type="text"
                className="product-add-input"
                placeholder="78-123"
                onChange={e =>
                  setState(draft => {
                    draft.postalCode = e.target.value
                  })
                }
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-5 mt-3 mx-auto">
              <button type="submit" className="btn btn-primary container">
                ADD
              </button>
            </div>
            <div className="w-100 mt-3"></div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default NewAddressForm
