import { browser, Config, ExpectedConditions, element, by} from "protractor";
const { SpecReporter } = require('jasmine-spec-reporter');

export let config: Config = {
    framework: "jasmine",
    SELENIUM_PROMISE_MANAGER: false,
    directConnect: true,
    specs: [
        "specs/*.spec.js"
    ],
    capabilities: {
        browserName: 'chrome'
    },

    async onPrepare() {
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
        await browser.driver.get("https://amazon.com/");
        // await browser.wait(ExpectedConditions.visibilityOf(element(by.css('div.container'))),
            // 10000, 'Application did not load in time');
        await browser.driver.manage().window().maximize();
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'pretty' } }));        
    },
}