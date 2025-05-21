# PW-Framework-Step-By-Step
This repository offers a comprehensive, step-by-step guide to building an automation testing framework using Playwright. Designed with junior Automation QA engineers in mind, it demystifies the process by breaking down the development of a framework from the ground up. Each commit is thoughtfully crafted to explain not just 'how' but 'why' each part of the framework is implemented, providing a solid foundation for understanding and extending it. Whether you're starting your journey in automation testing or looking to strengthen your understanding of testing frameworks, this repository serves as a practical, educational tool, guiding you through the nuances of creating a robust, scalable testing framework with Playwright.

## Table of Contents

-   [Introduction](#introduction)
-   [Prerequisites](#prerequisites)
-   [Initialization of Playwright Project](#initialization-of-playwright-project)

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