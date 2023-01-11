const { User } = require('../models');

const userData = [
    {
        username: "MarsellusWallace",
        email: "mwallace@aol.com",
        password: "PrettyFarFromOK",
    },
    {
        username: "MiaWallace",
        email: "miawallace@hotmail.com",
        password: "FiveDollarShake",
    },
    {
        username: "VincentVega",
        email: "vincent@gmail.com",
        password: "RoyaleWithCheese",
    },
    {
        username: "JulesWinfield",
        email: "jules@yahoo.com",
        password: "BigKahunaBurger",
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;