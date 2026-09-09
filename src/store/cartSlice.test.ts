import cartReducer, { addItemCart } from "./cartSlice";

describe("Cart Redux Slice", () => {
    const mockCelular = {
        id: 1,
        name: "Iphone 11 128GB",
        brand: "Apple",
        description: "Garante alto desempenho e fotos incríveis.",
        price: 5000,
        cover: "/img-1.svg"
    };

    const mockNotebook = {
        id: 2, // CORRIGIDO: Alterado de 1 para 2 para ser um produto diferente
        name: "MacBook Air",
        brand: "Apple",
        description: "Processador potente para todas as suas tarefas.",
        price: 8200,
        cover: "/img-2.svg"
    };

    it("should start with an empty list of items", () => {
        const estado = cartReducer(undefined, { type: "unknown" })
        expect(estado.cart).toEqual([])
    })

    it("should treat duplicate items as a single unique entry", () => {
        let estado = cartReducer(undefined, addItemCart(mockCelular));
        estado = cartReducer(estado, addItemCart(mockCelular));
        
        // A quantidade de tipos de itens no array DEVE ser 1
        expect(estado.cart).toHaveLength(1);
        // Mas a quantidade interna do produto deve ser 2
        expect(estado.cart[0].amount).toBe(2);
        // CORRIGIDO: 5000 * 2 = 10000 ETH
        expect(estado.cart[0].total).toBe(10000); 
    })

    it("should correctly sum the quantity when adding different types of products (2 cell phones + 1 notebook = 2 items).", () => {
        let estado = cartReducer(undefined, addItemCart(mockCelular))
        estado = cartReducer(estado, addItemCart(mockNotebook))

        // Agora com IDs diferentes, o length vai dar 2 perfeitamente!
        expect(estado.cart).toHaveLength(2)
    })
})

