const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const {Gateway} = require("../models/Gateway");
const {User} = require("../models/User");

const gatewayRoutes = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        if (req.query.eui) {
            Gateway.findOne({eui: req.query.eui})
                .then((gateway) => {
                    console.log(gateway)
                    serverResponses.sendSuccess(res, messages.SUCCESSFUL, gateway);
                })
                .catch((e) => {
                    serverResponses.sendError(res, messages.BAD_REQUEST, e);
                });
            return;
        } else {
            Gateway.find({})
                .then((gateway) => {
                    serverResponses.sendSuccess(res, messages.SUCCESSFUL, gateway);
                })
                .catch((e) => {
                    serverResponses.sendError(res, messages.BAD_REQUEST, e);
                });
            return;
        }

    });

    router.get("/", (req, res) => {
        Gateway.find({})
            .then((gateway) => {
                serverResponses.sendSuccess(res, messages.SUCCESSFUL, gateway);
            })
            .catch((e) => {
                serverResponses.sendError(res, messages.BAD_REQUEST, e);
            });
    });

    router.post("/register", (req, res) => {
        const gateway = new Gateway({
            eui: req.body.eui, name: req.body.name
        });
        console.log(req.body)
        Gateway.findOne({eui: req.body.eui})
            .then((result) => {
                if (result != null) {
                    serverResponses.sendError(res, messages.GATEWAY_ALREADY_EXIST);
                    return;
                } else {
                    gateway
                        .save()
                        .then((result) => {
                            console.log("not")
                            serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
                        })
                        .catch((e) => {
                            console.log("found")
                            serverResponses.sendError(res, messages.BAD_REQUEST, e);
                        });
                }
            })
            .catch((e) => {
                serverResponses.sendError(res, messages.BAD_REQUEST, e);
                return;
            });
    });


    //it's a prefix before api it is useful when you have many modules and you want to
    //differentiate b/w each module you can use this technique
    app.use("/api/gateway", router);
};
module.exports = gatewayRoutes;
