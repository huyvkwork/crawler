const connect = require('../database/connection');

class ProductService {
	constructor() {
		this.connection = null;
	}

	async getConnection() {
		if (!this.connection) {
			this.connection = await connect();
		}
		return this.connection;
	}

	async closeConnection() {
		if (this.connection) {
			await this.connection.end();
			this.connection = null;
		}
	}

	async saveProducts(products) {
		const connection = await this.getConnection();

		try {
			const chunkSize = 500;
			for (let i = 0; i < products.length; i += chunkSize) {
				const chunk = products.slice(i, i + chunkSize);
				const values = chunk.map(product => [product.name, product.price, product.image]);
				await connection.query('INSERT INTO products (name, price, image) VALUES ?', [values]);
			}
			console.log('Products saved successfully.');
		} catch (error) {
			console.error('Error saving products:', error);
			throw error;
		} finally {
			await this.closeConnection();
		}
	}

	async getProducts(page, limit) {
		const connection = await this.getConnection();
		const offset = (page - 1) * limit;

		try {
			const query = `SELECT * FROM products LIMIT ? OFFSET ?`;
			const [rows] = await connection.query(query, [limit, offset]);
			return rows;
		} catch (error) {
			throw error;
		}
	}

	async getTotalProducts() {
		const connection = await this.getConnection();

		try {
			const [rows] = await connection.query('SELECT COUNT(id) AS total FROM products');
			return rows[0].total;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = ProductService;