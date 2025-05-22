import { test as setup } from '../fixtures/pom/test-options';

setup('auth user', async ({ homePage, navPage, page }) => {
    await setup.step('create logged in user session', async () => {
        await homePage.navigateToHomePageGuest();

        await navPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);

        await page.context().storageState({ path: '.auth/userSession.json' });
    });
});
