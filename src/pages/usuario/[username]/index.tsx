import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { GetServerSideProps, NextPage } from "next"
import { GoHeart, GoLinkExternal, GoLocation, GoOrganization, GoPerson, GoRepo } from "react-icons/go"

import { Layout } from "components/Layout"

import github from "service/github"
import styles from './styles.module.scss'
import { User, UserLocal } from 'types/user'

const UserPage: NextPage<User> = (user) => {
  const { status } = useSession()
  const [isLike, setIsLike] = useState<boolean>(false)
  const [usersLike, setUsersLike] = useState<UserLocal[]>([])

  const handleLikeUser = () => {
    let updateUsersLike = [...usersLike]

    if(isLike) {
      updateUsersLike = updateUsersLike.filter(userLike => userLike.login !== user.login )
    } else {
      updateUsersLike.push({
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url
      })
    }

    setIsLike(currentState => !currentState)

    setUsersLike(updateUsersLike)
    localStorage.setItem('github-explorer-likes', JSON.stringify(updateUsersLike))
  }

  useEffect(() => {
    const usersLikeLocal = localStorage.getItem('github-explorer-likes')

    if(usersLikeLocal) {
      const parseUsersLikeLocal: UserLocal[] = JSON.parse(usersLikeLocal)

      setUsersLike(parseUsersLikeLocal)
      setIsLike(parseUsersLikeLocal.findIndex(userLike => userLike.login === user.login) !== -1)
    }
  }, [])

  return (
    <Layout>
      <div className={styles.card}>
        <button className={styles.like} type="button" onClick={handleLikeUser}>
          <GoHeart className={isLike ? styles.active : ''} />
        </button>

        <div className={styles.card__content}>
          <div className={styles.user__avatar}>
            <Image src={user.avatar_url} layout="fill" objectFit="cover" alt="Imagem de avatar do usuário" />
          </div>

          <h1>{user.name || user.login}</h1>
          <h2>{user.bio}</h2>

          <p>
            <GoLocation /> {user.location || 'Via lactea'}
          </p>
        </div>

        <footer className={`${styles.card__footer} ${status === 'unauthenticated' ? styles.disable : ''}`}>
          <ul>
            {!!user.public_repos && (
              <li title="Número de repositorios">
                <GoRepo /> {user.public_repos}
              </li>
            )}
            {!!user.followers && (
              <li title="Número de seguidores">
                <GoOrganization /> {user.followers}
              </li>
            )}
            {!!user.following && (
              <li title="Número de usuários seguidos">
                <GoPerson /> {user.following}
              </li>
            )}
          </ul>

          <div className={styles.card__links}>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              <GoLinkExternal /> Mais detalhes
            </a>
            <Link href={`/usuario/${user.login}/repositorios`}>
              <a>
                <GoRepo /> Repositórios
              </a>
            </Link>
          </div>
        </footer>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params?.username

  if(username) {
    const response = await github.get<User>(`/users/${username}`)
    const user = response.data

    return {
      props: user
    }
  }

  return {
    props: {}
  }
}

export default UserPage