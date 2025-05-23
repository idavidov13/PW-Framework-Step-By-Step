# PW-Framework-Step-By-Step
This repository offers a comprehensive, step-by-step guide to building an automation testing framework using Playwright. Designed with junior Automation QA engineers in mind, it demystifies the process by breaking down the development of a framework from the ground up. Each commit is thoughtfully crafted to explain not just 'how' but 'why' each part of the framework is implemented, providing a solid foundation for understanding and extending it. Whether you're starting your journey in automation testing or looking to strengthen your understanding of testing frameworks, this repository serves as a practical, educational tool, guiding you through the nuances of creating a robust, scalable testing framework with Playwright.

## Table of Contents

-   [Introduction](#introduction)
-   [Prerequisites](#prerequisites)
-   [Initialization of Playwright Project](#initialization-of-playwright-project)
-   [Define User Snippets](#define-user-snippets)
-   [Setup Environment Variables](#setup-environment-variables)
-   [Setup POM (Page Object Model)](#setup-pom-page-object-model)
-   [Implement POM (Page Object Model) as Fixture](#implement-pom-page-object-model-as-fixture)
-   [Implement Auth User Session](#implement-auth-user-session)
-   [Implement UI Tests](#implement-ui-tests)
-   [Implement API Fixtures](#implement-api-fixtures)

## Introduction

This repository contains a Step-by-Step Playwright framework written in TypeScript. The framework follows the Page Object Model design pattern, custom fixtures and uses `.env` files for managing environment-specific variables. For example purpose is used the following webapp - https://conduit.bondaracademy.com/

This Framework was developed during my practice as an Automation QA and is based on invaluable lessons learned from:

1. **Stefan Judis** - [GitHub](https://github.com/stefanjudis), [Website](https://www.stefanjudis.com/)
2. **Murat Ozcan** - [GitHub](https://github.com/muratkeremozcan), [Udemy Course](https://www.udemy.com/course/playwright-vitest-vs-cypress-the-epic-showdown/)
3. **Filip Hric** - [GitHub](https://github.com/filiphric), [Website](https://filiphric.com/)
4. **Artem Bondar** - [GitHub](https://github.com/bondar-artem), [Website](https://www.bondaracademy.com/)

My goal is to provide a solid foundation for understanding and extending it. I am always exploring better ways to optimize the framework and welcome any suggestions or contributions. Feel free to use or update the provided framework to best suit your needs.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (version 20.13.1 or later)
-   **npm** (version 10 or later)
-   **IDE** (I recommend to use **Visual Studio Code** or **Windsurf**)

## Initialization of Playwright Project

To initialize a new Playwright project, run the following command:

```bash
npm init playwright@latest
```

There are a few options to initialize a new Playwright project. I recommend to use the following options:

-   **Language** - TypeScript (default)
-   **Test Folder** - tests (default)
-   **Add Github Actions workflow** - false (default)
-   **Install Playwright browsers** - true (default)

After the installation is completed, you can safely delete the following folder and file:

-   **tests-examples**
-   **tests/example.spec.ts**

## Define User Snippets

### **Open Command Palette**

- Launch Visual Studio Code / Windsurf.
- Open the Command Palette by using the shortcut `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
- Type snippets, and select Snippets: Configure Snippets from the dropdown list.

### **Choose the Scope**

- **New Global Snippets file**: Create a snippet that's available across all projects.
- **New Snippets file for 'projectName'**: Limit the snippet to a specific project.

### **Define Your Snippet**

- After choosing the scope, VS Code/Windsurf will prompt you to name your snippet file. Enter a meaningful name and press Enter.
- A JSON configuration file will open. This is where you define your snippet. The file contains a template to guide you:

```json
{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
}
```

### **Write Your Snippet or Use mine as starting point**

```json
{
	"Print to Console": {
		"scope": "javascript,typescript",
		"prefix": "cl",
		"body": [
			"console.log(${1});",
		],
		"description": "Log output to the console"
	},
	"Playwright Describe": {
		"scope": "javascript,typescript",
		"prefix": "pwd",
		"body": [
			"test.describe('${1}', () => {${2}});",
		],
		"description": "Generate a Playwright describe function"
	},
	"Playwright Test": {
		"scope": "javascript,typescript",
		"prefix": "pwt",
		"body": [
			"test('${1}',{tag:'@${2}'}, async ({ ${3} }) => {${4}});",
		],
		"description": "Generate a Playwright test function"
	},
	"Playwright Test Step": {
		"scope": "javascript,typescript",
		"prefix": "pwts",
		"body": [
			"await test.step('${1}', async () => {${2}});",
		],
		"description": "Generate a Playwright test step function"
	},
	"Expect toBeVisible": {
		"scope": "javascript,typescript",
		"prefix": "exv",
		"body": [
			"await expect(${1}).toBeVisible();",
		],
		"description": "Generate expect locator to be visible code"
	},
	"Expect toEqual": {
		"scope": "javascript,typescript",
		"prefix": "exe",
		"body": [
			"await expect(${1}).toEqual(${2});",
		],
		"description": "Generate expect recieved value to be equal to predefined value"
	},
	"Expect toHaveText": {
		"scope": "javascript,typescript",
		"prefix": "ext",
		"body": [
			"await expect(${1}).toHaveText(${2});",
		],
		"description": "Generate expect locator to have predefined text"
	},
	"API Request": {
		"scope": "javascript,typescript",
		"prefix": "req",
		"body": [
			"const { status, body } = await apiRequest<${1}>({method:'${2}',url: '${3}', baseUrl: ${4}, body: ${5}, headers: ${6}}); expect(status).toBe(${7});",
		],
		"description": "Generate API request"
	},
	"API Route": {
		"scope": "javascript,typescript",
		"prefix": "rou",
		"body": [
			"await page.route(`${1}`, async (route) => {await route.fulfill({status: 200, contentType: 'application/json',body: JSON.stringify(${2})});});"],
		"description": "Generate API route"
	},
	"Environment Variable": {
		"scope": "javascript,typescript",
		"prefix": "pr",
		"body": [
			"process.env.${1}",
		],
		"description": "Generate environment variable"
	},
	"Intercept API Response":{
		"scope": "javascript,typescript",
		"prefix": "int",
		"body": [
			"const interceptedResponse = await page.waitForResponse(`${${1}}${2}`); const interceptedResponseBody = await interceptedResponse.json(); const ${3} = interceptedResponseBody.${4};",
		],
		"description": "Intercept API response"
	}
}
```

### **Save and Use Your Snippet**

- After defining your snippet, save the file by using `Ctrl+S` (Windows/Linux) or `Cmd+S` (macOS).
- To use the snippet, open a file of the language your snippet is associated with (specified in "scope"), type the prefix, press Tab or Enter (depends on the IDE) to insert the snippet. After filling the data in the first defined input, by pressing Tab you will be navigated to the next input of the snippet (if any). This workflow helps to stay focused on the task.

### **Fine-tuning (Optional)**

- You can always come back and adjust your snippets. To do so, simply follow Step 1 to open the Command Palette, and this time, choose your existing snippet file to edit.

## Setup Environment Variables

### Importance
Setting up environment variables is essential for a well-functioning automation framework due to the following reasons:

#### Security
Environment variables safeguard sensitive information like passwords and API keys by excluding them from the source code, thereby enhancing security.

#### Portability
They ensure the framework's adaptability across diverse environments—development, testing, staging, production—without necessitating code alterations.

#### Consistency and Configuration Management
Allows for a unified approach to managing application and testing configurations, enabling adjustments without direct code modifications.

#### Scalability
Facilitates the framework's ability to accommodate growth and complexity by enabling scalable configurations that can be easily modified to suit varying project requirements.

### Selected tool
`npm dotenv` is a module in Node.js that loads environment variables from a `.env` file into `process.env`, making it easier to manage application configuration and secrets. It's particularly useful in development and production environments for separating configuration from code

### Key Features:
- Simplicity: Easily manageable environment variables stored in a file.
- Security: Keeps sensitive information, like database passwords and API keys, out of the source code.
- Portability: Simplifies configuration changes for different environments without altering the codebase.

### Setup

1. **Installation**: Add dotenv to your Node.js project using npm:

```bash
npm install dotenv
```

2. **Create Environment files structure**: In your project's root directory, create a `env` folder and separate file `env.environmentName` to store your environment variables (key-value pairs):

```bash
URL=https://conduit.bondaracademy.com/
API_URL=https://conduit-api.bondaracademy.com/
USER_NAME=yourName
EMAIL=yourEmail
PASSWORD=yourPassword
```

You can create `.env.example` file to show the structure of the environment file.
Keep in mind that in most cases you should have different values for every environment.

3. **Exclude environment files from version control**: Add the following line to your `.gitignore` file for `.env.dev` file (if you have more environment files, add them as well):

```bash
.env.dev
```

4. **Configure Environment Utilization**: In `playwright.config.ts` you have to add the following code at the top of the file:

```typescript
import dotenv from 'dotenv';
```

After that you have to add the following code to the `playwright.config.ts` file:

```typescript
const environmentPath =
    process.env.ENVIRONMENT == undefined
        ? `./env/.env.dev`
        : `./env/.env.${process.env.ENVIRONMENT}`;

dotenv.config({
    path: environmentPath,
});
```

Different variables can be accessed in your tests using `process.env.ENVIRONMENT`.


The chosen default environment name is DEV (.env.dev). The script is built to use the file if `process.env.ENVIRONMENT` is `undefined` (not set).


To set desired environment, run the following command into terminal, before starting the tests:

```
$env:ENVIRONMENT='environmentName'
```

You can verify the set variable with:

```sh
echo $env:ENVIRONMENT
```

5. **Use environment variable**: You can use the environment variable in the test files:

```typescript
const url = process.env.URL;
```

## Setup POM (Page Object Model)

### Importance of Design Pattern

The importance of employing design patterns in test automation cannot be overstated. It serves as a blueprint for organizing interaction with the user interface (UI) elements of web pages in a structured and reusable manner. This approach not only enhances test maintenance and readability but also significantly reduces code duplication. By abstracting the UI structure away from the test scripts, Design Pattern enables testers to write cleaner, more efficient code. Changes to the UI can be managed in a centralized manner, minimizing the impact on tests and improving the robustness of the automation suite. Ultimately, adopting Design Pattern leads to more scalable, maintainable, and reliable test automation strategies, aligning with best practices for software development and quality assurance.

### POM (Page Object Model) vs Functional Helpers

Both Page Object Model (POM) and Functional Helpers are popular design patterns used to enhance test automation frameworks. Here's a brief comparison of the two:

1. **Page Object Model (POM)**
- **Structure**: POM organizes web UI elements and interactions into objects corresponding to the pages or components of the tested application. Each page object encapsulates the page structure and behavior.
- **Maintenance**: Facilitates easier maintenance by centralizing changes to the UI, making it ideal for applications with frequently changing UI elements.
- **Readability**: Improves the readability of test scripts by abstracting UI specifics into methods of the page objects, thus making tests appear more like user stories.
- **Reusability**: High, as page objects can be reused across different tests for the same application page or component.
- **Learning Curve**: Might be steeper due to the need to design and maintain a separate layer of page objects.

2. **Functional Helpers**
- **Structure**: Functional Helpers approach uses functions for common tasks and interactions with the application, often without a strict binding to the application's page structure.
- **Maintenance**: Can be more straightforward for small projects or early-stage testing. However, maintaining a large suite of tests might become challenging as the application UI evolves.
- **Readability**: Improves the readability of test scripts by abstracting UI specifics into functions, thus making tests appear more like user stories.
- **Reusability**: Moderate, as helper functions can be reused, but they might require adjustments if used across contexts with different application states or requirements.
- **Learning Curve**: Generally lower than POM, as it requires less initial architectural setup and can be more intuitive for simple projects.

Ultimately, the choice between POM and Functional Helpers depends on the scale of the project, the complexity of the application under test, and the team's familiarity with these design patterns.

### POM Setup

1. **Create Project Structure**

Create pages/clientSite folders in the root directory of the project. Thus will give you a change to further extend the structure if there is Admin Panel or other parts of the application, different that Client Site.

2. **Create Page Object Files**

Create and implement page objects for the client site for all pages of the application. We will create page objects for the following pages: 

- Home Page
- Nav Page (Navigation Bar presents on every page, but we will create it as a separate page object, so we define it only once)
- Article Page

3. **Create Page Object Classes**

Create and implement page objects for the client site for all pages of the application.

## Implement POM (Page Object Model) as Fixture

1. **Create Fixtures Folder**

Create fixtures/pom folders in the root directory of the project.

2. **Create Fixtures Files**

- page-object-fixture.ts - files is used for extending the test fixture from `@playwright/test`
- test-options.ts - files is used for merging all extended test fixtures


## Implement Auth User Session

1. **Create Auth Script File**

Create auth.setup.ts file in the test directory of the project.

2. **Update Configuration file**

Update playwright.config.ts to configure auth setup.

3. **Add file to .gitignore**

Add `userSession.json` file to .gitignore file in the root directory of the project.

4. **Create Auth User Session**

Run the auth.setup.ts file to create auth user session.

5. **Create Guest User Session**

Create `guestSession.json` file in the `.auth` directory of the project and add `{}` to it.

## Implement UI Tests

1. **Add npm scripts for running tests**

Add the following scripts to the `package.json` file:

```json
{
    "scripts": {
        "test": "npx playwright test --project=chromium",
        "ci": "npx playwright test --project=chromium --workers=1",
        "flaky": "npx playwright test --project=chromium --repeat-each=20",
        "debug": "npx playwright test --project=chromium --debug",
        "ui": "npx playwright test --project=chromium --ui",
        "smoke": "npx playwright test --grep @Smoke --project=chromium",
        "sanity": "npx playwright test --grep @Sanity --project=chromium",
        "api": "npx playwright test --grep @Api --project=chromium",
        "regression": "npx playwright test --grep @Regression --project=chromium",
        "fullTest": "npx playwright test"
    }
}
```

2. **Create Test Data**

- Install faker package
```bash
npm install @faker-js/faker
```
- Create test-data folder in the root directory of the project and create articleData.json file in the test-data folder of the project.

3. **Create UI test files**

Create tests/clientSite folder in the root directory of the project and create separate test files for each page of the application.

## Implement API Fixtures

1. **Install zod package**

```bash
npm install zod
```

2. **Create 'api' folder in the fixtures directory of the project**

Create fixtures/api folder in the root directory of the project and create separate fixture files for each API calls, schemas and types-guards.

3. **Create 'plain-function.ts' file in the fixtures/api folder of the project**

4. **Create 'schemas.ts' file in the fixtures/api folder of the project**

5. **Create 'types-guards.ts' file in the fixtures/api folder of the project**

6. **Create 'api-request-fixtures.ts' file in the fixtures/api folder of the project**

7. **Update `test-options.ts` file in the fixtures/pom folder of the project**