import React from "react"

function Login() {
  return (
    <div className="container bg-gray mt-4">
      <div className="d-flex flex-column login">
        <div className="mx-auto fs-login">User Login</div>
        <span class="material-symbols-outlined mx-auto mt-4">login</span>
        <input type="text" className="col-3 mx-auto mt-4 p-2" placeholder="Email" />
        <input type="password" className="col-3 mx-auto mt-3 p-2" placeholder="Password" />
        <button type="submit" className="col-3 mx-auto mt-3 mb-5 ">
          LOGIN
        </button>
      </div>
    </div>
  )
}

export default Login
