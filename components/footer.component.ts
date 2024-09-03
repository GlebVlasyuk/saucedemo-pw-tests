import { expect, Locator, Page } from "@playwright/test";

export class Footer {
    readonly page: Page;
    readonly footerContainer: Locator;
    readonly copyRightsLabel: Locator;
    readonly twitterIconLink: Locator;
    readonly facebookIconLink: Locator;
    readonly linkedinIconLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerContainer = this.page.getByTestId('footer');
        this.copyRightsLabel = this.footerContainer.getByTestId('footer-copy');
        this.twitterIconLink = this.footerContainer.getByTestId('social-twitter');
        this.facebookIconLink = this.footerContainer.getByTestId('social-facebook');
        this.linkedinIconLink = this.footerContainer.getByTestId('social-linkedin');
    }

    async expectFooterDisplayedCorrectly(): Promise<void> {
        await expect(this.footerContainer, 'Footer should be displayed').toBeVisible();
        await expect(this.twitterIconLink, 'Footer Twitter link icon should be displayed').toBeVisible();
        await expect(this.facebookIconLink, 'Footer Facebook link icon should be displayed').toBeVisible();
        await expect(this.linkedinIconLink, 'Footer Lnkedin link icon should be displayed').toBeVisible();
        await expect(this.copyRightsLabel, 'Copry rights label should have correct text').toHaveText('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
        await expect.soft(this.footerContainer.locator('ul').locator('li'), 'Social icons should display only 3 items').toHaveCount(3);
    }
}