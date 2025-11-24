# SmartUI SDK Sample for WebdriverIO

Welcome to the SmartUI SDK sample for WebdriverIO. This repository demonstrates how to integrate SmartUI visual regression testing with WebdriverIO.

## Repository Structure

```
smartui-sdk-wdio-sample/
├── test/
│   └── specs/
│       ├── cloud.e2e.js      # Cloud test file
│       └── local.e2e.js       # Local test file
├── wdio.conf.js               # WebdriverIO configuration
├── package.json               # Dependencies
└── smartui-web.json          # SmartUI config (create with npx smartui config:create)
```

## 1. Prerequisites and Environment Setup

### Prerequisites

- Node.js installed
- LambdaTest account credentials (for Cloud tests)
- Chrome browser (for Local tests)

### Environment Setup

**For Cloud:**
```bash
export LT_USERNAME='your_username'
export LT_ACCESS_KEY='your_access_key'
export PROJECT_TOKEN='your_project_token'
```

**For Local:**
```bash
export PROJECT_TOKEN='your_project_token'
```

## 2. Initial Setup and Dependencies

### Clone the Repository

```bash
git clone https://github.com/LambdaTest/smartui-sdk-wdio-sample
cd smartui-sdk-wdio-sample
```

### Install Dependencies

The repository already includes the required dependencies in `package.json`. Install them:

```bash
npm install
```

**Dependencies included:**
- `@lambdatest/smartui-cli` - SmartUI CLI
- `@lambdatest/wdio-driver` - SmartUI WebdriverIO driver
- `@wdio/cli` - WebdriverIO CLI
- `webdriverio` - WebdriverIO framework
- `wdio-lambdatest-service` - LambdaTest service for WebdriverIO

### Create SmartUI Configuration

```bash
npx smartui config:create smartui-web.json
```

## 3. Steps to Integrate Screenshot Commands into Codebase

The SmartUI screenshot function is already implemented in the repository.

**Cloud Test** (`test/specs/cloud.e2e.js`):
```javascript
const { smartuiSnapshot } = require('@lambdatest/wdio-driver');

await browser.url(`https://webdriver.io`)
await smartuiSnapshot(browser, "screenshot");
```

**Local Test** (`test/specs/local.e2e.js`):
```javascript
const { smartuiSnapshot } = require('@lambdatest/wdio-driver');

await browser.url('https://webdriver.io');
await smartuiSnapshot(browser, "screenshot");
```

**Note**: The code is already configured and ready to use. You can modify the URL and screenshot name if needed.

## 4. Execution and Commands

### Local Execution

```bash
npx smartui exec -- node test/specs/local.e2e.js
```

### Cloud Execution

```bash
npx smartui exec -- wdio run ./wdio.conf.js
```

## Test Files

### Cloud Test (`test/specs/cloud.e2e.js`)

- Connects to LambdaTest Cloud using WebdriverIO
- Reads credentials from environment variables (`LT_USERNAME`, `LT_ACCESS_KEY`)
- Uses Mocha framework
- Takes screenshot with name: `screenshot`

### Local Test (`test/specs/local.e2e.js`)

- Runs WebdriverIO locally using Chrome
- Requires Chrome browser installed
- Takes screenshot with name: `screenshot`

## Configuration

### WebdriverIO Config (`wdio.conf.js`)

The configuration file is pre-configured for LambdaTest Cloud:
- Hostname: `hub.lambdatest.com`
- Reads credentials from environment variables
- Excludes `local.e2e.js` from cloud runs
- Uses Mocha framework

### SmartUI Config (`smartui-web.json`)

Create the SmartUI configuration file using:
```bash
npx smartui config:create smartui-web.json
```

## Best Practices

### Screenshot Naming

- Use descriptive, unique names for each screenshot
- Include test context and state
- Avoid special characters
- Use consistent naming conventions

### When to Take Screenshots

- After critical user interactions
- Before and after form submissions
- At different viewport sizes
- After page state changes

### WebdriverIO-Specific Tips

- Use `browser.waitUntil()` before screenshots
- Take screenshots after page loads completely
- Use `browser.setWindowSize()` for responsive testing
- Combine with WebdriverIO assertions

### Example: Screenshot After Interaction

```javascript
const { smartuiSnapshot } = require('@lambdatest/wdio-driver');

