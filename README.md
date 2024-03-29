# Lazada Product Crawler

This is a crawling system built with Node.js and Puppeteer to scrape products from the Lazada website and store them in a MySQL database. The crawled data is then displayed on a basic website with pagination.

## Requirements

- Node.js (>=16.0.0)
- Mysql

## Getting Started

1. **Clone the Repository** 
```bash
https://github.com/huyvkwork/crawler.git
```

2. **Install Dependencies**
```bash
    cd project_path
    npm install
```


3. **Configure MySQL Database**: Update the `./config/database.js` file
```bash
{
	host: '',
	user: '',
	password: '',
	database: ''
}
```

4. **Run the Crawler**
```bash
    npm start
```

## Technologies Used

- Node.js: Backend runtime environment.
- Puppeteer: Headless browser automation library for web scraping.
- MySQL: Relational database management system.

## Demo

A demo of the crawled data can be accessed [here](http://huyvuongvkh.site/).