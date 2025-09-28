
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { auth } from "../../Utility/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

const DataProvider = ({ reducer, initialState, children }) => {
  // Load basket from localStorage if available
  const localBasket = JSON.parse(localStorage.getItem("basket")) || initialState.basket;

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    basket: localBasket,
  });

  // 🔹 Sync Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", user: user || null });
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Save basket to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
