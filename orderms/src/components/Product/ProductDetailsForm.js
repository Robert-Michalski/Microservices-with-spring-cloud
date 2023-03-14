function ProductDetailsForm(props) {
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
            <input type="text" id="display" className="product-add-input" />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
      {/* If it has a processor  */}
      {smartphone() ? (
        <>
          <label className="col-sm fs-3" htmlFor="processor">
            Processor
          </label>
          <div className="col-sm">
            <input type="text" id="processor" className="product-add-input" />
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
            <input type="text" id="ram" className="product-add-input" />
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
            <input type="text" id="storage" className="product-add-input" />
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
            <input type="text" id="color" className="product-add-input" />
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
            <input type="text" id="camera" className="product-add-input" />
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
            <input type="text" id="memory_type" className="product-add-input" />
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
            <input type="text" id="memory" className="product-add-input" />
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
            <input type="text" id="connectors" className="product-add-input" />
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
            <input type="text" id="clock_speed" className="product-add-input" />
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
            <input type="text" id="destination" className="product-add-input" />
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
            <input type="text" id="backlight" className="product-add-input" />
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
            <input type="text" id="socket" className="product-add-input" />
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
            <input type="text" id="cores" className="product-add-input" />
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
            <input type="text" id="cache" className="product-add-input" />
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
            <input type="text" id="switches" className="product-add-input" />
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
            <input type="text" id="connectivity" className="product-add-input" />
          </div>
          <div className="w-100 mt-2"></div>
        </>
      ) : null}
    </>
  )
}
export default ProductDetailsForm
