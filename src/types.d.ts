interface Service {
  name: string; 
  note?: {
    username?: string;
    email?: string;
    other?: string; 
  };
  legacy: boolean;
  encoding: string;   
  logo: string;
  domain: string;
  dateUsed?: number;
  dateAdded?: number;
  timesUsed?: number;
}