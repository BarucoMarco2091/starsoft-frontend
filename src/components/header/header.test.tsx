import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "@/store/cartSlice";
import { Header } from ".";
import "@testing-library/jest-dom";

// Correção na tipagem da store mockada para aceitar o estado inicial simulado
const renderComRedux = (componente: React.ReactElement, estadoInicial?: any) => {
  const store = configureStore({
    // Usando o reducer diretamente para bater com a estrutura do preloadedState
    reducer: combineReducers({
      cart: cartReducer
    }),
    preloadedState: estadoInicial,
  });
  return render(<Provider store={store}>{componente}</Provider>);
};

describe("Componente Header", () => {
  it("should render the number of unique items based on the length (2 cell phones + 1 laptop = 2).", () => {
    // Simulando o estado exatamente com a assinatura correspondente do Redux
    const estadoSimulado = {
      cart: {
        cart: [
          { id: 1, name: "Iphone 11 128GB", price: 5000, amount: 2, total: 1000, brand: "", description: "", cover: "" },
          { id: 2, name: "MacBook Air", price: 8200, amount: 1, total: 8200, brand: "", description: "", cover: "" },
        ],
      },
    };

    renderComRedux(<Header />, estadoSimulado);

    // O contador no HTML deve exibir "2", ignorando o acúmulo de quantidades
    const elementoContador = screen.getByText("2");
    expect(elementoContador).toBeInTheDocument();
  });
});
