"use client";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemCart,
  removeItemCart,
  deleteItemCart,
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

  // 1. Puxa a lista de produtos adicionados e o total formatado do Redux
  const cartItems = useSelector(selectCartList);
  const cartTotal = useSelector(selectCartTotalFormated);

  return (
    <>
      <Container>
        {/* Cabeçalho com o botão Voltar (Seta) */}
        <div className={styles.header}>
          <Link href="/" className={styles.backButton} aria-label="Voltar">
            ←
          </Link>
          <h2>Mochila de Compras</h2>
        </div>

        {/* Lista de Itens do Carrinho */}
        <div className={styles.itemsList}>
          {/* 2. Verifica se o carrinho está vazio */}
          {cartItems.length === 0 ? (
            <p className={styles.emptyMessage}>Sua mochila está vazia.</p>
          ) : (
            // 3. Faz o loop renderizando os produtos reais do Redux
            cartItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ borderColor: "rgba(255, 131, 16, 0.5)" }}
                key={item.id}
                className={styles.cartItem}
              >
                {/* Imagem do item */}
                <div className={styles.imageContainer}>
                  <Image
                    src={productImg}
                    width={70}
                    height={70}
                    alt={item.name}
                  />
                </div>

                {/* Detalhes do Produto */}
                <div className={styles.itemContent}>
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>

                  {/* Preço acumulado do item (preço unitário * quantidade) */}
                  <div className={styles.priceContainer}>
                    <span className={styles.ethIcon}>♦</span>
                    <span className={styles.priceText}>{item.total} ETH</span>
                  </div>

                  {/* Controles de Quantidade e Lixeira */}
                  <div className={styles.actionsRow}>
                    <div className={styles.quantityControls}>
                      {/* Botão de menos: dispara o removeItemCart passando o objeto */}
                      <button onClick={() => dispatch(removeItemCart(item))}>
                        -
                      </button>
                      <span>{item.amount}</span>
                      {/* Botão de mais: dispara o addItemCart reaproveitando a lógica de somar */}
                      <button onClick={() => dispatch(addItemCart(item))}>
                        +
                      </button>
                    </div>

                    {/* Botão de Lixeira: remove o item independente da quantidade */}
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

        {/* Rodapé com Total e Botão de Finalizar */}
        <div className={styles.footer}>
          <div className={styles.totalContainer}>
            <span className={styles.totalLabel}>TOTAL</span>
            <div className={styles.totalPrice}>
              <span className={styles.ethIcon}>♦</span>
              {/* Exibe o total formatado da store (ex: 44 ETH) */}
              <span>{cartTotal}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.99 }}
            className={styles.checkoutButton}
          >
            FINALIZAR COMPRA
          </motion.button>
        </div>
      </Container>
    </>
  );
}
