import { getSession } from "next-auth/react"
import { GetServerSideProps, NextPage } from "next"
import { GoCalendar, GoLinkExternal, GoStar } from "react-icons/go"

import { Layout } from "components/Layout"

import { Repo } from "types/repo"
import github from "service/github"

import styles from './styles.module.scss'

interface RepositoriesPageProps {
  repos: Repo[]
}

const RepositoriesPage: NextPage<RepositoriesPageProps> = ({ repos }) => {
  return (
    <Layout>
      <ul className={styles.repos}>
        {repos.map(repo => (
          <li key={repo.id}>
            <a
              className={styles.repo}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.repo__info}>
                <strong>{repo.name}</strong>
                <div>
                  <time>
                    <GoCalendar />
                    {new Date(repo.created_at).toLocaleDateString()}
                  </time>
                  <span>
                    <GoStar />
                    {repo.stargazers_count}
                  </span>
                </div>
              </div>
              <GoLinkExternal />
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const username = params?.username

  if(username) {
    const response = await github.get<Repo[]>(`users/${username}/repos`)
    const repos = response.data

    return {
      props: {
        repos: repos.sort((repoA, repoB) => repoA.stargazers_count < repoB.stargazers_count ? 1 : -1)
      }
    }
  }

  return {
    props: {}
  }
}

export default RepositoriesPage