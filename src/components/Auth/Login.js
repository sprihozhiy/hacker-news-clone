import React, { useState } from "react";

function Login(props) {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <h2 className="mv3">{!login ? "Create Account" : "Login"}</h2>
      <form className="flex flex-column">
        {!login && (
          <input type="text" placeholder="Your Name" autoComplete="off" />
        )}
        <input type="email" placeholder="Your Email" />
        <input
          type="password"
          placeholder="Choose A Password"
          autoComplete="off"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {!login ? "already have an account?" : "create an account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
