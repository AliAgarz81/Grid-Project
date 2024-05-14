const { DataTypes } = require("sequelize");
const sequelize = require("../config/configDb");

const Faq = sequelize.define("Faq", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titleEN: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "All fields are required",
            },
            notEmpty: {
                msg: "All fields are required",
            },
        },
    },
    textEN: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "All fields are required",
            },
            notEmpty: {
                msg: "All fields are required",
            },
        },
    },
    titleTR: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "All fields are required",
            },
            notEmpty: {
                msg: "All fields are required",
            },
        },
    },
    textTR: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "All fields are required",
            },
            notEmpty: {
                msg: "All fields are required",
            },
        },
    }
}, {
    timestamps: false
});

module.exports = Faq;