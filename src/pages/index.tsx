import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GoOctoface } from 'react-icons/go'
import { FormEvent, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => {
  const { data } = useSession()

  const router = useRouter()
  const [username, setUsername] = useState<string>('')

  console.log(data)

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    router.push(`/usuario/${username}`)
  }

  return (
    <div className={styles.container}>
      <GoOctoface />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.input}
          onChange={e => setUsername(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
      </form>

      <button onClick={() => signIn()}>Entrar</button>
    </div>
  )
}

export default HomePage
