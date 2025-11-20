const { expect, browser, $ } = require('@wdio/globals')
const { smartuiSnapshot } = require('@lambdatest/wdio-driver');

describe('My first visual test', () => {
    it('should use appropriate project token', async () => {
        await browser.url(`https://webdriver.io`)
        await smartuiSnapshot(browser, "screenshot");

    })
})

