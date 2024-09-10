import BrowserStackLocal from 'browserstack-local';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

 async function tearDown() {
  // Stop the Local instance after your test run is completed, i.e after driver.quit
  let localStopped = false;
  const bsLocal = new BrowserStackLocal.Local();

  if (bsLocal && bsLocal.isRunning()) {
    bsLocal.stop(() => {
      localStopped = true;
      console.log('Stopped BrowserStackLocal');
    });
    while (!localStopped) {
      await sleep(1000);
    }
  }
}

export default tearDown;