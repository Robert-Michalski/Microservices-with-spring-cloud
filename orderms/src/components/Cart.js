import { useContext } from "react"
import StateContext from "../StateContext"

function Cart() {
  const appState = useContext(StateContext)

  const shoppingCart = {}

  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Cart</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />
      <div className="container p-3 d-flex flex-column">
        <div className="d-flex align-items-center">
          <div className="ms-3 fs-2">My cart</div>
        </div>
        <div className="d-flex container mt-4">
          <div className="bg-white row ms-2 orders p-3 col-5">
            <div className="col-3">Steel pipe</div>
            <div className="col-3">1032365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1 ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
            <div className="col-3">Steel pipe</div>
            <div className="col-3">365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1  ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
            <div className="col-3">Steel pipe</div>
            <div className="col-3">1032365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1 ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
            <div className="col-3">Steel pipe</div>
            <div className="col-3">1032365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1 ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
            <div className="col-3">Steel pipe</div>
            <div className="col-3">1032365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1 ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
            <div className="col-3">Steel pipe</div>
            <div className="col-3">1032365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1 ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
            <div className="col-3">Steel pipe</div>
            <div className="col-3">1032365.00$</div>
            <div className="col-1">10</div>
            <div className="col-1 ms-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="w-100"></div>
          </div>
          {/* -------------- */}
          <div className="ms-auto col-3">
            <div className="bg-white d-flex flex-column orders p-3">
              <div>
                Total: <span className="fw-bold ms-2">365.00$</span>
              </div>
              <div className="">
                <button className="btn bg-green fc-white col-12 mt-4">DELIVERY</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
