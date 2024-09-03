import {test as base, ConsoleMessage} from '@playwright/test'
import { logger } from '../utils/logger';

export const test = base.extend({
    page: async ({page}, use) => {
        await page.setViewportSize({width: 1920, height: 1080});

        // TODO add file logger and check if it's not empty => throw an error in after hook
        page.on('console', async (msg: ConsoleMessage) => {
            if (msg.type() === 'error') {
                logger.error('ERROR:')
                logger.error(msg.text())

                // throw new Error(msg.text());
            }
        })

        await use(page);
    },
});