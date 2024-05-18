## BookCart Web Tests

Web UI automated tests of [BookCart](https://bookcart.azurewebsites.net) site with Playwright and Cucumber.

### Technologies

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)
- [Cucumber](https://cucumber.io/)

### Installation

- Install [Node.js](https://nodejs.org/en/) LTS version

- Check that Node.js is installed

```bash
node -v
```

- Check that package manager npm is installed

```bash
npm -v
```

- Install project dependencies

```bash
npm install
```

### Run tests

```bash
npm run test
```

or

```bash
npm t
```

### Run a particular test

```json
{
  "paths": ["src/test/features/your_feature_name.feature"]
}
```

### Use tags to run a specific or collection of specs

```bash
npm run test --TAGS="@test or @add"
```

### Features

1. Awesome report with screenshots, videos & logs
2. Execute tests on multiple environments
3. Parallel execution
4. Rerun only failed features
5. Retry failed tests on CI
6. Github Actions integrated with downloadable report
7. Page object model
