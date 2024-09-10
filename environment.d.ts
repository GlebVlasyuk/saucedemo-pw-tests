declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BROWSERSTACK_USERNAME: string;
        BROWSERSTACK_ACCESS_KEY: string;
      }
    }
  }

  export {}