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
import Footer from "@/components/footer";
import ellipseImg from "../../../public/Ellipse 770.svg";
import { Loading } from "@/components/loading";

const fetchProducts = async ({ pageParam = 1 }): Promise<ProductsResponse> => {
  const ROWS_PER_PAGE = 4;
  const queryParams = new URLSearchParams({
    page: String(pageParam),
    rows: String(ROWS_PER_PAGE),
    sortBy: "id",
    orderBy: "DESC",
  }).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryParams}`,
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
};

export default function Home() {
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalProdutosCarregados = allPages.flatMap(
        (page) => page.products,
      ).length;
      if (totalProdutosCarregados < lastPage.count) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) return <p>Não foi possível carregar os produtos.</p>;

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.border}></div>

      <Container>
        <section className={styles.grid} aria-label="Catálogo de Itens Raros">
          {allProducts.map((product) => (
            <motion.div
              whileHover={{
                y: -6,
                boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.4)",
                borderColor: "#FF8310",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              key={product.id}
              className={styles.card}
            >
              <Image
                src={productImg}
                quality={100}
                width={344}
                height={258}
                alt={`Representação visual do item ${product.name}`}
                priority={product.id <= 4}
                className={styles.cardImage}
              />

              <h2 className={styles.cardTitle}>{product.name}</h2>

              <p className={styles.cardText}>{product.description}</p>
              <div className={styles.total}>
                <Image
                  src={ellipseImg}
                  alt="ellipse"
                  width={29}
                  height={29}
                  quality={100}
                />
                <span className={styles.cardPrice}>{product.price} ETH</span>
              </div>

              <motion.button
                whileHover={{ backgroundColor: "#e66e00" }}
                whileTap={{ scale: 0.95 }}
                className={styles.cardButton}
                onClick={() => dispatch(addItemCart(product))}
              >
                Comprar
              </motion.button>
            </motion.div>
          ))}
        </section>

        <div className={styles.loadBtn} aria-live="polite">
          <motion.button
            whileHover={hasNextPage ? { scale: 1.03 } : {}}
            whileTap={hasNextPage ? { scale: 0.98 } : {}}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            aria-label="Carregar mais produtos do mercado"
          >
            {isFetchingNextPage
              ? "Carregar mais..."
              : hasNextPage
                ? "Carregar mais"
                : "Você já viu tudo"}
          </motion.button>
        </div>
      </Container>
      <Footer />
    </motion.main>
  );
}
