import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { InventoryItem } from "../components/inventory-item.component";

export class InventoryPage extends BasePage {
  readonly page: Page;
  readonly pageContainer: Locator;
  readonly inventoryListContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageContainer = this.page.locator(".inventory_container");
    this.inventoryListContainer = this.page.getByTestId("inventory-list");
  }

  async open(): Promise<void> {
    const urlPath = "/inventory.html";
    await this.page.goto(urlPath);
    await this.page.waitForURL(urlPath);
  }

  async expectPageToBeDisplayed(): Promise<void> {
    await expect(
      this.pageContainer,
      "Inventory page container should be visible"
    ).toBeVisible();
  }

  getItemCardByName(itemName: string): InventoryItem {
    return new InventoryItem(this.page, itemName);
  }

  getItemCardByIndexInList(itemIndex: number): InventoryItem {
    return new InventoryItem(this.page, itemIndex);
  }
}
