"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var feedback_common_1 = require("./feedback.common");
var application = require("tns-core-modules/application");
var utils = require("tns-core-modules/utils/utils");
var color_1 = require("tns-core-modules/color");
exports.FeedbackPosition = feedback_common_1.FeedbackPosition;
exports.FeedbackType = feedback_common_1.FeedbackType;
var Feedback = (function (_super) {
    __extends(Feedback, _super);
    function Feedback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastAlert = null;
        return _this;
    }
    Feedback.prototype.show = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.lastAlert = null;
            var alerter = com.tapadoo.alerter.Alerter.create(application.android.foregroundActivity)
                .setTitle(options.title)
                .setText(options.message)
                .setDuration(options.duration ? options.duration : 4000);
            if (options.icon) {
                var resourceId = Feedback.getIconResourceId(options.icon);
                if (resourceId === 0) {
                    console.log("icon '" + options.icon + "' resource not found");
                }
                else {
                    alerter.setIcon(resourceId);
                }
            }
            else {
                var resourcename = Feedback.getIconName(options.type);
                if (resourcename !== null) {
                    alerter.setIcon(Feedback.getIconResourceId(resourcename));
                }
                else {
                    alerter.showIcon(false);
                }
            }
            alerter.setOnClickListener(new android.view.View.OnClickListener({
                onClick: (function (view) {
                    _this.lastAlert.hide();
                    if (options.onTap) {
                        options.onTap();
                    }
                })
            }));
            _this.lastAlert = alerter.show();
            if (options.backgroundColor) {
                _this.lastAlert.setAlertBackgroundColor(options.backgroundColor.android);
            }
            else {
                _this.lastAlert.setAlertBackgroundColor(Feedback.getBackgroundColor(options.type).android);
            }
            if (options.titleColor) {
                var titleView = _this.lastAlert.getTitle();
                titleView.setTextColor(options.titleColor.android);
            }
            if (options.messageColor) {
                var messageView = _this.lastAlert.getText();
                messageView.setTextColor(options.messageColor.android);
            }
            if (options.android && options.android.iconColor) {
                var iconView = _this.lastAlert.getIcon();
                iconView.setColorFilter(options.android.iconColor.android);
            }
            resolve();
        });
    };
    Feedback.getBackgroundColor = function (type) {
        if (type === undefined || type === null || type === feedback_common_1.FeedbackType.Custom) {
            return new color_1.Color("#73b7e8");
        }
        else if (type === feedback_common_1.FeedbackType.Warning) {
            return new color_1.Color("#f18b34");
        }
        else if (type === feedback_common_1.FeedbackType.Error) {
            return new color_1.Color("#ee664c");
        }
        else if (type === feedback_common_1.FeedbackType.Info) {
            return new color_1.Color("#516a78");
        }
        else {
            return new color_1.Color("#51ae8c");
        }
    };
    Feedback.getIconResourceId = function (resourcename) {
        var res = utils.ad.getApplicationContext().getResources();
        return res.getIdentifier(resourcename, "drawable", utils.ad.getApplication().getPackageName());
    };
    Feedback.getIconName = function (type) {
        if (type === undefined || type === null || type === feedback_common_1.FeedbackType.Custom) {
            return null;
        }
        else if (type === feedback_common_1.FeedbackType.Warning) {
            return "warningicon";
        }
        else if (type === feedback_common_1.FeedbackType.Error) {
            return "erroricon";
        }
        else if (type === feedback_common_1.FeedbackType.Info) {
            return "infoicon";
        }
        else {
            return "successicon";
        }
    };
    Feedback.prototype.hide = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.lastAlert !== null) {
                _this.lastAlert.hide();
                _this.lastAlert = null;
            }
        });
    };
    return Feedback;
}(feedback_common_1.FeedbackCommon));
exports.Feedback = Feedback;
