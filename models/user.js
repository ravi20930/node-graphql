const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const seedDatabase = async () => {
    const count = await User.count();
    if (count === 0) {
        const sampleUsers = [
            { name: 'John Doe', email: 'john@example.com', age: 25 },
            { name: 'Jane Smith', email: 'jane@example.com', age: 30 },
            { name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
            { name: 'Bob Anderson', email: 'bob@example.com', age: 35 },
            { name: 'Emily Davis', email: 'emily@example.com', age: 32 },
        ];

        await User.bulkCreate(sampleUsers);

        console.log('Sample users seeded successfully.');
    } else {
        console.log('Sample users already exist in the database.');
    }
};

module.exports = { User, seedDatabase };
