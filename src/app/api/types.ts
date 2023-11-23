interface User {
  username: string;
  settings: {
    algorithm: string;
  };
  create_date: Date;
}

interface UserAuthResponse {
  user: User;
  refresh_token: string;
  access_token: string;
}

interface ServerError {
  error: string;
}

interface ServerResponse<T> {
  data: T;
}