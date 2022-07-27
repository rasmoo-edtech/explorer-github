import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

import styles from './styles.module.scss'

export const Header = () => {
  const { data } = useSession()

  if(!data?.user) {
    return <></>
  }

  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <div className={styles.user__avatar}>
          <Image src={data.user.image as string} layout="fill"  objectFit='cover' alt='Avatar do usuário'/>
        </div>
        <div className={styles.user__info}>
          <strong>{data.user.name}</strong>
          <span>{data.user.email}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => signOut()}
        className={styles.signOut}
      >
        Sair
      </button>
    </header>
  )
}