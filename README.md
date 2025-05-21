# PW-Framework-Step-By-Step
This repository offers a comprehensive, step-by-step guide to building an automation testing framework using Playwright. Designed with junior Automation QA engineers in mind, it demystifies the process by breaking down the development of a framework from the ground up. Each commit is thoughtfully crafted to explain not just 'how' but 'why' each part of the framework is implemented, providing a solid foundation for understanding and extending it. Whether you're starting your journey in automation testing or looking to strengthen your understanding of testing frameworks, this repository serves as a practical, educational tool, guiding you through the nuances of creating a robust, scalable testing framework with Playwright.

## Table of Contents

-   [Introduction](#introduction)
-   [Prerequisites](#prerequisites)
-   [Initialization of Playwright Project](#initialization-of-playwright-project)
-   [Define User Snippets](#define-user-snippets)

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