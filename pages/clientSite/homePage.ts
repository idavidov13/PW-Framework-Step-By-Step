import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export class HomePage {

    constructor(private page: Page) {}

    get homeBanner() {return this.page.getByRole('heading', { name: 'conduit' });}
    get yourFeedBtn() {return this.page.getByText('Your Feed');}
    get globalFeedBtn() {return this.page.getByText('Global Feed');}
    get bondarAcademyLink() {return this.page.getByRole('link', {
        name: 'www.bondaracademy.com',
    });}
    get noArticlesMessage() {return this.page.getByText('No articles are here... yet.');}

    /**
     * Navigates to the home page as Guest.
     * @returns {Promise<void>} Resolves when the navigation is complete.
     */
    async navigateToHomePageGuest(): Promise<void> {
        await this.page.goto(process.env.URL as string, {
            waitUntil: 'networkidle',
        });

        await expect(this.homeBanner).toBeVisible();
    }

    /**
     * Navigates to the home page as User.
     * @returns {Promise<void>} Resolves when the navigation is complete.
     */
    async navigateToHomePageUser(): Promise<void> {
        await this.page.goto(process.env.URL as string, {
            waitUntil: 'networkidle',
        });

        await expect(this.yourFeedBtn).toBeVisible();
        expect(this.globalFeedBtn).toBeVisible();
    }
}
