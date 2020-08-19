const express = require("express");
let router = express.Router();

const exploreActions = require("./explore.action");

router.route("/:name/:tag").get(exploreActions.get_package);

module.exports = router;
