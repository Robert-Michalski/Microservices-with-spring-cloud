import { useContext } from "react"
import StateContext from "../../StateContext"

function SingleProductDetailed() {
  const appState = useContext(StateContext)
  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <div className="d-flex orders-top p-4 align-items-center">
        <div className="ms-4">Products</div>
        <span className="material-symbols-outlined ms-auto">search</span>
        <span className="material-symbols-outlined ms-3">notifications</span>
        <div className="ms-5">{appState.user.firstName + " " + appState.user.lastName}</div>
      </div>
      <hr />

      <div className="container mt-4 ms-2 p-3 d-flex bg-white orders">
        <div className="col-6">
          <img src="https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/3/pr_2022_3_4_12_11_12_900_00.jpg" />
        </div>
        <div className="col-6 d-flex flex-column mt-4">
          <div>
            <span className="fs-4 fw-bold">Xiaomi Redmi Note 11S 6/64GB Graphite Gray</span>
          </div>
          <div className="d-flex mt-5">
            <div className="d-flex flex-column col-5">
              <span>
                <span className="fw-light">Display:</span> 6,43"
              </span>
              <span>
                <span className="fw-light">Processor:</span> Snapdragon 420
              </span>
              <span>
                <span className="fw-light">Ram:</span> 6 GB
              </span>
              <span>
                <span className="fw-light">Storage:</span> 64 GB
              </span>
              <span>
                <span className="fw-light">Color:</span> Gray
              </span>
              <span>
                <span className="fw-light">Camera:</span> 20 mpx
              </span>
            </div>
            <div className="container col-7 product-buy-right">
              <div className="d-flex flex-column orders p-3">
                <div className="text-end">
                  <span className="fs-4">999,00 PLN</span>
                  <div className="d-flex mt-3">
                    <input type="number" className="col-2 text-center" value="1" />
                    <button className="ms-auto bg-green fc-white d-flex p-2 col-8 fs-5 align-items-center">
                      <span className="material-symbols-outlined me-3">add_shopping_cart</span>Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductDetailed
