import { Sequelize } from 'sequelize'

// Load environment variables from .env file
import 'dotenv/config'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'penguin',
  database: process.env.DB_NAME ?? 'siloam'
})

export default sequelize