describe('Homepage Tests', () => {
  it('Should take screenshot after search', async () => {
    await browser.url('https://www.lambdatest.com');
    await browser.waitUntil(async () => {
      return (await browser.$('#search')).isDisplayed();
    });
    
    await browser.$('#search').setValue('WebdriverIO');
    await browser.$('#search-button').click();
    await browser.waitUntil(async () => {
      return (await browser.$('.results')).isDisplayed();
    });
    
    await smartuiSnapshot(browser, "search-results");
  });
});
```

## Common Use Cases

### Responsive Testing

```javascript
describe('Responsive Tests', () => {
  it('Desktop View', async () => {
    await browser.setWindowSize(1920, 1080);
    await browser.url('https://www.lambdatest.com');
    await smartuiSnapshot(browser, 'homepage-desktop');
  });

  it('Tablet View', async () => {
    await browser.setWindowSize(768, 1024);
    await browser.url('https://www.lambdatest.com');
    await smartuiSnapshot(browser, 'homepage-tablet');
  });

  it('Mobile View', async () => {
    await browser.setWindowSize(375, 667);
    await browser.url('https://www.lambdatest.com');
    await smartuiSnapshot(browser, 'homepage-mobile');
  });
});
```

### Multi-Step Flow Testing

```javascript
describe('Checkout Flow', () => {
  it('Complete Checkout Visual Test', async () => {
    await browser.url('https://example.com/checkout');
    await smartuiSnapshot(browser, 'checkout-step-1');
    
    await browser.$('#next-step').click();
    await browser.waitUntil(async () => {
      return (await browser.$('#step-2')).isDisplayed();
    });
    await smartuiSnapshot(browser, 'checkout-step-2');
  });
});
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: WebdriverIO SmartUI Tests

on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run WebdriverIO with SmartUI (Local)
        env:
          PROJECT_TOKEN: ${{ secrets.SMARTUI_PROJECT_TOKEN }}
        run: |
          npx smartui exec -- node test/specs/local.e2e.js
      
      - name: Run WebdriverIO with SmartUI (Cloud)
        env:
          PROJECT_TOKEN: ${{ secrets.SMARTUI_PROJECT_TOKEN }}
          LT_USERNAME: ${{ secrets.LT_USERNAME }}
          LT_ACCESS_KEY: ${{ secrets.LT_ACCESS_KEY }}
        run: |
          npx smartui exec -- wdio run ./wdio.conf.js
```

## Troubleshooting

### Issue: `smartuiSnapshot is not a function`

**Solution**: Ensure the driver is imported:
```javascript
const { smartuiSnapshot } = require('@lambdatest/wdio-driver');
```

### Issue: Screenshots not captured

**Solution**:
1. Verify `PROJECT_TOKEN` is set
2. Add waits before screenshots
3. Ensure test completes successfully
4. Check WebdriverIO configuration

### Issue: `PROJECT_TOKEN is required`

**Solution**: Set the environment variable:
```bash
export PROJECT_TOKEN='your_project_token'
```

### Issue: Cloud execution fails

**Solution**:
1. Verify `wdio.conf.js` is configured correctly
2. Check `LT_USERNAME` and `LT_ACCESS_KEY` are set
3. Verify LambdaTest service is configured in `wdio.conf.js`

## Configuration Tips

### WebdriverIO Config (`wdio.conf.js`)

Ensure LambdaTest service is configured:
```javascript
services: [
  ['lambdatest', {
    tunnel: false
  }]
],

capabilities: [{
  browserName: 'chrome',
  'LT:Options': {
    username: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    platformName: 'Windows 10',
    build: 'WebdriverIO SmartUI Build'
  }
}]
```

### Optimizing `smartui-web.json`

```json
{
  "web": {
    "browsers": ["chrome", "firefox", "edge"],
    "viewports": [
      [1920, 1080],
      [1366, 768],
      [375, 667]
    ],
    "waitForPageRender": 30000,
    "waitForTimeout": 2000
  }
}
```

## View Results

After running the tests, visit your SmartUI project dashboard to view the captured screenshots and compare them with baseline builds.

## Additional Resources

- [SmartUI WebdriverIO Onboarding Guide](https://www.lambdatest.com/support/docs/smartui-onboarding-webdriverio/)
- [WebdriverIO Documentation](https://webdriver.io/)
- [LambdaTest WebdriverIO Documentation](https://www.lambdatest.com/support/docs/webdriverio-testing/)
- [SmartUI Dashboard](https://smartui.lambdatest.com/)
- [LambdaTest Community](https://community.lambdatest.com/)
