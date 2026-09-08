export interface ProductProps {
        id: number;
        name: string;
        brand: string;
        description: string;
        price: number;
}

export interface ProductsResponse {
  products: ProductProps[];
  count: number;
}