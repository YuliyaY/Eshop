import { element, by, ElementFinder, ElementArrayFinder, Key } from 'protractor';

export class MainPage {

    get searchField(): ElementFinder {
        return element(by.id('twotabsearchtextbox'))
    }

    get resultGrid(): ElementFinder {
        return element(by.css('div.s-main-slot.s-result-list.s-search-results.sg-row'))   
    }

    get allPrices(): ElementArrayFinder {
        return this.resultGrid.all(by.css('span.a-price span.a-offscreen'))
    }

    getItemByPrice(text: string): ElementFinder {
        return element(by.cssContainingText('a.a-link-normal.a-text-normal', text))
    }

    get allItems(): ElementArrayFinder {
        return this.resultGrid.all(by.css('a.a-link-normal.a-text-normal'))
    }

    get addToCart(): ElementFinder {
        return element(by.id('add-to-cart-button'))
    }

    get addedToCartText(): ElementFinder {
        return element(by.id('huc-v2-order-row-confirm-text'))
    }    
 
    getTwoHighestPrices(listOfPrices: String): string[] {
        let newListOfPrices = [];
        for(let i=0; i < listOfPrices.length; i++) {
            newListOfPrices.push(Number((listOfPrices[i].replace("$", "")).replace(",","")))
        }
        const max = Math.max.apply(null, newListOfPrices)
        let maxIndex = newListOfPrices.indexOf(max);
        let newListOfPrices2 = newListOfPrices        
        newListOfPrices2.splice(newListOfPrices2[max], 1);
        let max2 = Math.max.apply(null, newListOfPrices2);
        let maxIndex2 = newListOfPrices.indexOf(max2)

        return [listOfPrices[maxIndex], listOfPrices[maxIndex2]]
    }
   
}
