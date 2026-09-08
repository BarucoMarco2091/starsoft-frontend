"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/container";
import styles from "./styles/page.module.scss";
import Image from "next/image";
import productImg from "../../public/img-1.svg";

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
}

interface ProductsResponse {
  products: Product[];
  count: number;
}

const fetchProducts = async (page: number, rows: number): Promise<ProductsResponse> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    rows: String(rows),
    sortBy: "id",      // OBRIGATÓRIO pela API MKS
    orderBy: "DESC"
  }).toString()
  const res = await fetch(`/api/products?${queryParams}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(8);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { page, rows }],
    queryFn: () => fetchProducts(page, rows),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <main>
      <div className={styles.border}></div>

      <Container>
        <section className={styles.grid}>
          {data?.products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Image
                src={productImg}
                quality={100}
                width={100}
                height={100}
                alt="imagem"
              />

              <h2 className={styles.cardTitle}>
                {product.name}
              </h2>

              <p className={styles.cardText}>
                {product.description}
              </p>

              <span className={styles.cardPrice}>
                {product.price} ETH
              </span>

              <button className={styles.cardButton}>
                Comprar
              </button>
            </div>
          ))}
        </section>

        <div className={styles.loadBtn}>
          <button>Carregar mais</button>
        </div>
      </Container>
    </main>
  );
}
