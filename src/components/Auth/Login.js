import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    submitting,
  } = useFormValidation(INITIAL_STATE, validateLogin);

  const [login, setLogin] = useState(true);
  return (
    <div>
      <h2 className="mv3">{!login ? "Create Account" : "Login"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            value={values.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            autoComplete="off"
            name="name"
          />
        )}
        <input
          value={values.email}
          onChange={handleChange}
          type="email"
          placeholder="Your Email"
          name="email"
          className={errors.email && "error-input"}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          value={values.password}
          onChange={handleChange}
          type="password"
          placeholder="Choose A Password"
          autoComplete="off"
          name="password"
          onBlur={handleBlur}
          className={errors.password && "error-input"}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={submitting}
            style={{ background: submitting ? "grey" : "orange" }}
          >
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
