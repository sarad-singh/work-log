"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config/config");
var app = express_1.default();
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index');
});
app.listen(config_1.config.port, function () {
    console.log("App started on port: " + config_1.config.port);
});
