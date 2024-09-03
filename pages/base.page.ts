import {Locator, Page} from '@playwright/test'
import { Header } from "../components/header.component";
import { SecondaryHeader } from "../components/secondary-header.component";
import { Footer } from "../components/footer.component";

export abstract class BasePage {
    readonly page: Page;
    readonly mainHeader: Header;
    readonly secondaryHeader: SecondaryHeader;
    readonly footer: Footer;
    abstract pageContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeader = new Header(this.page);
        this.secondaryHeader = new SecondaryHeader(this.page);
        this.footer = new Footer(this.page);
    }

    abstract open(): Promise<void>;
    abstract expectPageToBeDisplayed(): Promise<void>;
}