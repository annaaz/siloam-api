import express, { Express } from 'express'
import { Pool } from 'pg'
import supertest from 'supertest'
import { getProduct } from '../controllers/product.controllers' // Replace with the correct path

describe('getProduct controller', () => {
    let app: Express
    let pool: Pool

    beforeAll(() => {
        // Initialize your PostgreSQL pool
        pool = new Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'siloam',
            password: 'penguin',
            port: 5432
        })

        // Create an Express app for testing
        app = express()
        // Configure your routes and middleware here
        app.get('/products/:id', getProduct)
    })

    afterAll(async () => {
        // Release the PostgreSQL pool
        await pool.end()
    })
    describe('given the product doesn\'t exist', () => {
        it('should return 404 and empty data', async () => {
            const productID = '1'

            // Delete any existing record with the same productID (clean up from previous tests)
            const deletionResult = await pool.query('DELETE FROM products WHERE product_id = $1', [productID])

            console.log('Deletion Result:', deletionResult.rows)

            // Perform the request
            const response = await supertest(app)
                .get(`/products/${productID}`)
                .expect(404)


            // Add assertions based on your expected behavior
            expect(response.body).toEqual({ status: true, statusCode: 404, message: 'Product not found', data: null })
        })
    })

    describe('given the product exists', () => {
        it('should return 200 and the product data', async () => {
            // Assuming you have some test data in your database
            const testData = { product_id: 5, name: 'Test Product', price: 10.99, size: 'Medium' }

            // Insert test data into the database
            await pool.query('INSERT INTO products (product_id, name, price, size) VALUES ($1, $2, $3, $4)',
                [testData.product_id, testData.name, testData.price, testData.size])

            // Perform the request
            const response = await supertest(app)
                .get(`/products/${testData.product_id}`)
                .expect(200)

            console.log(response)
            // Add assertions based on your expected behavior
            expect(response.body).toEqual({
                status: true,
                statusCode: 200,
                data: [{ product_id: testData.product_id, name: testData.name, price: testData.price, size: testData.size }]
            })
        })
    })

    // Add more test cases as needed
})
