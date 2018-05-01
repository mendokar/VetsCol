"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedbackPosition;
(function (FeedbackPosition) {
    FeedbackPosition[FeedbackPosition["Top"] = 0] = "Top";
    FeedbackPosition[FeedbackPosition["Bottom"] = 1] = "Bottom";
})(FeedbackPosition = exports.FeedbackPosition || (exports.FeedbackPosition = {}));
var FeedbackType;
(function (FeedbackType) {
    FeedbackType[FeedbackType["Success"] = 0] = "Success";
    FeedbackType[FeedbackType["Error"] = 1] = "Error";
    FeedbackType[FeedbackType["Warning"] = 2] = "Warning";
    FeedbackType[FeedbackType["Info"] = 3] = "Info";
    FeedbackType[FeedbackType["Custom"] = 4] = "Custom";
})(FeedbackType = exports.FeedbackType || (exports.FeedbackType = {}));
var FeedbackCommon = (function () {
    function FeedbackCommon() {
    }
    FeedbackCommon.prototype.success = function (options) {
        options.type = FeedbackType.Success;
        return this.show(options);
    };
    FeedbackCommon.prototype.warning = function (options) {
        options.type = FeedbackType.Warning;
        return this.show(options);
    };
    FeedbackCommon.prototype.error = function (options) {
        options.type = FeedbackType.Error;
        return this.show(options);
    };
    FeedbackCommon.prototype.info = function (options) {
        options.type = FeedbackType.Info;
        return this.show(options);
    };
    return FeedbackCommon;
}());
exports.FeedbackCommon = FeedbackCommon;
