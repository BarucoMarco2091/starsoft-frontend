import cartReducer, { addItemCart } from "./cartSlice";

describe("Cart Redux Slice", () => {
  const mockCelular = {
    id: 1,
    name: "Iphone 11 128GB",
    brand: "Apple",
    description: "Garante alto desempenho e fotos incríveis.",
    price: 5000,
    cover: "/img-1.svg",
  };

  const mockNotebook = {
    id: 2,
    name: "MacBook Air",
    brand: "Apple",
    description: "Processador potente para todas as suas tarefas.",
    price: 8200,
    cover: "/img-2.svg",
  };

  it("should start with an empty list of items", () => {
    const estado = cartReducer(undefined, { type: "unknown" });
    expect(estado.cart).toEqual([]);
  });

  it("should treat duplicate items as a single unique entry", () => {
    let estado = cartReducer(undefined, addItemCart(mockCelular));
    estado = cartReducer(estado, addItemCart(mockCelular));

    expect(estado.cart).toHaveLength(1);

    expect(estado.cart[0].amount).toBe(2);

    expect(estado.cart[0].total).toBe(10000);
  });

  it("should correctly sum the quantity when adding different types of products (2 cell phones + 1 notebook = 2 items).", () => {
    let estado = cartReducer(undefined, addItemCart(mockCelular));
    estado = cartReducer(estado, addItemCart(mockNotebook));

    expect(estado.cart).toHaveLength(2);
  });
});
