// import * as mongoose from 'mongoose'
//
// const userSchema = new mongoose.Schema(
//   {
//     user_id: { type: String, unique: true },
//     email: { type: String, unique: true },
//     name: { type: String, default: '' },
//     password: { type: String, default: '' },
//     role: { type: String, default: 'reqular' }
//   },
//   { timestamps: true }
// )
//
// const userModel = mongoose.model('user', userSchema)

import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize'

const userModel = sequelize.define('user', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true // Make user_id the primary key

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'regular' // Corrected typo in 'regular'
    }
}, {
    timestamps: true
})

export default userModel
