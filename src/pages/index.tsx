import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GoOctoface } from 'react-icons/go'
import { FormEvent, useEffect, useState } from 'react'

import { Layout } from 'components/Layout'
import { CardLike } from 'components/CardLike'

import { UserLocal } from 'types/user'
import styles from 'styles/home.module.scss'

const HomePage: NextPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [usersLike, setUsersLike] = useState<UserLocal[]>([])

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    router.push(`/usuario/${username}`)
  }

  useEffect(() => {
    const usersLikeLocal = localStorage.getItem('github-explorer-likes')

    if(usersLikeLocal) {
      setUsersLike(JSON.parse(usersLikeLocal))
    }
  }, [])

  return (
    <Layout className={styles.home}> 
      <GoOctoface />

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.input}
          onChange={e => setUsername(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
      </form>

      <ul className={styles.users}>
        {usersLike.map(userLike => (
          <CardLike  {...userLike} key={userLike.login} />
        ))}
      </ul>
    </Layout>
  )
}

export default HomePage
