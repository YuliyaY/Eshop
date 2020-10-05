import { browser, Key, ExpectedConditions } from "protractor";
import { MainPage } from "../pageobjects/main-page";

describe("Amazon eshop tests", () => {

    const mainPage = new MainPage();

    it("should add two most expensive items to the cart", async () => {
     try {
         await mainPage.searchField.sendKeys("Laptop");
         await mainPage.searchField.sendKeys(Key.ENTER);
         let listOfPrices = await mainPage.allPrices.getAttribute('outerText');
         console.log(listOfPrices);
         console.log(mainPage.getTwoHighestPrices(listOfPrices));
          for (const item of mainPage.getTwoHighestPrices(listOfPrices)) {
              await mainPage.getItemByPrice(item).click()
              await browser.wait(ExpectedConditions.visibilityOf(mainPage.addToCart),4000);
              await mainPage.addToCart.click();
              await browser.wait(ExpectedConditions.visibilityOf(mainPage.addedToCartText),4000);
              expect(await mainPage.addedToCartText.getAttribute('outerText')).toEqual("Added to Cart");
              await browser.navigate().back();
              await browser.navigate().back();
        }
     }
     catch(e) {
          console.log(e);
        }     
    });


});