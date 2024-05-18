const { DataTypes } = require("sequelize");
const sequelize = require("../config/configDb");

const Content = sequelize.define("Content", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Title is required",
            },
            notEmpty: {
                msg: "Title is required",
            },
        },
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Link is required",
            },
            notEmpty: {
                msg: "Link is required",
            },
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Link is required",
            },
            notEmpty: {
                msg: "Link is required",
            },
            isIn: {
                args: [["IT", "Design"]],
                msg: "Invalid category"
            }
        },
    },
    image: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Image is required",
            },
            notEmpty: {
                msg: "Image is required",
            },
        },
    }
});

module.exports = Content;