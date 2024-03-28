const { pauseExecution } = require('../utils/common');
const { scrollLazyImages } = require('../utils/common');

async function handlePagination(page) {
    let allProducts = [];
    let hasMorePages = true;

    console.log('Crawling process ...');

    while (hasMorePages) {
        await pauseExecution(2000);
        await page.waitForSelector('[data-qa-locator="product-item"]');

        await scrollLazyImages(page);

        const productsData = await extractProductData(page);

        allProducts = allProducts.concat(productsData);

        const nextButtonDisabled = await page.$eval('.ant-pagination-next > button', button => button.disabled);

        if (nextButtonDisabled) {
            hasMorePages = false;
        } else {
            const nextButton = await page.$('.ant-pagination-next > button');
            await nextButton.click();
        }
    }

    return allProducts;
}

async function extractProductData(page) {
    return await page.evaluate(async () => {
        return Array.from(document.querySelectorAll('[data-qa-locator="product-item"]')).map(productElement => {
            const name = productElement.querySelector('.RfADt a').textContent.trim();
            const price = productElement.querySelector('.ooOxS').textContent.trim();
            const image = productElement.querySelector('.picture-wrapper img').src;
            return { name, price, image };
        });
    })
}

module.exports = {
    handlePagination
};