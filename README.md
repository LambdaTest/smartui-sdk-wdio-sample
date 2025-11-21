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

## View Results

After running the tests, visit your SmartUI project dashboard to view the captured screenshots and compare them with baseline builds.

## More Information

For detailed onboarding instructions, see the [SmartUI WebdriverIO Onboarding Guide](https://www.lambdatest.com/support/docs/smartui-onboarding-webdriverio/).
