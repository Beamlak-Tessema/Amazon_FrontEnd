
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "./actionType";

export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        basket: action.user ? state.basket : [],
      };

    case ADD_TO_BASKET: {
      const existingIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingIndex >= 0) {
        const newBasket = state.basket.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, basket: newBasket };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, quantity: 1 }],
        };
      }
    }

    case REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        const newBasket = state.basket
          .map((item, idx) =>
            idx === index ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);
        return { ...state, basket: newBasket };
      }
      return state;
    }

    case "CLEAR_BASKET":
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
