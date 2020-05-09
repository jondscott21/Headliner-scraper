const puppeteer = require('puppeteer');

(async () => {
    let URL = `https://www.cnn.com/`;
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(URL, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(() => {
        let headline = document.querySelector(".screaming-banner-text").innerText;
        let subHeadlines = document.querySelectorAll(".screaming-banner-text");

        return {
            headline,
            subHeadlines
        }
    })
    console.log(data);

    debugger;

    await browser.close;
})()