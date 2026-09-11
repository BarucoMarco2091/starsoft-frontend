import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "@/store/cartSlice";
import { Header } from ".";
import "@testing-library/jest-dom";
import { RootState } from "../../store/store";

const renderComRedux = (
  componente: React.ReactElement,
  estadoInicial?: Partial<RootState>,
) => {
  const store = configureStore({
    reducer: combineReducers({
      cart: cartReducer,
    }),
    preloadedState: estadoInicial,
  });
  return render(<Provider store={store}>{componente}</Provider>);
};

describe("Componente Header", () => {
  it("should render the number of unique items based on the length (2 cell phones + 1 laptop = 2).", () => {
    const estadoSimulado = {
      cart: {
        cart: [
          {
            id: 1,
            name: "Iphone 11 128GB",
            price: 5000,
            amount: 2,
            total: 1000,
            brand: "",
            description: "",
            cover: "",
          },
          {
            id: 2,
            name: "MacBook Air",
            price: 8200,
            amount: 1,
            total: 8200,
            brand: "",
            description: "",
            cover: "",
          },
        ],
      },
    };

    renderComRedux(<Header />, estadoSimulado);

    const elementoContador = screen.getByText("2");
    expect(elementoContador).toBeInTheDocument();
  });
});
