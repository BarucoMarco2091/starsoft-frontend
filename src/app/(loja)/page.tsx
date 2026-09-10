"use client";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container } from "@/components/container";
import styles from "../styles/page.module.scss";
import Image from "next/image";
import productImg from "../../../public/img-1.svg";
import { ProductsResponse } from "@/utils/product.type";
import { useDispatch } from "react-redux";
import { addItemCart } from "@/store/cartSlice";
import Footer from "@/components/footer"
import { useState } from "react";

const fetchProducts = async ({ pageParam = 1 }): Promise<ProductsResponse> => {
  const ROWS_PER_PAGE = 4;
  const queryParams = new URLSearchParams({
    page: String(pageParam),
    rows: String(ROWS_PER_PAGE),
    sortBy: "id",      // OBRIGATÓRIO pela API MKS
    orderBy: "DESC"
  }).toString()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export default function Home() {
  const [itemAdicionado, setItemAdicionado] = useState<number | null>(null)
  const dispatch = useDispatch()

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalProdutosCarregados = allPages.flatMap(page => page.products).length;
      if (totalProdutosCarregados < lastPage.count) {
        return allPages.length + 1
      }
      return undefined
    }
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  const allProducts = data?.pages.flatMap((page) => page.products) || []

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.border}></div>

      <Container>
        <section className={styles.grid}>
          {allProducts.map((product) => (
            <motion.div
              whileHover={{
                y: -6,
                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.4)",
                borderColor: "#FF8310"
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              key={product.id} className={styles.card}>
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

              <motion.button
                whileHover={{ backgroundColor: "#e66e00" }} // Escurece o laranja levemente no hover
                whileTap={{ scale: 0.95 }}
                className={`${styles.cardButton} ${itemAdicionado === product.id ? styles.added : ""
                  }`} onClick={
                    () => dispatch(addItemCart(product))
                    
                  }>
                Comprar
              </motion.button>
            </motion.div>
          ))}
        </section>

        {/* 5. Botão de paginação monitorando os estados do hook */}
        <div className={styles.loadBtn}>
          <motion.button
            whileHover={hasNextPage ? { scale: 1.03 } : {}}
            whileTap={hasNextPage ? { scale: 0.98 } : {}}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Carregando..."
              : hasNextPage
                ? "Carregando mais"
                : "Todos os produtos carregados"}
          </motion.button>
        </div>
      </Container>
      <Footer />
    </motion.main>

  );
}
