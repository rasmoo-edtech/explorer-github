export interface UserLocal {
  avatar_url: string
  name: string
  login: string
}
export interface User extends UserLocal {
  bio: string
  location: string
  public_repos: string
  followers: string
  following: string
  html_url: string
}

