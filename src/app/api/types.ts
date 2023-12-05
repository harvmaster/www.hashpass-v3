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

interface AccessTokenResponse {
  access_token: string;
}

interface ServerError {
  error: string | {
    [key: string]: string;
  };
}

interface ServerResponse<T> {
  data: T;
}

interface ServiceResponse {
  service: Service;
}

interface ServiceListResponse {
  services: Service[]
}

interface ServiceDeleteResponse {
  status: 'success'
}

interface LogoResponse {
  logos: {
    src: string;
    size: {
      width: number;
      height: number;
    }
  }[]
}

interface DomainRecommendationResponse {
  domains: string[]
}