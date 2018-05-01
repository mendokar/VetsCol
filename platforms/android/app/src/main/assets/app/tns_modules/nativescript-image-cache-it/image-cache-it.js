"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("./image-cache-it.common");
var fs = require("tns-core-modules/file-system");
var utils = require("tns-core-modules/utils/utils");
var view_1 = require("tns-core-modules/ui/core/view");
var image_cache_it_common_1 = require("./image-cache-it.common");
global.moduleMerge(common, exports);
var ImageCacheIt = (function (_super) {
    __extends(ImageCacheIt, _super);
    function ImageCacheIt() {
        return _super.call(this) || this;
    }
    ImageCacheIt.prototype.createNativeView = function () {
        this.picasso = com.squareup.picasso.provider.PicassoProvider.get();
        return new android.widget.ImageView(this._context);
    };
    ImageCacheIt.prototype.initNativeView = function () {
        if (this.imageUri) {
            var image = this.getImage(this.imageUri);
            if (this.imageUri.startsWith('res://')) {
                if (+image > 0) {
                    this.builder = this.picasso.load(image);
                }
            }
            else {
                this.builder = this.picasso.load(image);
            }
        }
        if (this.stretch) {
            this.resetImage();
        }
        this.setPlaceHolder();
        this.setErrorHolder();
        if (this.builder) {
            if (this.resize &&
                this.resize !== undefined &&
                this.resize.split(',').length > 1) {
                this.builder.resize(parseInt(this.resize.split(',')[0], 10), parseInt(this.resize.split(',')[1], 10));
            }
            this.builder.into(this.nativeView);
        }
    };
    ImageCacheIt.prototype.getResourceId = function (res) {
        if (res === void 0) { res = ''; }
        if (res.startsWith('res://')) {
            return utils.ad.resources.getDrawableId(res.replace('res://', ''));
        }
        return 0;
    };
    ImageCacheIt.prototype.setPlaceHolder = function () {
        if (this.placeHolder) {
            var placeholder = this.getResourceId(this.placeHolder);
            if (placeholder > 0) {
                this.builder.placeholder(placeholder);
            }
        }
    };
    ImageCacheIt.prototype.setErrorHolder = function () {
        if (this.errorHolder) {
            var errorholder = this.getResourceId(this.errorHolder);
            if (errorholder > 0) {
                this.builder.error(errorholder);
            }
        }
    };
    Object.defineProperty(ImageCacheIt.prototype, "borderRadius", {
        set: function (value) {
            this.style.borderRadius = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderWidth", {
        set: function (value) {
            this.style.borderWidth = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderLeftWidth", {
        set: function (value) {
            this.style.borderLeftWidth = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderRightWidth", {
        set: function (value) {
            this.style.borderRightWidth = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderBottomWidth", {
        set: function (value) {
            this.style.borderBottomWidth = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderTopWidth", {
        set: function (value) {
            this.style.borderTopWidth = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderBottomLeftRadius", {
        set: function (value) {
            this.style.borderBottomLeftRadius = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderBottomRightRadius", {
        set: function (value) {
            this.style.borderBottomRightRadius = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderTopLeftRadius", {
        set: function (value) {
            this.style.borderTopLeftRadius = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCacheIt.prototype, "borderTopRightRadius", {
        set: function (value) {
            this.style.borderTopRightRadius = value;
            this.setBorderAndRadius();
        },
        enumerable: true,
        configurable: true
    });
    ImageCacheIt.prototype[common.imageUriProperty.getDefault] = function () {
        return undefined;
    };
    ImageCacheIt.prototype[common.imageUriProperty.setNative] = function (src) {
        if (!this.builder) {
            var image = this.getImage(src);
            if (this.imageUri.startsWith('res://')) {
                if (+image > 0) {
                    this.builder = this.picasso.load(image);
                }
            }
            else {
                this.builder = this.picasso.load(image);
            }
        }
        if (this.stretch) {
            this.resetImage();
        }
        this.setPlaceHolder();
        this.setErrorHolder();
        this.setBorderAndRadius();
        this.builder.into(this.nativeView);
        return src;
    };
    ImageCacheIt.prototype[common.resizeProperty.setNative] = function (resize) {
        if (!this.builder) {
            return resize;
        }
        if (resize && resize !== undefined && resize.split(',').length > 1) {
            this.builder.resize(parseInt(resize.split(',')[0], 10), parseInt(resize.split(',')[1], 10));
        }
        return resize;
    };
    ImageCacheIt.prototype.getImage = function (src) {
        var nativeImage;
        if (src.substr(0, 1) === '/') {
            nativeImage = new java.io.File(src);
        }
        else if (src.startsWith('~/')) {
            nativeImage = new java.io.File(fs.path.join(fs.knownFolders.currentApp().path, src.replace('~/', '')));
        }
        else if (src.startsWith('http')) {
            nativeImage = src;
        }
        else if (src.startsWith('res://')) {
            nativeImage = utils.ad.resources.getDrawableId(src.replace('res://', ''));
        }
        return nativeImage;
    };
    ImageCacheIt.prototype[common.stretchProperty.getDefault] = function () {
        return 'aspectFit';
    };
    ImageCacheIt.prototype[common.stretchProperty.setNative] = function (value) {
        if (!this.builder)
            return value;
        this.resetImage(true);
        return value;
    };
    ImageCacheIt.prototype.clearItem = function () { };
    ImageCacheIt.prototype.setBorderAndRadius = function () {
        if (!this.builder)
            return;
        var RoundedCornersTransformation = jp.wasabeef.picasso.transformations.RoundedCornersTransformation;
        this.builder = this.builder
            .transform(new RoundedCornersTransformation(view_1.layout.toDevicePixels(this.style.borderTopLeftRadius), view_1.layout.toDevicePixels(this.style.borderTopWidth), RoundedCornersTransformation.CornerType.TOP_LEFT))
            .transform(new RoundedCornersTransformation(view_1.layout.toDevicePixels(this.style.borderTopRightRadius), view_1.layout.toDevicePixels(this.style.borderTopWidth), RoundedCornersTransformation.CornerType.TOP_RIGHT))
            .transform(new RoundedCornersTransformation(view_1.layout.toDevicePixels(this.style.borderBottomLeftRadius), view_1.layout.toDevicePixels(this.style.borderBottomWidth), RoundedCornersTransformation.CornerType.BOTTOM_LEFT))
            .transform(new RoundedCornersTransformation(view_1.layout.toDevicePixels(this.style.borderBottomRightRadius), view_1.layout.toDevicePixels(this.style.borderBottomWidth), RoundedCornersTransformation.CornerType.BOTTOM_RIGHT));
    };
    ImageCacheIt.prototype.setAspectResize = function () {
        var newSize;
        if (this.resize &&
            this.resize !== undefined &&
            this.resize.split(',').length > 1) {
            newSize = {
                width: parseInt(this.resize.split(',')[0], 10),
                height: parseInt(this.resize.split(',')[1], 10)
            };
        }
        else if (this.width || this.height) {
            newSize = {
                width: parseInt(this.width.toString(), 10),
                height: parseInt(this.height.toString(), 10)
            };
        }
        else {
            newSize = {
                width: this.parent.effectiveWidth,
                height: this.parent.effectiveHeight
            };
        }
        this.builder.resize(newSize.width, newSize.height);
    };
    ImageCacheIt.prototype.resetImage = function (reload) {
        if (reload === void 0) { reload = false; }
        if (!this.builder)
            return;
        switch (this.stretch) {
            case 'aspectFit':
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                this.setAspectResize();
                this.builder.centerInside();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
            case 'aspectFill':
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                this.setAspectResize();
                this.builder.centerCrop();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
            case 'fill':
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                this.builder.fit();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
            case 'none':
            default:
                this.builder = this.picasso.load(this.getImage(this.imageUri));
                this.setBorderAndRadius();
                if (reload) {
                    this.builder.into(this.nativeView);
                }
                break;
        }
    };
    return ImageCacheIt;
}(image_cache_it_common_1.ImageCacheItBase));
exports.ImageCacheIt = ImageCacheIt;
//# sourceMappingURL=image-cache-it.js.map