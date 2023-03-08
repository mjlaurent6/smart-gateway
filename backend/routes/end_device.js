const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const {EndDevice} = require("../models/End_Device");

const endDeviceRoutes = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        if (req.query.devEui) {
            EndDevice.findOne({eui: req.query.devEui})
                .then((end_device) => {
                    console.log(end_device)
                    serverResponses.sendSuccess(res, messages.SUCCESSFUL, end_device);
                })
                .catch((e) => {
                    serverResponses.sendError(res, messages.BAD_REQUEST, e);
                });
            return;
        } else {
            EndDevice.find({})
                .then((end_device) => {
                    serverResponses.sendSuccess(res, messages.SUCCESSFUL, end_device);
                })
                .catch((e) => {
                    serverResponses.sendError(res, messages.BAD_REQUEST, e);
                });
            return;
        }

    });

    router.get("/", (req, res) => {
        EndDevice.find({})
            .then((end_device) => {
                serverResponses.sendSuccess(res, messages.SUCCESSFUL, end_device);
            })
            .catch((e) => {
                serverResponses.sendError(res, messages.BAD_REQUEST, e);
            });
    });

    router.post("/register", (req, res) => {
        const end_device = new EndDevice({
            appEui: req.body.appEui, devEui: req.body.devEui, name: req.body.name
        });
        console.log(req.body)
        EndDevice.findOne({devEui: req.body.devEui})
            .then((result) => {
                if (result != null) {
                    serverResponses.sendError(res, messages.GATEWAY_ALREADY_EXIST);
                    return;
                } else {
                    end_device
                        .save()
                        .then((result) => {
                            serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
                        })
                        .catch((e) => {
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
    app.use("/api/end_device", router);
};
module.exports = endDeviceRoutes;
