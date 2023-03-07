const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const {User} = require("../models/User");

const loginRoutes = (app) => {
    const router = express.Router();

    router.post("/register", (req, res) => {

        const user = new User({
            username: req.body.username, password: req.body.password, name: req.body.name, role: "user"
        });

        User.findOne({username: req.body.username})
            .then((result) => {
                if (result != null) {
                    serverResponses.sendError(res, messages.USER_ALREADY_EXIST);
                    return;
                } else {
                    user
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

    router.post("/login", (req, res) => {
        User.findOne({username: req.body.username})
            .then((user) => {
                console.log(user)
                if (user != null) {
                    serverResponses.sendSuccess(res, messages.SUCCESSFUL, {
                        name: user.name,
                        role: user.role
                    });
                } else {
                    serverResponses.sendError(res, messages.USER_NOT_FOUND, "No User Found");
                }
            })
            .catch((e) => {
                serverResponses.sendError(res, messages.BAD_REQUEST, e);
            });
    });

    //it's a prefix before api it is useful when you have many modules and you want to
    //differentiate b/w each module you can use this technique
    app.use("/api", router);
};
module.exports = loginRoutes;
