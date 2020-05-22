const puppeteer = require('puppeteer');
const fs = require('fs');


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

        return {
            CNNHeadline,
            CNNSubHeadlines,
        }
    })
    await page.screenshot({path: 'CNNScreenshot.png'});
    await page.goto(FOX, {waitUntil: 'networkidle2'});
    let FoxData = await page.evaluate(() => {
        let kicker = document.querySelector('.kicker-text').innerText
        let FOXHeadlines = Array.from(document.querySelectorAll('.main-content .title')).map(el => el.innerText);
        kicker.length > 0 ? FOXHeadlines[0] = `${kicker}: ${FOXHeadlines[0]}` : null
        
        return {
            FOXHeadlines,
        }
    })
    await page.screenshot({path: 'FOXScreenshot.png'});
    let date = new Date()
    let data = {
        ...CNNData, 
        ...FoxData, 
        date: date.toDateString(),
        time: date.toTimeString()
    }
    // console.log(data.FOXHeadlines);
    // console.log(data.CNNHeadline);
    console.log(data);

    debugger;
    await fs.writeFile('test.json', JSON.stringify(data, null, 2), (err) => {
        if(err) {
            console.log(err)
        }
    })
    await browser.close();
})()