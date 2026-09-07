import { Container } from '@/components/container';
import styles from './styles/page.module.scss'
import Image from 'next/image';
import productImg from '../../public/img-1.svg'

export default function Home() {
  return (
    <main>
      <div className={styles.border}>

      </div>
      <Container>
        <section className={styles.grid}>
          <div className={styles.card}>

            <Image
              src={productImg}
              quality={100}
              width={100}
              height={100}
              alt='imagem'
            />
            <h2 className={styles.cardTitle}>Loreeeem</h2>
            <p className={styles.cardText}>Lorem</p>
            <span className={styles.cardPrice}>32 eth</span>
            <button className={styles.cardButton}>Comprar</button>
          </div>
          <div className={styles.card}>
            <Image
              src={productImg}
              quality={100}
              width={100}
              height={100}
              alt='imagem'
            />
            <h2 className={styles.cardTitle}>Loreeeem</h2>
            <p className={styles.cardText}>Lorem</p>
            <span className={styles.cardPrice}>32 eth</span>
            <button className={styles.cardButton}>Comprar</button>
          </div>
          <div className={styles.card}>
            <Image
              src={productImg}
              quality={100}
              width={100}
              height={100}
              alt='imagem'
            />
            <h2 className={styles.cardTitle}>Loreeeem</h2>
            <p className={styles.cardText}>Lorem</p>
            <span className={styles.cardPrice}>32 eth</span>
            <button className={styles.cardButton}>Comprar</button>
          </div>
          <div className={styles.card}>
            <Image
              src={productImg}
              quality={100}
              width={100}
              height={100}
              alt='imagem'
            />
            <h2 className={styles.cardTitle}>Loreeeem</h2>
            <p className={styles.cardText}>Lorem</p>
            <span className={styles.cardPrice}>32 eth</span>
            <button className={styles.cardButton}>Comprar</button>
          </div>
          <div className={styles.card}>
            <Image
              src={productImg}
              quality={100}
              width={100}
              height={100}
              alt='imagem'
            />
            <h2 className={styles.cardTitle}>Loreeeem</h2>
            <p className={styles.cardText}>Lorem</p>
            <span className={styles.cardPrice}>32 eth</span>
            <button className={styles.cardButton}>Comprar</button>
          </div>
          <div className={styles.card}>
            <Image
              src={productImg}
              quality={100}
              width={100}
              height={100}
              alt='imagem'
            />
            <h2 className={styles.cardTitle}>Loreeeem</h2>
            <p className={styles.cardText}>Lorem</p>
            <span className={styles.cardPrice}>32 eth</span>
            <button className={styles.cardButton}>Comprar</button>
          </div>
        </section>
        <div className={styles.loadBtn}>
          <button>Carregar mais</button>
        </div>
      </Container>
    </main>
  );
}
