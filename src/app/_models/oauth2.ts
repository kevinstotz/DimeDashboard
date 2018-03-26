export class Oauth2 {
  grant_type: string;
  username: string;
  client_id: string;
  password: string;
}
export class RefreshToken {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}
