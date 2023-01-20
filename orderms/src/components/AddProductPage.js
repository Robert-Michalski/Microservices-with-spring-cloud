import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import { useNavigate } from "react-router"
function AddProductPage() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const [state, setState] = useImmer({
    product: {
      name: "",
      categoryId: 0,
      price: 0,
      details: "",
      quantity: 0
    },
    categories: []
  })
  async function handleSubmit(e) {
    e.preventDefault()
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = await Axios.post("/api/product", { name: state.product.name, categoryId: state.product.categoryId, price: state.product.price, details: state.product.details, quantity: state.product.quantity }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      if (response.request.status == 201) {
        navigate("/products")
      }
    } catch (e) {
      console.log("Something wrong adding new product " + e)
    }
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    try {
      const response = Axios.get("/api/category/all", { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      response.then(res =>
        setState(draft => {
          draft.categories = res.data
        })
      )
    } catch (e) {
      console.log("Something wrong during GET categories " + e)
    }
    return () => {
      ourRequest.cancel()
    }
  }, [])

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Products</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3 mx-auto">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">Add new product</div>
        </div>
        <form className="d-flex flex-column p-3" onSubmit={handleSubmit}>
          <span className="mt-2">Basic info</span>
          <hr className="col-5"></hr>
          <div className="row col-6 ">
            <div className="col-sm fs-3">Product name</div>
            <div className="col-sm">
              <input
                type="text"
                className="product-add-input"
                onChange={e =>
                  setState(draft => {
                    draft.product.name = e.target.value
                  })
                }
                placeholder="Steel wire"
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">Category</div>
            <div className="col-sm">
              <select
                className="col-9 product-add-input"
                onChange={e =>
                  setState(draft => {
                    draft.product.categoryId = e.target.value
                  })
                }
              >
                <option value="">Please select</option>
                {state.categories.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">Price</div>
            <div className="col-sm input-container">
              <input
                type="text"
                className="product-add-input"
                onChange={e =>
                  setState(draft => {
                    draft.product.price = e.target.value
                  })
                }
                placeholder="1200.00"
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">Details</div>
            <div className="col-sm">
              <input
                type="text"
                className="product-add-input"
                onChange={e =>
                  setState(draft => {
                    draft.product.details = e.target.value
                  })
                }
                placeholder="20x30"
              />
            </div>
            <div className="w-100 mt-3"></div>
            <div className="col-sm fs-3">Quantity</div>
            <div className="col-sm">
              <input
                type="number"
                className="product-add-input"
                onChange={e =>
                  setState(draft => {
                    draft.product.quantity = e.target.value
                  })
                }
                placeholder="100"
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

export default AddProductPage
