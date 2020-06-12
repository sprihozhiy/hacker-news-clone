import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

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
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  //Authentication with frontend and server validation
  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      //After authentication user will be redirected to a root page and tracking user's session
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      setFirebaseError(err.message);
    }
  }

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
        {firebaseError && <p className="error-text">{firebaseError}</p>}
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
