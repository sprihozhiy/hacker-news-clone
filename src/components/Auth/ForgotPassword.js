import React, { useState, useContext } from "react";
import FirebaseContext from "../../firebase/context";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      setPasswordResetError(err.message);
      console.error("Error sending email", err);
      setIsPasswordReset(false);
    }
  }
  return (
    <div>
      <input
        type="email"
        placeholder="Provide your account email"
        className="input"
        onChange={(event) => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
        {isPasswordReset && (
          <p>Password has been reset! Check email to reset password.</p>
        )}
        {passwordResetError && (
          <p className="error-text">{passwordResetError}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
