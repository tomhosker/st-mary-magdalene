/*
Returns the history page.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();
const finaliser = new Finaliser();

// Return the login page.
router.get("/", function (req, res, next) {
    console.log(req.user);
    finaliser.protoRender(req, res, "history", {title: "History"});
});

module.exports = router;
