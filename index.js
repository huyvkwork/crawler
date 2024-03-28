const { program } = require('commander');
const { crawlProducts } = require('./src/crawler');
const ProductService = require('./src/services/ProductService');

program
	.command('crawl')
	.description('Crawl products from Lazada')
	.action(async () => {
		const url = 'https://www.lazada.vn/locklock-flagship-store/?q=All-Products&from=wangpu&langFlag=vi&pageTypeId=2';
		$data = await crawlProducts(url);
		const productService = new ProductService();
		await productService.saveProducts($data);
	});

program.parse(process.argv);