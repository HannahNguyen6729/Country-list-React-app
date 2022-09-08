export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}
export interface Country {
  name: string;
  capital: string[];
  region: string;
  flag: string;
  currencies: Currency[];
  population: number;
  languages: Language[];
  quantity: number;
}
export interface CountryState {
  countriesList: Country[];
  flag: Boolean;
  favoriteCountryList: Country[];
  flagList: Country[];
}
export interface List {
  countryList: Country[];
}
export interface Mode {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}
