import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/logo.svg'
import { Handbag } from 'lucide-react'
import Link from 'next/link'

export function Header() {
    return(
        <header className={styles.header}>
            <div>
                <Link href="/">
                    <Image
                    src={logoImg}
                    quality={100}
                    
                    alt='logo'
                    className={styles.logo}

                />
                </Link>
            </div>
            <div>
                <Link href="/">
                    <Handbag size={24} color="#FF8310" />
                </Link>
                <span className={styles.counter}>0</span>
            </div>
        </header>
    )
}
