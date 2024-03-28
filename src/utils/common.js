async function pauseExecution(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

async function scrollLazyImages(page) {
	return await page.evaluate(async () => {
		// Scroll the page horizontally to trigger lazy loading of images
		await new Promise((resolve) => {
			let totalWidth = 0;
			const distance = 100;
			const timer = setInterval(() => {
				const scrollWidth = document.body.scrollWidth;
				window.scrollBy(distance, 0);
				totalWidth += distance;
				if (totalWidth >= scrollWidth) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});

		// Scroll the page vertically to trigger lazy loading of images
		await new Promise((resolve) => {
			let totalHeight = 0;
			const distance = 100;
			const timer = setInterval(() => {
				const scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;
				if (totalHeight >= scrollHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}

module.exports = {
	pauseExecution,
	scrollLazyImages
};