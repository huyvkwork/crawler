const puppeteer = require('puppeteer');
const { handlePagination } = require('./pagination');
const { pauseExecution } = require('../utils/common');

async function crawlProducts(url) {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	try {
		await page.goto(url, { timeout: 0, waitUntil: 'domcontentloaded' });

		await solveCaptchaManually(page);

		const allProducts = await handlePagination(page);

		console.log('Crawling completed.');

		return allProducts;

	} catch (error) {
		console.error('Error during crawling:', error);
	} finally {
		await browser.close();
	}
}

async function solveCaptchaManually(page) {
	console.log("Please solve the CAPTCHA manually in the browser.");
	let captchaVisible = await isCaptchaVisible(page);

	while (captchaVisible) {
		await pauseExecution(5000);
		captchaVisible = await isCaptchaVisible(page);
	}
}

async function isCaptchaVisible(page) {
	try {
		await page.waitForSelector('.baxia-dialog', { visible: true, timeout: 5000 });
		return true;
	} catch (error) {
		return false;
	}
}

module.exports = {
	crawlProducts
};