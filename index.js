const puppeteer = require('puppeteer');

(async () => {
    let URL = `https://www.cnn.com/`;
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(URL, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(() => {
        let headline = document.querySelector(".screaming-banner-text").innerText;
        let subHeadlines1 = document.querySelector(".zn__column--idx-1").innerText;
        let subHeadlines2 = document.querySelector(".zn__column--idx-2").innerText;
        subHeadlines1 = subHeadlines1.split("\n").slice(1)
        subHeadlines2 = subHeadlines2.split("\n")

        return {
            headline,
            subHeadlines1: subHeadlines1,
            subHeadlines2: subHeadlines2
        }
    })
    await page.screenshot({path: 'screenshot.png'});
    console.log(data);

    debugger;

    await browser.close();
})()