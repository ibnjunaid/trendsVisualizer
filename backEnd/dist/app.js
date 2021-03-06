"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
axios_1["default"].defaults.headers.common['Authorization'] = "Bearer AAAAAAAAAAAAAAAAAAAAABmeBQEAAAAAmzrYEOjmTefDQ342sQtNLO2eWkI%3DnLjh6by8TpUF6Jx492oP7220NedIGMFlwXno2NRVnIsT1908FL";
var Trend_Model_1 = require("./Trend.Model");
var mongoose = require("mongoose");
var uri = "mongodb+srv://osama:Osamah786@cluster0-ozijn.mongodb.net/TwitterVisualTool?retryWrites=true&w=majority";
var connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
function start() {
    connection.then(function (db) {
        getTrends().then(function (data) {
            if (!data) {
                throw "No data returned";
            }
            else {
                var trendData = new Trend_Model_1.trendModel({
                    trends: data.trends,
                    as_of: data.as_of,
                    created_at: data.created_at,
                    locations: data.locations
                });
                trendData.save()
                    .then(function (msg) {
                    console.log(msg.id);
                })["catch"](function (err) {
                    console.log(err);
                });
            }
        });
    });
}
function getTrends() {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get('https://api.twitter.com/1.1/trends/place.json?id=1')];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, parseTrends(response.data)];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function parseTrends(data) {
    var twitterResponse = {
        trends: data[0].trends,
        as_of: data[0].as_of,
        created_at: data[0].created_at,
        locations: data[0].locations
    };
    return twitterResponse;
}
var millisec = 2000; //600000;
var intervalTimer = setInterval(start, millisec);
