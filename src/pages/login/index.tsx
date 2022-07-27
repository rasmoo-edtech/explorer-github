import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { GoOctoface } from "react-icons/go";

import styles from './styles.module.scss'

const LoginPage: NextPage = () => (
  <div className={styles.container}>
    <button onClick={() => signIn()}>
      <GoOctoface />
      Entrar
    </button>
  </div>
)

export default LoginPage