import config from './support/config';
import { logger } from './utils/logger';

// BrowserStack Specific Capabilities.
// Set 'browserstack.local:true For Local testing
const caps = {
  browser: 'chrome',
  os: 'osx',
  os_version: 'catalina',
  name: 'PW Tests',
  build: 'playwright-build',
  'browserstack.username': config.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': config.BROWSERSTACK_ACCESS_KEY,
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || true, 
  'client.playwrightVersion': '1.46.1',
};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name: string, title: string) => {
  const combination = name.split(/@browserstack/)[0];
  const [browerCaps, osCaps] = combination.split(/:/);
  const [browser, browser_version] = browerCaps.split(/@/);
  const osCapsSplit = osCaps.split(/ /);
  const os = osCapsSplit.shift();
  const os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.os_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = title;
};

const BS_LOCAL_ARGS = {
    key: config.BROWSERSTACK_ACCESS_KEY,
  };


function getCdpEndpoint(name: string, title: string): string {
    patchCaps(name, title);    
    const cdpUrl = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
    logger.debug(`--> ${cdpUrl}`)
    return cdpUrl;
}

export {
    getCdpEndpoint,
    BS_LOCAL_ARGS,
}