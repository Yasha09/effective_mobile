require('reflect-metadata');
const {
    EntitySchema
} = require("typeorm");

module.exports = new EntitySchema({
    name: "UserActions",
    tableName: "user_actions",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        actionType: {
            type: "enum",
            enum: ["CREATED", "UPDATED"],
        },
        userId: {
            type: 'uuid',
        },
        actionData: {
            type: "json",
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
    },
})