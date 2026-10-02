const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Student = sequelize.define("Student", {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });

    return Student;
};