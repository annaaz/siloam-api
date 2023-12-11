// import * as mongoose from 'mongoose'
//
// const productSchema = new mongoose.Schema(
//   {
//     product_id: {
//       type: String,
//       unique: true
//     },
//     name: {
//       type: String
//     },
//     price: {
//       type: Number
//     },
//     size: {
//       type: String
//     }
//   },
//   { timestamps: true }
// )
//
// const productModel = mongoose.model('product', productSchema)

import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize'

const ProductModel = sequelize.define('product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Add this line
})

export default ProductModel
