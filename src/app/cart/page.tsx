"use client";
import { Container } from "@/components/container";
import styles from "./styles.module.scss";
import Image from "next/image";
import productImg from "../../../public/img-1.svg";
import Link from "next/link";

export default function Cart() {
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
          <div className={styles.cartItem}>
            {/* Imagem do item (Ex: Fantasma / Cajado) */}
            <div className={styles.imageContainer}>
              <Image src={productImg} width={70} height={70} alt="produto" />
            </div>

            {/* Detalhes do Produto */}
            <div className={styles.itemContent}>
              <div className={styles.itemInfo}>
                <h3>lorem</h3>
                <p>Redesigned from scratch and completely revised.</p>
              </div>

              {/* Preço em ETH */}
              <div className={styles.priceContainer}>
                <span className={styles.ethIcon}>♦</span>
                <span className={styles.priceText}>quantidade ETH</span>
              </div>

              {/* Controles de Quantidade e Lixeira */}
              <div className={styles.actionsRow}>
                <div className={styles.quantityControls}>
                  <button>-</button>
                  <span>qde</span>
                  <button>+</button>
                </div>

                {/* Botão de Lixeira Laranja */}
                <button className={styles.deleteButton} aria-label="Remover item">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com Total e Botão de Finalizar */}
        <div className={styles.footer}>
          <div className={styles.totalContainer}>
            <span className={styles.totalLabel}>TOTAL</span>
            <div className={styles.totalPrice}>
              <span className={styles.ethIcon}>♦</span>
              <span>total ETH</span>
            </div>
          </div>

          <button className={styles.checkoutButton}>
            FINALIZAR COMPRA
          </button>
        </div>
      </Container> {/* <-- CORRIGIDO: Fechamento do Container aqui */}
    </> /* <-- CORRIGIDO: Fechamento do Fragment aqui */
  );
}
