import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for Article Page functionality.
 * @export
 * @class ArticlePage
 * @typedef {ArticlePage}
 */
export class ArticlePage {
    constructor(private page: Page) {}

    get articleTitleInput() {
        return this.page.getByRole('textbox', {
            name: 'Article Title',
        });
    }
    get articleDescriptionInput() {
        return this.page.getByRole('textbox', {
            name: "What's this article about?",
        });
    }
    get articleBodyInput() {
        return this.page.getByRole('textbox', {
            name: 'Write your article (in',
        });
    }
    get articleTagInput() {
        return this.page.getByRole('textbox', {
            name: 'Enter tags',
        });
    }
    get publishArticleButton() {
        return this.page.getByRole('button', {
            name: 'Publish Article',
        });
    }
    get publishErrorMessage() {
        return this.page.getByText("title can't be blank");
    }
    get editArticleButton() {
        return this.page.getByRole('link', { name: ' Edit Article' }).first();
    }
    get deleteArticleButton() {
        return this.page
            .getByRole('button', { name: ' Delete Article' })
            .first();
    }

    /**
     * Navigates to the edit article page by clicking the edit button.
     * Waits for the page to reach a network idle state after navigation.
     * @returns {Promise<void>}
     */
    async navigateToEditArticlePage(): Promise<void> {
        await this.editArticleButton.click();

        await this.page.waitForResponse(
            (response) =>
                response.url().includes('/api/articles/') &&
                response.request().method() === 'GET'
        );
    }

    /**
     * Publishes an article with the given details.
     * @param {string} title - The title of the article.
     * @param {string} description - A brief description of the article.
     * @param {string} body - The main content of the article.
     * @param {string} [tags] - Optional tags for the article.
     * @returns {Promise<void>}
     */
    async publishArticle(
        title: string,
        description: string,
        body: string,
        tags?: string
    ): Promise<void> {
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.fill(description);
        await this.articleBodyInput.fill(body);

        if (tags) {
            await this.articleTagInput.fill(tags);
        }

        await this.publishArticleButton.click();

        await this.page.waitForResponse(
            (response) =>
                response.url().includes('/api/articles/') &&
                response.request().method() === 'GET'
        );

        await expect(
            this.page.getByRole('heading', { name: title })
        ).toBeVisible();
    }

    /**
     * Edits an existing article with the given details.
     * @param {string} title - The new title of the article.
     * @param {string} description - The new description of the article.
     * @param {string} body - The new content of the article.
     * @param {string} [tags] - Optional new tags for the article.
     * @returns {Promise<void>}
     */
    async editArticle(
        title: string,
        description: string,
        body: string,
        tags?: string
    ): Promise<void> {
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.fill(description);
        await this.articleBodyInput.fill(body);

        if (tags) {
            await this.articleTagInput.fill(tags);
        }

        await this.publishArticleButton.click();

        await this.page.waitForResponse(
            (response) =>
                response.url().includes('/api/articles/') &&
                response.request().method() === 'GET'
        );

        await expect(
            this.page.getByRole('heading', { name: title })
        ).toBeVisible();
    }

    /**
     * Deletes the currently selected article.
     * @returns {Promise<void>}
     */
    async deleteArticle(): Promise<void> {
        await this.deleteArticleButton.click();

        await expect(this.page.getByText('Global Feed')).toBeVisible();
    }
}
