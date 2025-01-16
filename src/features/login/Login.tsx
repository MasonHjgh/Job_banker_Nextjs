import React from "react"

const Login = () => {
  return (
    
      <div
        className="card w-96 bg-base-100 shadow-xl col-span-1"
      >
        <div className="card-body">
          <h2>Welcome !</h2>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs"
          />

          <button className="btn btn-primary">Primary</button>
        </div>
      </div>
    
  )
}
export default Login
