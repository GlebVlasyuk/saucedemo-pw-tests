import { BS_LOCAL_ARGS } from './browserstack.config';
import { promisify } from 'util';
import BrowserStackLocal from 'browserstack-local';

const sleep = promisify(setTimeout);
const redColour = '\x1b[31m';
const whiteColour = '\x1b[0m';

 async function globalSetup() {
  console.log('Starting BrowserStackLocal ...');
  // Starts the Local instance with the required arguments
  let localResponseReceived = false;
  const bsLocal = new BrowserStackLocal.Local();

  bsLocal.start(BS_LOCAL_ARGS, (err) => {
    if (err) {
      console.error(
        `${redColour}Error starting BrowserStackLocal${whiteColour}`
      );
    } else {
      console.log('BrowserStackLocal Started');
    }
    localResponseReceived = true;
  });
  while (!localResponseReceived) {
    await sleep(1000);
  }
}

export default globalSetup;