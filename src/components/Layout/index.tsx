import { Header } from "components/Header"

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export const Layout = ({ className = '', children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={`${styles.content} ${className}`}>
        {children}
      </main>
    </div>
  )
}