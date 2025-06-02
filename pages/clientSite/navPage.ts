import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Navigation functionality.
 * @export
 * @class NavPage
 * @typedef {NavPage}
 */
export class NavPage {
    constructor(private page: Page) {}

    get navBar() {
        return this.page.getByRole('navigation');
    }
    get conduitIcon() {
        return this.navBar.getByRole('link', { name: 'conduit' });
    }
    get homePageLink() {
        return this.page.getByRole('link', {
            name: 'Home',
            exact: true,
        });
    }
    get newArticleButton() {
        return this.page.getByRole('link', {
            name: 'New Article',
        });
    }
    get settingsButton() {
        return this.page.getByRole('link', { name: 'Settings' });
    }
    get settingsPageTitle() {
        return this.page.getByRole('heading', {
            name: 'Your Settings',
        });
    }
    get logoutButton() {
        return this.page.getByRole('button', {
            name: 'Or click here to logout.',
        });
    }
    get signInNavigationLink() {
        return this.page.getByRole('link', { name: 'Sign in' });
    }
    get signInPageTitle() {
        return this.page.getByRole('heading', { name: 'Sign in' });
    }
    get emailInput() {
        return this.page.getByRole('textbox', { name: 'Email' });
    }
    get passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }
    get signInButton() {
        return this.page.getByRole('button', { name: 'Sign in' });
    }
    get signUpNavigationLink() {
        return this.page.getByRole('link', { name: 'Sign up' });
    }
    get signUpPageTitle() {
        return this.page.getByRole('heading', { name: 'Sign up' });
    }
    get homePageHeading() {
        return this.page.getByRole('heading', { name: 'conduit' });
    }

    /**
     * Navigates to the Home page using the Home link.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToHomePage(): Promise<void> {
        await this.homePageLink.click();

        await expect(this.homePageHeading).toBeVisible();
    }

    /**
     * Navigates to the Home page using the Conduit icon.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToHomePageByIcon(): Promise<void> {
        await this.conduitIcon.click();

        await expect(this.homePageHeading).toBeVisible();
    }

    /**
     * Navigates to the Sign In page.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToSignInPage(): Promise<void> {
        await this.signInNavigationLink.click();

        await expect(this.signInPageTitle).toBeVisible();
    }

    /**
     * Navigates to the Sign Up page.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToSingUpPage(): Promise<void> {
        await this.signUpNavigationLink.click();

        await expect(this.signUpPageTitle).toBeVisible();
    }

    /**
     * Logs in the user using the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<void>} Resolves when the login process is complete.
     */
    async logIn(email: string, password: string): Promise<void> {
        await this.navigateToSignInPage();

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForResponse(`${process.env.API_URL}api/tags`);

        await expect(
            this.page.getByRole('navigation').getByText(process.env.USER_NAME!)
        ).toBeVisible();
    }

    /**
     * Logs out the currently logged-in user.
     * @returns {Promise<void>} Resolves when the logout process is complete.
     */
    async logOut(): Promise<void> {
        await this.settingsButton.click();
        await expect(this.settingsPageTitle).toBeVisible();

        await this.logoutButton.click();

        await expect(this.homePageHeading).toBeVisible();
    }
}
