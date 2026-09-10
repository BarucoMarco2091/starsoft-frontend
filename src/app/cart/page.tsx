"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemCart,
  removeItemCart,
  deleteItemCart,
  clearCart,
  selectCartList,
  selectCartTotalFormated,
} from "@/store/cartSlice";
import { Container } from "@/components/container";
import styles from "./styles.module.scss";
import Image from "next/image";
import productImg from "../../../public/img-1.svg";
import Link from "next/link";

export default function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartList);
  const cartTotal = useSelector(selectCartTotalFormated);
  const [isFinished, setIsFinished] = useState(false);

  const handleCheckout = () => {
    setIsFinished(true);
    setTimeout(() => {
      setIsFinished(false);
      dispatch(clearCart());
    }, 3000);
  };

  return (
    <>
      <Container>
        <div className={styles.header}>
          <Link href="/" className={styles.backButton} aria-label="Voltar">
            ←
          </Link>
          <h2>Mochila de Compras</h2>
        </div>

        <div className={styles.itemsList}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyMessage}>Sua mochila está vazia.</p>
          ) : (
            cartItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ borderColor: "rgba(255, 131, 16, 0.5)" }}
                key={item.id}
                className={styles.cartItem}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={productImg}
                    width={70}
                    height={70}
                    alt={item.name}
                  />
                </div>

                <div className={styles.itemContent}>
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className={styles.priceContainer}>
                    <span className={styles.ethIcon}>♦</span>
                    <span className={styles.priceText}>{item.total} ETH</span>
                  </div>

                  <div className={styles.actionsRow}>
                    <div className={styles.quantityControls}>
                      <button onClick={() => dispatch(removeItemCart(item))}>
                        -
                      </button>
                      <span>{item.amount}</span>

                      <button onClick={() => dispatch(addItemCart(item))}>
                        +
                      </button>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#FF8310",
                        color: "#fff",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={styles.deleteButton}
                      onClick={() => dispatch(deleteItemCart(item))}
                      aria-label="Remover item"
                    >
                      🗑️
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalContainer}>
            <span className={styles.totalLabel}>TOTAL</span>
            <div className={styles.totalPrice}>
              <span className={styles.ethIcon}>♦</span>

              <span>{cartTotal}</span>
            </div>
          </div>

          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.01, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.99 }}
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              {isFinished ? "COMPRA FINALIZADA" : "FINALIZAR COMPRA"}
            </motion.button>
          )}
        </div>
      </Container>
    </>
  );
}
