
import React, { useState } from "react";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 added useLocation
import { useData } from "../../Components/DataProvider/DataProvider";
import styles from "./Auth.module.css";
import logo from "../../assets/amazon3.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // 👈 capture redirect messages
  const { state, dispatch } = useData();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: "SET_USER", user: userCredential.user });
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: "SET_USER", user: userCredential.user });
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch({ type: "SET_USER", user: null });
  };

  return (
    <div className={styles.auth}>
      <img
        src={logo}
        alt="Amazon Logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className={styles.formContainer}>
        {!state.user ? (
          <>
            <h1>{isRegister ? "Create Account" : "Sign-In"}</h1>

            {/* 👇 Show redirect message if redirected from ProtectedRoute */}
            {location.state?.message && (
              <p className={styles.error}>{location.state.message}</p>
            )}

            <form onSubmit={handleAuth}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={styles.authButton}>
                {isRegister ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <p className={styles.terms}>
              By continuing, you agree to Amazon's{" "}
              <span>Conditions of Use</span> and <span>Privacy Notice</span>.
            </p>

            {error && (
              <p className={styles.error}>
                Error: Check your email and password
              </p>
            )}

            <button
              onClick={() => setIsRegister(!isRegister)}
              className={styles.toggleButton}
            >
              {isRegister
                ? "Already have an account? Sign In"
                : "Create your Amazon account"}
            </button>
          </>
        ) : (
          <>
            <h1>Hello, {state.user.email}</h1>
            <button onClick={handleSignOut} className={styles.authButton}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
