import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
}

interface CartItem extends Product {
  amount: number;
  total: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const indexItem = state.cart.findIndex((item) => item.id === newItem.id);

      if (indexItem !== -1) {
        state.cart[indexItem].amount += 1;
        state.cart[indexItem].total =
          state.cart[indexItem].amount * state.cart[indexItem].price;
      } else {
        state.cart.push({
          ...newItem,
          amount: 1,
          total: newItem.price,
        });
      }
    },
    removeItemCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const indexItem = state.cart.findIndex((item) => item.id === product.id);

      if (indexItem !== -1) {
        if (state.cart[indexItem].amount > 1) {
          state.cart[indexItem].amount -= 1;
          state.cart[indexItem].total =
            state.cart[indexItem].total - state.cart[indexItem].price;
        } else {
          state.cart = state.cart.filter((item) => item.id !== product.id);
        }
      }
    },
    deleteItemCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.cart = state.cart.filter((item) => item.id !== product.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const selectCartList = (state: { cart: CartState }) => state.cart.cart;

export const selectCartAmount = (state: { cart: CartState }) =>
  state.cart.cart.length;

export const selectCartTotalFormated = (state: { cart: CartState }) => {
  const result = state.cart.cart.reduce((acc, obj) => acc + obj.total, 0);
  return `${result} ETH`;
};

export const { addItemCart, removeItemCart, deleteItemCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
