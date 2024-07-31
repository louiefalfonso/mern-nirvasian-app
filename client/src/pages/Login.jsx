import React from "react";
import logo  from '../assets/Nirvasian-Logo.png'

const Login = () => {
  return (
    <div className="text-center">
      <main className="form-signin">
        <form className="signinform">
          <img
            className="mb-4"
            src={logo}
            alt=""
            width={300}
            height={111}
          />
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email Address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Log In
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login