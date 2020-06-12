import { useState, useEffect } from "react";
import firebase from "../../firebase";

//custom hook for tracking user's session
function useAuth() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return authUser;
}

export default useAuth;
