const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const {Gateway} = require("../models/Gateway");
const {User} = require("../models/User");

const gatewayRoutes = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        Gateway.findOne({gatewayEUI: req.body.gatewayEUI})
            .then((gateway) => {
                serverResponses.sendSuccess(res, messages.SUCCESSFUL, gateway);
            })
            .catch((e) => {
                serverResponses.sendError(res, messages.BAD_REQUEST, e);
            });
    });

    //it's a prefix before api it is useful when you have many modules and you want to
    //differentiate b/w each module you can use this technique
    app.use("/api/gateway", router);
};
module.exports = gatewayRoutes;
