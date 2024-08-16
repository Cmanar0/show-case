declare module 'js-cookie' {
  interface CookiesStatic {
    get(name: string): string | undefined;
    getJSON(name: string): any;
    set(name: string, value: string | object, options?: Cookies.CookieAttributes): void;
    remove(name: string, options?: Cookies.CookieAttributes): void;
  }

  const Cookies: CookiesStatic;
  export default Cookies;
}
