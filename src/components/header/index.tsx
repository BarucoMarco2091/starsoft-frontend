"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import { Handbag } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartAmount } from "@/store/cartSlice";
import { motion } from "framer-motion";

export function Header() {
  const cartAmount = useSelector(selectCartAmount);
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <Image
            src={logoImg}
            quality={100}

            alt="logo"
            className={styles.logo}
          />
        </Link>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        key={cartAmount}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/cart">
          <Handbag size={24} color="#FF8310" />
        </Link>
        <span className={styles.counter}>{cartAmount}</span>
      </motion.div>
    </header>
  );
}
