interface Service {
  name: string;
  domain?: string;
  logo?: string;
  notes: Notes,
  encoding: ServiceEncoding;
  date_created: number;
  stats: Stats
}

type ServiceEncoding = 'legacy' | 'hex' | 'base58'

type Notes = {
  username?: string;
  email?: string;
  other?: string;
}

type Stats = {
  lastUsed: number;
  timesUsed: number;
}
