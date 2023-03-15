import React, { useContext, useEffect } from "react"
import StateContext from "../../StateContext"
import { useImmer } from "use-immer"
import Axios from "axios"
import { json, useNavigate, useParams } from "react-router"
import MainTop from "../MainTop"
import { useState } from "react"
import DispatchContext from "../../DispatchContext"
import ProductDetailsForm from "./ProductDetailsForm"
function AddProductPage() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [isUploaded, setIsUploaded] = useState(false)
  const { id } = useParams()
  const [state, setState] = useImmer({
    product: {
      name: "",
      category: {
        id: "",
        name: ""
      },
      price: 0,
      details: "",
      quantity: 0,
      imageId: 0
    },
    categories: [],
    imgData: {},
    productDetails: {}
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const ourRequest = Axios.CancelToken.source()
    try {
      if (!id) {
        // const response = await Axios.post("/api/product", { name: state.product.name, categoryId: state.product.category.id, price: state.product.price, details: state.product.details, quantity: state.product.quantity, productDetailsId: state.product.productDetailsId }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        // if (response.request.status === 201) {
        //   navigate("/products")
        // }

        const productDetailsResponse = await Axios.post(
          "/api/productDetails",
          {
            displayInInches: state.productDetails.displayInInches,
            processorName: state.productDetails.processorName,
            ram: state.productDetails.ram,
            storageInGb: state.productDetails.storageInGb,
            mainCameraInMpx: state.productDetails.mainCameraInMpx,
            memoryType: state.productDetails.memoryType,
            memoryInGb: state.productDetails.memoryInGb,
            connectors: state.productDetails.connectors,
            clockSpeedInMHz: state.productDetails.clockSpeedInMHz,
            socket: state.productDetails.socket,
            cores: state.productDetails.cores,
            cacheInMb: state.productDetails.cacheInMb,
            backlight: state.productDetails.backlight,
            destination: state.productDetails.destination,
            switches: state.productDetails.switches,
            connectivity: state.productDetails.connectivity,
            color: state.productDetails.color
          },
          { headers: { Authorization: `Bearer ${appState.user.token}` } },
          { cancelToken: ourRequest.token }
        )

        if (productDetailsResponse.request.status === 201 && state.product.imageId !== 0) {
          const response = await Axios.post("/api/product", { name: state.product.name, categoryId: state.product.category.id, price: state.product.price, details: state.product.details, quantity: state.product.quantity, productDetailsId: productDetailsResponse.data, imageId: state.product.imageId }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
          console.log(response.data)
        }
      } else {
        const response = await Axios.put("/api/product/" + id, { name: state.product.name, categoryId: state.product.category.id, price: state.product.price, details: state.product.details, quantity: state.product.quantity }, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        if (response.request.status === 200) {
          navigate("/products")
        }
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
      if (id) {
        const productResponse = Axios.get("/api/product/" + id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        productResponse.then(res =>
          setState(draft => {
            draft.product = res.data
          })
        )
      }
    } catch (e) {
      console.log("Something wrong during GET categories " + e)
    }
    return () => {
      ourRequest.cancel()
    }
  }, [])

  async function handleImageSubmit(e) {
    e.preventDefault()
    const ourRequest = Axios.CancelToken.source()
    try {
      const data = new FormData()
      data.append("file", state.imgData[0])

      const response = await Axios.post(
        "/api/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${appState.user.token}`
          }
        },
        { cancelToken: ourRequest.token }
      )
      if (response.request.status === 201) {
        setIsUploaded(prev => (prev = true))
        setState(draft => {
          draft.product.imageId = response.data.id
        })

        appDispatch({ type: "flashMessage", value: "Image uploaded successfully" })
      }
    } catch (e) {
      console.log("error during image upload " + e)
    }
  }

  function setProductDetails(details) {
    setState(draft => {
      draft.productDetails = details
    })
  }

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <MainTop label="Products" />
      <hr />
      <div className="container p-3 mx-auto">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">Add new product</div>
        </div>
        <div className="d-flex container">
          <form className="d-flex flex-column p-3 col-6" onSubmit={handleSubmit}>
            <span className="mt-2">Basic info</span>
            <hr className="col-5 mb-3"></hr>
            <div className="row col-12 ">
              <label className="col-sm fs-3" htmlFor="name">
                Product name
              </label>
              <div className="col-sm">
                <input
                  id="name"
                  type="text"
                  className="product-add-input"
                  onChange={e =>
                    setState(draft => {
                      draft.product.name = e.target.value
                    })
                  }
                  value={state.product.name}
                  placeholder="Steel wire"
                />
              </div>
              <div className="w-100 mt-3"></div>
              <label className="col-sm fs-3" htmlFor="category">
                Category
              </label>
              <div className="col-sm">
                <select
                  id="category"
                  className="col-9 product-add-input"
                  onChange={e =>
                    setState(draft => {
                      draft.product.category.id = e.target.value
                    })
                  }
                  value={state.product.category.id}
                >
                  <option value="" disabled>
                    Please select
                  </option>
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
              <label className="col-sm fs-3" htmlFor="price">
                Price
              </label>
              <div className="col-sm input-container">
                <input
                  id="price"
                  type="text"
                  className="product-add-input"
                  onChange={e =>
                    setState(draft => {
                      draft.product.price = e.target.value
                    })
                  }
                  value={state.product.price}
                  placeholder="1200.00"
                />
              </div>
              <div className="w-100 mt-3"></div>
              <label className="col-sm fs-3" htmlFor="details">
                Details
              </label>
              <div className="col-sm">
                <input
                  id="details"
                  type="text"
                  className="product-add-input"
                  onChange={e =>
                    setState(draft => {
                      draft.product.details = e.target.value
                    })
                  }
                  value={state.product.details}
                  placeholder="20x30"
                />
              </div>
              <div className="w-100 mt-3"></div>
              <label className="col-sm fs-3" htmlFor="quantity">
                Quantity
              </label>
              <div className="col-sm">
                <input
                  id="quantity"
                  type="number"
                  className="product-add-input"
                  onChange={e =>
                    setState(draft => {
                      draft.product.quantity = e.target.value
                    })
                  }
                  value={state.product.quantity}
                  placeholder="100"
                />
              </div>
              <div className="w-100 mt-3"></div>
              <ProductDetailsForm category={state.categories[state.product.category.id - 1]?.name} setProductDetails={setProductDetails} />
              <div className="w-100 mt-3"></div>
            </div>
          </form>
          <form className="col-4" onSubmit={handleImageSubmit}>
            <label className="col-sm fs-3" htmlFor="image">
              Image
            </label>
            <div className="col-sm">
              <input
                type="file"
                disabled={isUploaded}
                id="image"
                className="mt-2"
                onChange={e =>
                  setState(draft => {
                    draft.imgData = e.target.files
                  })
                }
              />
              {state.imgData.length > 0 ? <img className="mt-3" src={URL.createObjectURL(state.imgData[0])} alt="#" /> : null}
            </div>
            <div className="container d-flex">
              <button type="submit" disabled={isUploaded} className="btn btn-primary mt-4 mx-auto col-5">
                UPLOAD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage
