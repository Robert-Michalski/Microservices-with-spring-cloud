import { useImmer } from "use-immer"
function ProductDetailsForm(props) {
  const [state, setState] = useImmer({
    productDetails: {
      displayInInches: 0,
      processorName: 0,
      ram: 0,
      storageInGb: 0,
      mainCameraInMpx: 0,
      memoryType: "",
      memoryInGb: 0,
      connectors: "",
      clockSpeedInMHz: 0,
      socket: "",
      cores: 0,
      cacheInMb: 0,
      backlight: "",
      destination: "",
      switches: "",
      connectivity: "",
      color: ""
    }
  })
  function smartphone() {
    if (props.category === "Smartphones") {
      return true
    }
  }
  function graphicsCard() {
    if (props.category === "Graphics Cards") {
      return true
    }
  }
  function processor() {
    if (props.category === "Processors") {
      return true
    }
  }
  function keyboard() {
    if (props.category === "Keyboards") {
      return true
    }
  }
  function mouse() {
    if (props.category === "Mouses") {
      return true
    }
  }
  return (
    <>
      {/* If it has a display */}
      {smartphone() ? (
        <>
          <label className="col-sm fs-3" htmlFor="display">
            Display
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="display"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.displayInInches = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {/* If it has a processor  */}
      {smartphone() ? (
        <>
          <label className="col-sm fs-3" htmlFor="processor">
            Processor name
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="processor"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.processorName = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {smartphone() ? (
        <>
          <label className="col-sm fs-3" htmlFor="ram">
            Ram
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="ram"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.ram = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {smartphone() ? (
        <>
          <label className="col-sm fs-3" htmlFor="storage">
            Storage
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="storage"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.storageInGb = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {smartphone() || mouse() ? (
        <>
          <label className="col-sm fs-3" htmlFor="color">
            Color
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="color"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.color = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {smartphone() ? (
        <>
          <label className="col-sm fs-3" htmlFor="camera">
            Camera
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="camera"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.mainCameraInMpx = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {graphicsCard() ? (
        <>
          <label className="col-sm fs-3" htmlFor="memory_type">
            Memory type
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="memory_type"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.memoryType = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {graphicsCard() ? (
        <>
          <label className="col-sm fs-3" htmlFor="memory">
            Memory
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="memory"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.memoryInGb = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {graphicsCard() ? (
        <>
          <label className="col-sm fs-3" htmlFor="connectors">
            Connectors
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="connectors"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.connectors = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {graphicsCard() || processor() ? (
        <>
          <label className="col-sm fs-3" htmlFor="clock_speed">
            Clock speed
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="clock_speed"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.clockSpeedInMHz = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {graphicsCard() || keyboard() || mouse() ? (
        <>
          <label className="col-sm fs-3" htmlFor="destination">
            Destination
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="destination"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.destination = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {graphicsCard() || keyboard() || mouse() ? (
        <>
          <label className="col-sm fs-3" htmlFor="backlight">
            Backlight
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="backlight"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.backlight = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {processor() ? (
        <>
          <label className="col-sm fs-3" htmlFor="socket">
            Socket
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="socket"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.socket = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {processor() ? (
        <>
          <label className="col-sm fs-3" htmlFor="cores">
            Cores
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="cores"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.cores = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {processor() ? (
        <>
          <label className="col-sm fs-3" htmlFor="cache">
            Cache
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="cache"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.cacheInMb = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {keyboard() ? (
        <>
          <label className="col-sm fs-3" htmlFor="switches">
            Switches
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="switches"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.switches = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {keyboard() || mouse() ? (
        <>
          <label className="col-sm fs-3" htmlFor="connectivity">
            Connectivity
          </label>
          <div className="col-sm">
            <input
              type="text"
              id="connectivity"
              className="product-add-input"
              onChange={e =>
                setState(draft => {
                  draft.productDetails.connectivity = e.target.value
                })
              }
            />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      <div className="col-5 mt-3 mx-auto">
        <button type="submit" className="btn btn-primary container" onClick={props.setProductDetails(state.productDetails)}>
          ADD
        </button>
      </div>
    </>
  )
}
export default ProductDetailsForm
