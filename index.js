const puppeteer = require('puppeteer');

(async () => {
    let CNN = `https://www.cnn.com/`;
    let FOX = `https://www.foxnews.com/`
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    // TODO DRY code out
    await page.goto(CNN, {waitUntil: 'networkidle2'});
    let CNNData = await page.evaluate(() => {
        let CNNHeadline = document.querySelector(".screaming-banner-text").innerText;
        // TODO trim number of headlines?
        let CNNSubHeadlines1 = document.querySelector(".zn__column--idx-1").innerText;
        let CNNSubHeadlines2 = document.querySelector(".zn__column--idx-2").innerText;
        CNNSubHeadlines1 = CNNSubHeadlines1.split("\n")
        CNNSubHeadlines2 = CNNSubHeadlines2.split("\n")
        let CNNSubHeadlines = CNNSubHeadlines1.concat(CNNSubHeadlines2)
        let date = new Date()

        return {
            CNNHeadline,
            CNNSubHeadlines,
            date: date.toDateString(),
            time: date.toTimeString()
        }
    })
    await page.screenshot({path: 'CNNScreenshot.png'});
    await page.goto(FOX, {waitUntil: 'networkidle2'});
    let FoxData = await page.evaluate(() => {
        // TODO isolate main headline
        // TODO trim number of headlines?
        let FOXHeadlines = Array.from(document.querySelectorAll(".info-header")).map(el => el.innerText);
        // let FOXSubHeadlines1 = document.querySelector(".zn__column--idx-1").innerText;
        // let FOXSubHeadlines2 = document.querySelector(".zn__column--idx-2").innerText;
        // FOXSubHeadlines1 = FOXSubHeadlines1.split("\n")
        // FOXSubHeadlines2 = FOXSubHeadlines2.split("\n")
        let date = new Date()
        
        return {
            FOXHeadlines,
            // FOXSubHeadlines1: FOXSubHeadlines1,
            // FOXSubHeadlines2: FOXSubHeadlines2,
            date: date.toDateString(),
            time: date.toTimeString()
        }
    })
    await page.screenshot({path: 'FOXScreenshot.png'});
    let data = {...CNNData, ...FoxData}
    console.log(data.FOXHeadlines[0]);
    console.log(data.CNNHeadline);

    debugger;

    await browser.close();
})()