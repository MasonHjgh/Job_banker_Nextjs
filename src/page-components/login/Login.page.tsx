import React from "react"
import { signIn } from "utils/auth" 


function Login() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/dashboard" })
      }}
    >
      <div className="card w-96 bg-base-100 shadow-xl col-span-1">
        <div className="card-body">
          <h2>Welcome !</h2>
          <button className="btn btn-primary">Login with Google</button>
        </div>
      </div>
    </form>
  )
}

export default Login
