import ProductView from "./ProductView"
function CartView(props) {
  return (
    <>
      <div className="d-flex align-items-center">
        <div className="ms-3 fs-2">My cart</div>
      </div>
      <div className="d-flex justify-content-around align-items-center fs-5 mt-5">
        <div className="fw-bold d-flex align-items-center cart-order">
          <div>Cart</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
        <div className=" d-flex align-items-center">
          <div>Delivery</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
        <div className="d-flex align-items-center">
          <div>Payment</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
      </div>
      <div className="d-flex container mt-4">
        <div className="bg-white row ms-2 orders col-8">
          {props.shoppingCart.map((product, index) => {
            return <ProductView item={product} key={index} bgIndex={index} max={props.shoppingCart.length} />
          })}
        </div>
        {/* -------------- */}
        <div className="ms-auto col-3">
          <div className="bg-white d-flex flex-column orders p-3">
            <div>
              Total: <span className="fw-bold ms-2">365.00$</span>
            </div>
            <div className="">
              <button className="btn bg-green fc-white col-12 mt-4" onClick={props.nextView}>
                DELIVERY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CartView
