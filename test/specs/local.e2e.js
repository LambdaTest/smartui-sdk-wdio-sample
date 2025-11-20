const { smartuiSnapshot } = require('@lambdatest/wdio-driver');
const { remote } = require('webdriverio');

(async function example() {
    const browser = await remote({
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: process.env.CI ? ['headless', 'disable-gpu'] : []
            }
        }
    });

    try {
        await browser.url('https://webdriver.io');
        await smartuiSnapshot(browser, "screenshot");
        
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.deleteSession();
    }
})();
