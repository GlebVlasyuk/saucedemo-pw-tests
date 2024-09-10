import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface Config {
  BROWSERSTACK_USERNAME: string;
  BROWSERSTACK_ACCESS_KEY: string;
}

const getConfig = (): Config => {
  const config = {
    BROWSERSTACK_USERNAME: process.env.BROWSERSTACK_USERNAME,
    BROWSERSTACK_ACCESS_KEY: process.env.BROWSERSTACK_ACCESS_KEY,
  };
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

export default getConfig();
