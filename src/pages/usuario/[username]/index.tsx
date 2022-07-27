import Link from "next/link"
import Image from "next/image"
import { GetServerSideProps, NextPage } from "next"
import { GoLinkExternal, GoLocation, GoOrganization, GoPerson, GoRepo } from "react-icons/go"

import { User } from 'types/user'
import github from "service/github"
import styles from './styles.module.scss'

const UserPage: NextPage<User> = (user) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
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

        <footer className={styles.card__footer}>
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
    </div>
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