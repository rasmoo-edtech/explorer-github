import Image from "next/image";
import Link from "next/link";

import { UserLocal } from "types/user";

import styles from './styles.module.scss'

export const CardLike = (user: UserLocal) => (
  <li>
    <Link href={`/usuario/${user.login}`}>
      <a className={styles.userLike}>
        <div className={styles.user__avatar}>
          <Image src={user.avatar_url} layout="fill" objectFit='cover' alt="Avatar do usuário" />
        </div>
        <strong>{user.name || user.login}</strong>
      </a>
    </Link>
  </li>
)