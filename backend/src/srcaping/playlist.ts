import puppeteer, { Page } from "puppeteer";

export type TScrapedSong = {
    imgSrc: string,
    name: string,
    singer: string
}

async function autoScroll(page: Page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve("");
                }
            }, 100);
        });
    });
}

export const scrapPlaylist = async (jioSaavnPlaylistUrl: string): Promise<TScrapedSong[] | null> => {
    let browser;
    const playlist: TScrapedSong[] = [];

    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(jioSaavnPlaylistUrl, { waitUntil: 'networkidle2' });
        await page.setViewport({ width: 1080, height: 1024 })

        await autoScroll(page);

        const figures = await page.$$('figure.o-flag.o-flag--action.o-flag--stretch.o-flag--mini');

        for (const fig of figures) {

            const imgSrc = await fig.$eval('img', el => el.src);


            const name = await fig.$eval('h2 > a', el => el.textContent);
            const singer = await fig.$eval("p > a", el => el.textContent);

            playlist.push({
                imgSrc: imgSrc!,
                name: name!,
                singer: singer!
            })

        }
        return playlist;
    } catch (error) {
        console.log(error)
        return null;

    } finally {
        browser?.close();

    }

}
