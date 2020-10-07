import { browser, Key, ExpectedConditions } from "protractor";
import { MainPage } from "../pageobjects/main-page";

describe("Amazon eshop tests", () => {

    const mainPage = new MainPage();

    it("should add two most expensive items to the cart", async () => {
         await mainPage.searchField.sendKeys("Laptop");
         await mainPage.searchField.sendKeys(Key.ENTER);
         await browser.wait(ExpectedConditions.visibilityOf(mainPage.resultGrid),3000);
         let listOfPrices = await mainPage.allPrices.getAttribute('outerText');
         console.log(listOfPrices);
         console.log(mainPage.getTwoHighestPrices(listOfPrices));
          for (const item of mainPage.getTwoHighestPrices(listOfPrices)) {
              await mainPage.getItemByPrice(item).click();//.sendKeys(Key.chord(Key.CONTROL, "t"));
              await browser.wait(ExpectedConditions.visibilityOf(mainPage.addToCart),5000);
              await mainPage.addToCart.click();
              await browser.wait(ExpectedConditions.visibilityOf(mainPage.addedToCartText),4000);
              expect(await mainPage.addedToCartText.getAttribute('outerText')).toEqual("Added to Cart");
              await browser.navigate().back();
              await browser.navigate().back();
              await browser.wait(ExpectedConditions.visibilityOf(mainPage.resultGrid),4000);

        }
        await mainPage.cart.click();
        await browser.wait(ExpectedConditions.visibilityOf(mainPage.subtotal),4000);
        expect(await mainPage.subtotal.getAttribute('outerText')).toEqual("Subtotal (2 items): ")    
    });


});