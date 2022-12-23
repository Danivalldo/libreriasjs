declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SECRET_TOKEN: string;
      MONGODB_URI: string;
      DEBUG: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
