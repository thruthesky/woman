webpackJsonp([1,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__define__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_progress__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "File", function() { return File; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var File = (function (_super) {
    __extends(File, _super);
    function File(http, progress) {
        var _this = _super.call(this, http, 'file') || this;
        _this.progress = progress;
        _this.percentage = 0;
        return _this;
    }
    File.prototype.upload = function (req, file, callback) {
        var _this = this;
        if (file === void 0 || file.name === void 0) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].throw(__WEBPACK_IMPORTED_MODULE_3__define__["f" /* RES_ERROR_NO_FILE_SELECTED */]);
        }
        var session_id = this.getSessionId();
        var formData = new FormData();
        formData.append('userfile', file, file.name);
        formData.append('route', 'upload');
        if (session_id)
            formData.append('session_id', session_id);
        if (req['model'])
            formData.append('model', req.model);
        if (req['model_idx'])
            formData.append('model_idx', req.model_idx);
        if (req['code'])
            formData.append('code', req.code);
        if (req['unique'])
            formData.append('unique', req.unique);
        if (req['finish'])
            formData.append('finish', req.finish);
        console.log(file);
        console.log(formData);
        var o = this.http.post(this.backendUrl(), formData);
        var subscription = this.progress.uploadProgress.subscribe(function (res) {
            // console.log("progress: ", res);
            // console.log('total::', res.total, 'Loaded::', res.loaded);
            _this.percentage = Math.round(res.loaded / res.total * 100);
            // console.log('this.percentage::',this.percentage);
            // console.log(subscription);
            if (callback)
                callback(_this.percentage);
            if (_this.percentage == 100)
                subscription.unsubscribe();
        });
        return this.processQuery(o);
    };
    File.prototype.url = function (idx) {
        return this.fileUrl(idx);
    };
    File.prototype.src = function (option) {
        var url = this.url(option.idx);
        if (option['width'])
            url += 'width=' + option.width;
        if (option['height'])
            url += 'height=' + option.height;
        if (option['quality'])
            url += 'quality=' + option.quality;
        if (option['resize'])
            url += 'resize=' + option.resize;
        console.log('file.src() returns: ', url);
        return url;
    };
    //// User Primary Photo Upload
    File.prototype.uploadAnonymousPrimaryPhoto = function (file, callback) {
        var req = {
            model: 'user',
            code: 'primary_photo'
        };
        return this.upload(req, file, callback);
    };
    File.prototype.uploadUserPrimaryPhoto = function (file, callback) {
        var req = {
            model: 'user',
            model_idx: this.info.idx,
            code: 'primary_photo',
            unique: 'Y',
            finish: 'Y'
        };
        console.log("uploadUserPrimaryPhoto : ", req);
        return this.upload(req, file, callback);
    };
    File.prototype.uploadPrimaryPhoto = function (file, callback) {
        console.log("uploadPrimaryPhoto: ");
        if (this.logged)
            return this.uploadUserPrimaryPhoto(file, callback);
        else
            return this.uploadAnonymousPrimaryPhoto(file, callback);
    };
    /**
     *
     * File upload for post
     *
     *
     * @param file
     * @param callback
     *
     * @code
  
      onChangeFile( _ ) {
          this.file.uploadPostFile( _.files[0], percentage => {
              console.log('percentage:', percentage);
          } ).subscribe( (res:_UPLOAD_RESPONSE) => {
              this.files.push( res.data );
              console.log('files: ', this.files);
          }, err => {
              console.log('err:', err);
              if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
              this.file.alert(err);
          });
      }
  
     * @endcode
     *
     */
    File.prototype.uploadPostFile = function (file, callback) {
        var req = {
            model: 'post_data',
            code: ''
        };
        return this.upload(req, file, callback);
    };
    return File;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
File = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_progress__["a" /* ProgressService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_progress__["a" /* ProgressService */]) === "function" && _b || Object])
], File);

var _a, _b;
//# sourceMappingURL=file.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Meta", function() { return Meta; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Meta = (function (_super) {
    __extends(Meta, _super);
    function Meta(http) {
        return _super.call(this, http, 'meta') || this;
    }
    return Meta;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
Meta = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], Meta);

var _a;
//# sourceMappingURL=meta.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostComment", function() { return PostComment; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostComment = (function (_super) {
    __extends(PostComment, _super);
    function PostComment(http) {
        return _super.call(this, http, 'post_comment') || this;
    }
    PostComment.prototype.create = function (req) {
        req['route'] = this.taxonomy + '.create';
        return this.post(req);
    };
    return PostComment;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
PostComment = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], PostComment);

var _a;
//# sourceMappingURL=post-comment.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostConfig", function() { return PostConfig; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostConfig = (function (_super) {
    __extends(PostConfig, _super);
    function PostConfig(http) {
        return _super.call(this, http, 'post_config') || this;
    }
    return PostConfig;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
PostConfig = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], PostConfig);

var _a;
//# sourceMappingURL=post-config.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostData", function() { return PostData; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostData = (function (_super) {
    __extends(PostData, _super);
    function PostData(http) {
        return _super.call(this, http, 'post_data') || this;
    }
    return PostData;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
PostData = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], PostData);

var _a;
//# sourceMappingURL=post-data.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pagination_pagination_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_post_form_basic_post_form_basic_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_post_view_basic_post_view_basic_component__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_comment_form_basic_comment_form_basic_component__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_comment_view_basic_comment_view_basic_component__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_form_basic_register_form_basic_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_form_basic_login_form_basic_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_password_change_form_basic_password_change_form_basic_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_file_form_basic_file_form_basic_component__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngularBackendComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AngularBackendComponentModule = (function () {
    function AngularBackendComponentModule() {
    }
    return AngularBackendComponentModule;
}());
AngularBackendComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__components_pagination_pagination_component__["a" /* PageNavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_post_form_basic_post_form_basic_component__["a" /* PostFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_post_view_basic_post_view_basic_component__["a" /* PostViewBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_comment_form_basic_comment_form_basic_component__["a" /* CommentFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_comment_view_basic_comment_view_basic_component__["a" /* CommentViewBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_register_form_basic_register_form_basic_component__["a" /* RegisterFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_login_form_basic_login_form_basic_component__["a" /* LoginFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_file_form_basic_file_form_basic_component__["a" /* FileFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_password_change_form_basic_password_change_form_basic_component__["a" /* PaswordChangeFormBasicComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__components_pagination_pagination_component__["a" /* PageNavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_4__components_post_form_basic_post_form_basic_component__["a" /* PostFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_post_view_basic_post_view_basic_component__["a" /* PostViewBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_comment_form_basic_comment_form_basic_component__["a" /* CommentFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_comment_view_basic_comment_view_basic_component__["a" /* CommentViewBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_register_form_basic_register_form_basic_component__["a" /* RegisterFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_login_form_basic_login_form_basic_component__["a" /* LoginFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_file_form_basic_file_form_basic_component__["a" /* FileFormBasicComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_password_change_form_basic_password_change_form_basic_component__["a" /* PaswordChangeFormBasicComponent */]
        ]
    })
], AngularBackendComponentModule);

//# sourceMappingURL=angular-backend-components.module.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendAdminForumCategoryPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BackendAdminForumCategoryPage = (function () {
    function BackendAdminForumCategoryPage(admin, route, _category) {
        var _this = this;
        this.admin = admin;
        this.route = route;
        this._category = _category;
        this.searchCategoryForm = {};
        this.categories = [];
        this.categoryCreate = {};
        this.pageOption = {
            limitPerPage: 5,
            currentPage: 3,
            limitPerNavigation: 4,
            totalRecord: 0
        };
        this.searchQuery = {
            limit: this.pageOption['limitPerPage']
        };
        this.searchConfigChangeDebounce = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        console.log('category::');
        admin.onClickMenuMore();
        //
        // this.searchQuery = {
        //   //select: 'idx, title, created',
        //   order: 'idx DESC',
        //   //extra: { file: false, meta: true, post_config_id: 'qna' }
        // };
        //
        // this.searchQuery['order'] = 'idx DESC';
        //
        this.loadCategory();
        this.searchConfigChangeDebounce
            .debounceTime(300) // wait 300ms after the last event before emitting last event
            .subscribe(function () { return _this.onChangedCategorySearch(); });
    }
    BackendAdminForumCategoryPage.prototype.onConfigPageClick = function ($event) {
        console.log('onPageClick::$event', $event);
        this.pageOption['currentPage'] = $event;
        this.loadCategory();
    };
    BackendAdminForumCategoryPage.prototype.onClickCreateCategory = function () {
        var _this = this;
        this._category.create(this.categoryCreate).subscribe(function (res) {
            console.log(res);
        }, function (err) { return _this._category.alert(err); });
    };
    BackendAdminForumCategoryPage.prototype.onChangeConfigSearch = function () {
        this.searchConfigChangeDebounce.next();
    };
    BackendAdminForumCategoryPage.prototype.onChangedCategorySearch = function () {
        //console.log('onChangeSearch', this.searchCategoryForm);
        if (this.searchCategoryForm.id) {
            if (this.searchCategoryForm.id.length < 2)
                return;
        }
        if (this.searchCategoryForm.name) {
            if (this.searchCategoryForm.name.length < 2)
                return;
        }
        if (this.searchCategoryForm.description) {
            if (this.searchCategoryForm.description.length < 2)
                return;
        }
        var cond = '';
        var bind = '';
        if (this.searchCategoryForm.id)
            cond += "id LIKE ? ";
        if (this.searchCategoryForm.id)
            bind += "%" + this.searchCategoryForm.id + "%";
        if (this.searchCategoryForm.name)
            cond += cond ? "AND name LIKE ? " : "name LIKE ?";
        if (this.searchCategoryForm.name)
            bind += bind ? ",%" + this.searchCategoryForm.name + "%" : "%" + this.searchCategoryForm.name + "%";
        if (this.searchCategoryForm.description)
            cond += cond ? "AND description LIKE ? " : "description LIKE ? ";
        if (this.searchCategoryForm.description)
            bind += bind ? ",%" + this.searchCategoryForm.description + "%" : "%" + this.searchCategoryForm.description + "%";
        this.searchQuery.where = cond;
        this.searchQuery.bind = bind;
        this.searchQuery.order = 'idx DESC';
        this.pageOption.currentPage = 1;
        this.loadCategory();
    };
    BackendAdminForumCategoryPage.prototype.loadCategory = function () {
        var _this = this;
        console.log('loadCategory::');
        this.categories = [];
        this.searchQuery.page = this.pageOption.currentPage;
        this._category.list().subscribe(function (res) {
            console.log('_category::list', res);
            _this.categories = res.data.configs;
            _this.pageOption.totalRecord = parseInt(res.data.total);
            _this.categories.map(function (category) {
                category.created = (new Date(parseInt(category.created) * 1000)).toString();
            });
        }, function (err) { return _this._category.alert(err); });
    };
    BackendAdminForumCategoryPage.prototype.onClickConfigEdit = function (category) {
        var _this = this;
        console.log(category);
        var edit = {
            id: category.id,
            model: category.model,
            model_idx: category.model_idx,
            name: category.name,
            description: category.description,
            parent_idx: category.parent_idx
        };
        this._category.edit(edit).subscribe(function (res) {
            console.log("edit response::", res);
        }, function (err) { return _this._category.alert(err); });
    };
    BackendAdminForumCategoryPage.prototype.onClickConfigDelete = function (id) {
        var _this = this;
        console.log(id);
        this._category.delete(id).subscribe(function (res) {
            console.log("delete response: ", res);
            _this.categories = _this.categories.filter(function (category) { return category.id != id; });
        }, function (err) { return _this._category.alert(err); });
    };
    return BackendAdminForumCategoryPage;
}());
BackendAdminForumCategoryPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'backend-admin-forum-category-page',
        template: __webpack_require__(278),
        styles: [__webpack_require__(254)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["Category"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["Category"]) === "function" && _c || Object])
], BackendAdminForumCategoryPage);

var _a, _b, _c;
//# sourceMappingURL=category.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendAdminForumConfigPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BackendAdminForumConfigPage = (function () {
    function BackendAdminForumConfigPage(admin, postData, postConfig) {
        var _this = this;
        this.admin = admin;
        this.postData = postData;
        this.postConfig = postConfig;
        this.config_idx = null;
        this.searchPostForm = {};
        this.posts = [];
        this.searchConfigForm = {};
        this.postConfigs = [];
        this.configCreate = {};
        this.pageOption = {
            limitPerPage: 5,
            currentPage: 1,
            limitPerNavigation: 4,
            totalRecord: 0
        };
        this.searchQuery = {
            limit: this.pageOption['limitPerPage']
        };
        this.searchConfigChangeDebounce = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.searchPostChangeDebounce = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        admin.onClickMenuMore();
        this.searchQuery['order'] = 'idx DESC';
        this.loadPostConfig();
        this.searchConfigChangeDebounce
            .debounceTime(300) // wait 300ms after the last event before emitting last event
            .subscribe(function () { return _this.onChangedConfigSearch(); });
    }
    BackendAdminForumConfigPage.prototype.onConfigPageClick = function ($event) {
        //console.log('onPageClick::$event',$event);
        this.pageOption['currentPage'] = $event;
        this.loadPostConfig();
    };
    BackendAdminForumConfigPage.prototype.onClickCreateForum = function () {
        var _this = this;
        this.postConfig.create(this.configCreate).subscribe(function (res) {
            console.log(res);
        }, function (err) { return _this.postConfig.alert(err); });
    };
    BackendAdminForumConfigPage.prototype.onChangeConfigSearch = function () {
        this.searchConfigChangeDebounce.next();
    };
    BackendAdminForumConfigPage.prototype.onChangedConfigSearch = function () {
        //console.log('onChangeSearch', this.searchConfigForm);
        if (this.searchConfigForm.id) {
            if (this.searchConfigForm.id.length < 2)
                return;
        }
        if (this.searchConfigForm.name) {
            if (this.searchConfigForm.name.length < 2)
                return;
        }
        if (this.searchConfigForm.description) {
            if (this.searchConfigForm.description.length < 2)
                return;
        }
        var cond = '';
        var bind = '';
        if (this.searchConfigForm.id)
            cond += "id LIKE ? ";
        if (this.searchConfigForm.id)
            bind += "%" + this.searchConfigForm.id + "%";
        if (this.searchConfigForm.name)
            cond += cond ? "AND name LIKE ? " : "name LIKE ?";
        if (this.searchConfigForm.name)
            bind += bind ? ",%" + this.searchConfigForm.name + "%" : "%" + this.searchConfigForm.name + "%";
        if (this.searchConfigForm.description)
            cond += cond ? "AND description LIKE ? " : "description LIKE ? ";
        if (this.searchConfigForm.description)
            bind += bind ? ",%" + this.searchConfigForm.description + "%" : "%" + this.searchConfigForm.description + "%";
        this.searchQuery.where = cond;
        this.searchQuery.bind = bind;
        this.searchQuery.order = 'idx DESC';
        this.pageOption.currentPage = 1;
        this.loadPostConfig();
    };
    BackendAdminForumConfigPage.prototype.loadPostConfig = function () {
        var _this = this;
        this.postConfigs = [];
        this.searchQuery.page = this.pageOption.currentPage;
        this.postConfig.list(this.searchQuery).subscribe(function (res) {
            console.log(res);
            _this.postConfigs = res.data.configs;
            _this.pageOption.totalRecord = parseInt(res.data.total);
            _this.postConfigs.map(function (config) {
                config.created = (new Date(parseInt(config.created) * 1000)).toString();
            });
        }, function (err) { return _this.postData.alert(err); });
    };
    BackendAdminForumConfigPage.prototype.onClickConfigEdit = function (config) {
        var _this = this;
        console.log(config);
        var edit = {
            id: config.id,
            name: config.name,
            description: config.description,
            moderators: config.moderators,
            level_list: config.level_list,
            level_view: config.level_view,
            level_write: config.level_write,
            level_comment: config.level_comment
        };
        this.postConfig.edit(edit).subscribe(function (res) {
            console.log("edit response::", res);
        }, function (err) { return _this.postConfig.alert(err); });
    };
    BackendAdminForumConfigPage.prototype.onClickConfigDelete = function (id) {
        var _this = this;
        console.log(id);
        this.postConfig.delete(id).subscribe(function (res) {
            console.log("delete response: ", res);
            _this.postConfigs = _this.postConfigs.filter(function (config) { return config.id != id; });
        }, function (err) { return _this.postConfig.alert(err); });
    };
    return BackendAdminForumConfigPage;
}());
BackendAdminForumConfigPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'backend-admin-forum-config-page',
        template: __webpack_require__(279),
        styles: [__webpack_require__(255)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostConfig"]) === "function" && _c || Object])
], BackendAdminForumConfigPage);

var _a, _b, _c;
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendAdminForumPostPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';





var BackendAdminForumPostPage = (function () {
    function BackendAdminForumPostPage(admin, postData, file, postConfig, route) {
        var _this = this;
        this.admin = admin;
        this.postData = postData;
        this.file = file;
        this.postConfig = postConfig;
        this.route = route;
        this.post_config_id = '';
        this.postConfigs = [];
        this.searchPostForm = {};
        this.postCreate = {};
        this.posts = [];
        this.pageOption = {
            limitPerPage: 5,
            currentPage: 1,
            limitPerNavigation: 4,
            totalRecord: 0
        };
        this.searchQuery = {
            limit: this.pageOption['limitPerPage'],
            extra: { file: true }
        };
        this.photoIdxes = [];
        this.searchPostChangeDebounce = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        //
        this.showPostForm = false;
        this.postPostForm = {};
        admin.onClickMenuMore();
        //
        // this.searchQuery = {
        //   //select: 'idx, title, created',
        //   order: 'idx DESC',
        //   //extra: { file: false, meta: true, post_config_id: 'qna' }
        // };
        this.searchQuery['order'] = 'idx DESC';
        //
        // this.config_idx = this.route.snapshot.params['idx'];
        // if( this.config_idx ){
        //   console.log(this.config_idx);
        //   this.loadPostData( this.config_idx );
        // }
        route.params.subscribe(function (params) {
            if (params['post_config_id'] !== void 0) {
                _this.post_config_id = params['post_config_id'];
            }
        });
        this.postConfig.list({ limit: 20 }).subscribe(function (res) {
            console.log('postConfig.list::', res);
            _this.postConfigs = res.data.configs;
        });
        this.loadPostData();
        this.searchPostChangeDebounce
            .debounceTime(300) // wait 300ms after the last event before emitting last event
            .subscribe(function () { return _this.onChangedPostSearch(); });
    }
    BackendAdminForumPostPage.prototype.onPostPageClick = function ($event) {
        //console.log('onPageClick::$event',$event);
        this.pageOption['currentPage'] = $event;
        this.loadPostData();
    };
    BackendAdminForumPostPage.prototype.onClickCreatePost = function () {
        var _this = this;
        this.postCreate.file_hooks = this.photoIdxes;
        this.postData.create(this.postCreate).subscribe(function (res) {
            console.log(res);
        }, function (err) { return _this.postData.alert(err); });
    };
    BackendAdminForumPostPage.prototype.onChangePostSearch = function () {
        this.searchPostChangeDebounce.next();
    };
    BackendAdminForumPostPage.prototype.onChangedPostSearch = function () {
        //console.log('onChangeSearch', this.searchPostForm);
        if (this.searchPostForm.title) {
            if (this.searchPostForm.title.length < 2)
                return;
        }
        if (this.searchPostForm.content) {
            if (this.searchPostForm.content.length < 2)
                return;
        }
        var cond = '';
        var bind = '';
        if (this.searchPostForm.title)
            cond += "title LIKE ? ";
        if (this.searchPostForm.title)
            bind += "%" + this.searchPostForm.title + "%";
        if (this.searchPostForm.content)
            cond += cond ? "AND content LIKE ? " : "content LIKE ?";
        if (this.searchPostForm.content)
            bind += bind ? ",%" + this.searchPostForm.content + "%" : "%" + this.searchPostForm.content + "%";
        this.searchQuery.where = cond;
        this.searchQuery.bind = bind;
        this.searchQuery.order = 'idx DESC';
        this.pageOption.currentPage = 1;
        this.loadPostData();
    };
    BackendAdminForumPostPage.prototype.loadPostData = function () {
        var _this = this;
        this.posts = [];
        this.searchQuery.page = this.pageOption.currentPage;
        this.searchQuery.extra['post_config_id'] = this.post_config_id ? this.post_config_id : null;
        this.postData.list(this.searchQuery).subscribe(function (res) {
            console.log('this.postData.list::', res);
            _this.posts = res.data.posts;
            _this.pageOption.totalRecord = parseInt(res.data.total);
            _this.posts.map(function (post) {
                post.created = (new Date(parseInt(post.created) * 1000)).toString();
            });
        }, function (err) { return _this.postData.alert(err); });
    };
    BackendAdminForumPostPage.prototype.reloadPosts = function () {
        this.searchPostForm = {};
        this.onChangedPostSearch();
        //this.loadPostData();
    };
    BackendAdminForumPostPage.prototype.onClickPostEdit = function (_post) {
        var _this = this;
        if (_post.deleted == '1')
            return;
        console.log(_post);
        var edit = {
            idx: _post.idx,
            title: _post.title,
            content: _post.content
        };
        this.postData.edit(edit).subscribe(function (res) {
            console.log("edit response::", res);
        }, function (err) { return _this.postData.alert(err); });
    };
    BackendAdminForumPostPage.prototype.onClickPostDelete = function (_post) {
        var _this = this;
        if (_post.deleted == '1')
            return;
        console.log(_post.idx);
        this.postData.delete(parseInt(_post.idx)).subscribe(function (res) {
            console.log("delete response: ", res);
            _post.deleted = '1';
            //this.posts = this.posts.filter( ( post: POST ) => post.idx != _post.idx );
        }, function (err) { return _this.postData.alert(err); });
    };
    BackendAdminForumPostPage.prototype.onChangeFile = function (fileInput) {
        var _this = this;
        console.log("file changed: ", fileInput);
        var file = fileInput.files[0];
        var req = {};
        this.file.upload(req, file).subscribe(function (res) {
            console.log("file upload", res);
            _this.photoIdxes.push(res.data.idx);
        }, function (err) {
            console.log('error', err);
        });
    };
    BackendAdminForumPostPage.prototype.onClickShowPostDetail = function (idx) {
        var _this = this;
        console.log('onClickShowPostDetail::idx', idx);
        var query = {
            where: "idx = ?",
            bind: idx,
            extra: { file: true }
        };
        this.postData.list(query).subscribe(function (res) {
            console.log('onClickShowPostDetail::', res);
            _this.showPostDetail(res.data.posts[0]);
        }, function (err) { return _this.postData.alert(err); });
    };
    BackendAdminForumPostPage.prototype.showPostDetail = function (post) {
        var modalOption = {};
        //if ( option.class ) modalOption['windowClass'] = option.class;
        modalOption['windowClass'] = 'post-modal-view';
        // @attention (commented-out by JaeHo) - Do not make the code depending on 3rd party.
        // let modalRef = this.modal.open ( PostEditModalComponent, modalOption );
        // modalRef.componentInstance['post'] = post;
        // modalRef.result.then((result) => {
        //   console.info( `Closed with: ${result}` );
        // }, (reason) => {
        //   console.info( "dismissed", reason );
        // });
    };
    return BackendAdminForumPostPage;
}());
BackendAdminForumPostPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'backend-admin-forum-post-page',
        template: __webpack_require__(280),
        styles: [__webpack_require__(256)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["File"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["File"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostConfig"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */]) === "function" && _e || Object])
], BackendAdminForumPostPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=post.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendAdminPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BackendAdminPage = (function () {
    function BackendAdminPage(admin, user, router) {
        var _this = this;
        this.admin = admin;
        this.user = user;
        this.router = router;
        if (user.logged && user.info.id == 'admin') {
            console.log(user.info);
            this.user.data().subscribe(function (res) {
                console.log(res);
            }, function (err) {
                if (err['code'] == __WEBPACK_IMPORTED_MODULE_2__angular_backend__["ERROR_WRONG_SESSION_ID"]) {
                    _this.user.logout();
                    _this.router.navigateByUrl('/');
                }
                _this.user.alert(err);
            });
        }
        else {
            alert("Please login as admin");
            this.router.navigateByUrl('/');
        }
        admin.onClickMenuMore();
    }
    return BackendAdminPage;
}());
BackendAdminPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'backend-admin-page',
        template: __webpack_require__(281),
        styles: [__webpack_require__(257)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["User"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], BackendAdminPage);

var _a, _b, _c;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendAdminUserEditPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BackendAdminUserEditPage = (function () {
    function BackendAdminUserEditPage(admin, user, route, file) {
        this.admin = admin;
        this.user = user;
        this.route = route;
        this.file = file;
        this.idx = null;
        this.user_data = null;
        this.edit = {};
        this.user_photo_idx = 0;
        this.src_photo = null;
        this.edit_src_photo = null;
        this.percentage = 0;
        admin.onClickMenuMore();
        var id = this.route.snapshot.params['idx'];
        if (id) {
            this.loadData(id);
        }
    }
    BackendAdminUserEditPage.prototype.loadData = function (id) {
        var _this = this;
        this.user.data(id).subscribe(function (res) {
            _this.user_data = res.data.user;
            _this.edit.name = _this.user_data.name;
            _this.edit.email = _this.user_data.email;
            _this.edit.gender = _this.user_data.gender;
            _this.edit.id = _this.user_data.id;
            _this.edit_src_photo = _this.file.src({ idx: _this.user_data.primary_photo.idx });
            /** this.edit = res.data.user; **/
            console.log('onClickLoadData::res', res);
        }, function (err) { return _this.user.alert(err); });
    };
    BackendAdminUserEditPage.prototype.onClickUpdateProfile = function () {
        var _this = this;
        //console.log('onClickUpdateProfile::this.edit', this.edit );
        this.user.edit(this.edit).subscribe(function (res) {
            console.log(res);
        }, function (err) { return _this.user.alert(err); });
    };
    return BackendAdminUserEditPage;
}());
BackendAdminUserEditPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'backend-admin-user-edit',
        template: __webpack_require__(282),
        styles: [__webpack_require__(258)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_backend__["User"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_backend__["File"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_backend__["File"]) === "function" && _d || Object])
], BackendAdminUserEditPage);

var _a, _b, _c, _d;
//# sourceMappingURL=edit.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendAdminUserListPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BackendAdminUserListPage = (function () {
    function BackendAdminUserListPage(admin, user) {
        var _this = this;
        this.admin = admin;
        this.user = user;
        this._id = null;
        this._password = null;
        this.paginationUsers = [];
        this.searchForm = {};
        this.searchQuery = {};
        ///search options /////
        this.limitPerPage = 5;
        this.currentPage = 1;
        this.numberPerNav = 4;
        this.totalRecord = 0;
        this.searchChangeDebounce = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        admin.onClickMenuMore();
        //this.loadNewlyRegisteredUsers();
        this.onChangedSearch();
        this.searchChangeDebounce
            .debounceTime(300) // wait 300ms after the last event before emitting last event
            .subscribe(function () { return _this.onChangedSearch(); });
    }
    BackendAdminUserListPage.prototype.onPageClick = function ($event) {
        //console.log('onPageClick::$event',$event);
        this.currentPage = $event;
        this.loadSearchedData();
    };
    BackendAdminUserListPage.prototype.onChangeSearch = function () {
        this.searchChangeDebounce.next();
    };
    BackendAdminUserListPage.prototype.onChangedSearch = function () {
        //console.log('onChangeSearch', this.searchForm);
        if (this.searchForm.id) {
            if (this.searchForm.id.length < 2)
                return;
        }
        if (this.searchForm.name) {
            if (this.searchForm.name.length < 2)
                return;
        }
        if (this.searchForm.email) {
            if (this.searchForm.email.length < 2)
                return;
        }
        var cond = '';
        var bind = '';
        if (this.searchForm.id)
            cond += "id LIKE ? ";
        if (this.searchForm.id)
            bind += "%" + this.searchForm.id + "%";
        if (this.searchForm.name)
            cond += cond ? "AND ( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? ) " : "( name LIKE ? OR middle_name LIKE ? OR last_name LIKE ? )";
        if (this.searchForm.name)
            bind += bind ? ",%" + this.searchForm.name + "%,%" + this.searchForm.name + "%,%" + this.searchForm.name + "%" : "%" + this.searchForm.name + "%,%" + this.searchForm.name + "%,%" + this.searchForm.name + "%";
        if (this.searchForm.email)
            cond += cond ? "AND email LIKE ? " : "email LIKE ? ";
        if (this.searchForm.email)
            bind += bind ? ",%" + this.searchForm.email + "%" : "%" + this.searchForm.email + "%";
        this.searchQuery.where = cond;
        this.searchQuery.bind = bind;
        this.searchQuery.order = 'idx DESC';
        this.currentPage = 1;
        this.loadSearchedData();
    };
    BackendAdminUserListPage.prototype.loadSearchedData = function () {
        var _this = this;
        this.paginationUsers = [];
        this.searchQuery.from = this.limitPerPage * this.currentPage - this.limitPerPage;
        this.searchQuery.limit = this.limitPerPage;
        this.user.list(this.searchQuery).subscribe(function (res) {
            //console.info( 'loadSearchedData', res );
            _this.paginationUsers = res.data.users;
            _this.totalRecord = parseInt(res.data.total);
        }, function (err) { return _this.user.alert(err); });
    };
    BackendAdminUserListPage.prototype.onClickEdit = function (user) {
        var _this = this;
        console.log(user);
        var edit = { id: user.id, email: user.email };
        this.user.edit(edit).subscribe(function (res) {
            console.log("edit response: ", res);
        }, function (err) { return _this.user.alert(err); });
    };
    BackendAdminUserListPage.prototype.onClickDelete = function (id) {
        var _this = this;
        console.log(id);
        this.user.delete(id).subscribe(function (res) {
            console.log("delete response: ", res);
            _this.paginationUsers = _this.paginationUsers.filter(function (user) { return user.id != id; });
        }, function (err) { return _this.user.alert(err); });
    };
    return BackendAdminUserListPage;
}());
BackendAdminUserListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'backend-admin-user-list',
        template: __webpack_require__(283),
        styles: [__webpack_require__(259)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_admin_service__["a" /* AdminService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_backend__["User"]) === "function" && _b || Object])
], BackendAdminUserListPage);

var _a, _b;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_backend__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_user__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Test; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Forum, CONFIG_CREATE, CONFIG_CREATE_RESPONSE } from './forum';
//import { URL_BACKEND_API } from './config';

var Test = (function () {
    function Test(
        // private forum: Forum,
        backend, user) {
        var _this = this;
        this.backend = backend;
        this.user = user;
        this.count = 0;
        this.form = {};
        this.session_id = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.login_session_id = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.update_session_id = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.my_session_id = null;
        console.info('Test::constructor()');
        setTimeout(function () { return _this.run(); }, 100);
    }
    Test.prototype.run = function () {
        var _this = this;
        this.api();
        this.register();
        this.session_id.subscribe(function (id) { return _this.login(); });
        this.login_session_id.subscribe(function (session_id) { return _this.getUserData(function () { return _this.userUpdate(); }); });
        this.update_session_id.subscribe(function (x) { return _this.logout(); });
        this.getPostList();
        // this.forumCreate( () => this.postCreate() );
    };
    Test.prototype.success = function (str) {
        var vars = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            vars[_i - 1] = arguments[_i];
        }
        this.count++;
        console.info("[" + this.count + "] SUCCESS: " + str, vars);
    };
    Test.prototype.getPostList = function () {
        // this.post.list().subscribe( re => {
        //     this.success("getPostList: " , re);
        // }, err => {
        //     this.error( err, "success getPostList: " );
        // } );
    };
    Test.prototype.api = function () {
        var _this = this;
        this.backend.successCall().subscribe(function (re) {
            _this.success("Version: " + re['data']['version']);
        }, function (err) {
            _this.error(err, "successCall Test: ");
        });
        this.backend.errorCall().subscribe(function (re) {
            _this.error(re, 'This should be an error. But success ' + _this.backend.getErrorString(re));
        }, function (error) {
            _this.success("errorCall() : This is fake error. " + _this.backend.getErrorString(error));
        });
        this.backend.internalServerError().subscribe(function (re) {
            _this.error("This must be 500 internal server error. but success");
        }, function (error) {
            console.log(error);
            if (_this.backend.isInternalServerError(error))
                _this.success("Internal Server Error: " + _this.backend.getErrorString(error));
            else
                _this.error(error, "This must be 500 - internal server error. but it is another error.");
        });
        setTimeout(function () {
            _this.backend.scriptError().subscribe(function (re) {
                console.log(re);
                _this.error(re, "scriptError() - This should be script error. But success.");
            }, function (error) {
                console.log(error);
                _this.success('This should be script error. This is PHP script error.');
            });
        }, 100);
        // this.backend.timeoutError().subscribe( re => {
        //     this.error( re, "This should be timeout error. But success." );
        // }, error => {
        //     if ( error.message == ERROR_TIMEOUT ) {
        //         this.success('This should be timeout error. ' + this.backend.getErrorString( error ));
        //     }
        //     else this.error( error, "This is not timeout error. But another error");
        // });
        // route error
        this.backend.routeMethodError().subscribe(function (re) {
            _this.error(re, "Must be error");
        }, function (error) {
            _this.success("Route Error");
            console.log(error);
        });
        this.backend.routeRequiredError().subscribe(function (re) {
            _this.error(re, "Must be error");
        }, function (error) {
            _this.success("Route required variable error: name is missing.");
            console.log(error);
        });
    };
    Test.prototype.error = function (error, message) {
        if (message === void 0) { message = ''; }
        this.count++;
        console.error("[" + this.count + "] ERROR: " + message + " - " + this.backend.getErrorString(error));
    };
    Test.prototype.register = function () {
        var _this = this;
        var id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
        this.form.id = id;
        this.form.email = id + '@gmail.com';
        this.form.name = id;
        this.form.password = id;
        this.form.mobile = '09174678000';
        this.form.gender = 'M';
        this.user.register(this.form).subscribe(function (res) {
            _this.success("User registration:\n " + res.data.session_id);
            _this.session_id.next(res.data.session_id);
        }, function (error) {
            _this.error(error);
        });
    };
    Test.prototype.login = function () {
        var _this = this;
        var sampleLoginData = {
            id: this.form.id,
            password: this.form.password
        };
        this.user.login(sampleLoginData).subscribe(function (res) {
            _this.success("User Login:\n " + res.data.session_id);
            _this.login_session_id.next(res.data.session_id);
        }, function (error) {
            _this.error(error);
        });
    };
    Test.prototype.getUserData = function (callback) {
        var _this = this;
        this.user.data().subscribe(function (res) {
            _this.success("User Get Data: ");
            console.log(res['data']['user']);
            callback();
        }, function (error) {
            _this.error(error, "getUserData() : error : ");
        });
    };
    Test.prototype.userUpdate = function () {
        var _this = this;
        var record = {};
        this.user.edit(record).subscribe(function (res) {
            _this.success("userUpdate() : ", res);
            _this.update_session_id.next(res.data.session_id);
        }, function (err) {
            _this.error(err, "userUpdate(): ");
        });
    };
    Test.prototype.logout = function () {
        var _this = this;
        this.user.logout().subscribe(function (res) {
            _this.success("logout() : ", res);
        }, function (err) {
            _this.error(err, "logout(): ");
        });
    };
    // forumCreate( callback ) {
    //     //console.log('forumCreate');
    //     let id = 'forum' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
    //     let req: CONFIG_CREATE = {
    //         id: id
    //     };
    //     this.forum.create( req ).subscribe( (res: CONFIG_CREATE_RESPONSE) => {
    //         this.success("Forum create: " + res.data.idx );
    //         callback();
    //     }, error => {
    //         console.error( error );
    //     });
    // }
    Test.prototype.postCreate = function () {
        console.log('postCreate');
    };
    return Test;
}());
Test = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_backend__["Backend"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_backend__["Backend"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__model_user__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__model_user__["User"]) === "function" && _b || Object])
], Test);

var _a, _b;
//# sourceMappingURL=test.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend_angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_backend_config__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_page_scroll__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForumPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForumPage = (function () {
    function ForumPage(activated, pageScroll, postData, router) {
        this.activated = activated;
        this.pageScroll = pageScroll;
        this.postData = postData;
        this.router = router;
        this.post_config_id = null;
        this.lists = [];
        this.postListResponse = null;
        this.showPostForm = false;
        this.inLoading = false;
        this.noMorePosts = false;
        this.page = 0;
    }
    ForumPage.prototype.ngOnInit = function () {
        var _this = this;
        this.activated.params.subscribe(function (params) {
            if (params['post_config_id'] !== void 0) {
                _this.reset();
                _this.post_config_id = params['post_config_id'];
                _this.load();
            }
        });
        this.watch = this.pageScroll.watch('body', 350).subscribe(function (e) { return _this.load(); });
    };
    ForumPage.prototype.ngOnDestroy = function () {
        this.watch.unsubscribe();
    };
    ForumPage.prototype.reset = function () {
        this.lists = [];
        this.page = 0;
        this.inLoading = false;
        this.noMorePosts = false;
    };
    ForumPage.prototype.onLoaded = function (res) {
        this.postListResponse = res;
        console.log('res:', res);
    };
    ForumPage.prototype.load = function () {
        var _this = this;
        console.log("load() is called");
        if (this.inLoading) {
            console.log("but it's still loading previous page. so, just don't do anything");
            return;
        }
        if (this.noMorePosts) {
            console.log("but no more posts. so don't do anything");
            return;
        }
        this.inLoading = true;
        this.page++;
        console.log("loading page: ", this.page);
        var req = {
            where: 'parent_idx=?',
            bind: '0',
            order: 'idx desc',
            page: this.page,
            limit: __WEBPACK_IMPORTED_MODULE_3__angular_backend_config__["c" /* NO_OF_ITEMS_PER_PAGE */],
            extra: {
                post_config_id: this.post_config_id,
                user: true,
                meta: true,
                file: true,
                comment: true
            }
        };
        this.postData.list(req).subscribe(function (res) {
            console.log('post list: ', res);
            _this.inLoading = false;
            _this.lists.push(res);
            if (res.data.posts.length == 0)
                _this.noMorePosts = true;
            else {
            }
        }, function (err) {
            if (err['code'] == -40232)
                _this.router.navigateByUrl('/');
            else
                _this.reset();
        });
    };
    return ForumPage;
}());
ForumPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        template: __webpack_require__(289)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_page_scroll__["a" /* PageScroll */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_page_scroll__["a" /* PageScroll */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend_angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend_angular_backend__["PostData"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object])
], ForumPage);

var _a, _b, _c, _d;
//# sourceMappingURL=forum.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomePage = (function () {
    function HomePage() {
    }
    return HomePage;
}());
HomePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        template: __webpack_require__(290)
    }),
    __metadata("design:paramtypes", [])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginPage = (function () {
    function LoginPage(router) {
        this.router = router;
    }
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'login-page',
        template: __webpack_require__(291),
        styles: [__webpack_require__(263)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], LoginPage);

var _a;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordChangePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PasswordChangePage = (function () {
    function PasswordChangePage(router) {
        this.router = router;
    }
    return PasswordChangePage;
}());
PasswordChangePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'password-change-page',
        template: __webpack_require__(292)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], PasswordChangePage);

var _a;
//# sourceMappingURL=password-change.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 167;


/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(196);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ERROR_JSON_PARSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ERROR_NO_ERROR_CODE; });
/* unused harmony export ERROR_NO_INTERNET */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ERROR_TIMEOUT; });
/* unused harmony export ERROR_MC_IS_EMPTY */
/* unused harmony export ERROR_INTERNAL_SERVER_ERROR */
/* unused harmony export ERROR_SESSION_ID_EXIST */
/* unused harmony export ERROR_USER_NOT_FOUND */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ERROR_WRONG_SESSION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ERROR_WRONG_SESSION_ID_NO_USER_DATA_BY_THAT_SESSION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_KEY_SESSION_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ERROR_NO_FILE_SELECTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return RES_ERROR_NO_FILE_SELECTED; });
/* unused harmony export ERROR_DISCONNECTED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RES_ERROR_DISCONNECTED; });
var ERROR_JSON_PARSE = 'json-parse-error--maybe-server-error--maybe-php-error';
var ERROR_NO_ERROR_CODE = "no-error-code-on-isError()-is-considered-as-an-error";
var ERROR_NO_INTERNET = 'You have no Internet. Or the Internet is very slow.';
var ERROR_TIMEOUT = 'http-get-post-request-timeout';
var ERROR_MC_IS_EMPTY = 'mc-is-empty';
var ERROR_INTERNAL_SERVER_ERROR = 'internal-server-error';
var ERROR_SESSION_ID_EXIST = 'error-session-id-must-not-be-submitted';
var ERROR_USER_NOT_FOUND = -40108;
var ERROR_WRONG_SESSION_ID = -401081;
var ERROR_WRONG_SESSION_ID_NO_USER_DATA_BY_THAT_SESSION_ID = ERROR_WRONG_SESSION_ID;
var API_KEY_SESSION_INFO = 'user-session-id';
/**
 *
 *      N E W   E R R O R   RESPONSES
 *
 *
 */
var ERROR_NO_FILE_SELECTED = -40010;
var RES_ERROR_NO_FILE_SELECTED = { code: ERROR_NO_FILE_SELECTED, message: "no-file-selected-to-upload" };
var ERROR_DISCONNECTED = -80011;
var RES_ERROR_DISCONNECTED = { code: ERROR_DISCONNECTED, message: 'You have no internet. Please check if you are online.' };
//# sourceMappingURL=define.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__ = __webpack_require__(97);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngularBackendAdminRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdminModuleRouting = [
    { path: 'admin/user', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["b" /* BackendAdminUserListPage */] },
    { path: 'admin/user/edit/:idx', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["c" /* BackendAdminUserEditPage */] },
    { path: 'admin/forum', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["d" /* BackendAdminForumConfigPage */] },
    { path: 'admin/forum/configs', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["d" /* BackendAdminForumConfigPage */] },
    { path: 'admin/forum/categories', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["e" /* BackendAdminForumCategoryPage */] },
    { path: 'admin/forum/posts', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["f" /* BackendAdminForumPostPage */] },
    { path: 'admin/forum/posts/:post_config_id', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["f" /* BackendAdminForumPostPage */] },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_2__angular_backend_admin__["g" /* BackendAdminPage */] },
];
var AngularBackendAdminRoutingModule = (function () {
    function AngularBackendAdminRoutingModule() {
    }
    return AngularBackendAdminRoutingModule;
}());
AngularBackendAdminRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(AdminModuleRouting)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AngularBackendAdminRoutingModule);

//# sourceMappingURL=angular-backend-admin.routing.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__define__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });







var Api = (function () {
    function Api(http) {
        this.http = http;
    }
    Api.prototype.backendUrl = function () {
        if (window['url_backend_api'] !== void 0)
            return window['url_backend_api'];
        else
            return __WEBPACK_IMPORTED_MODULE_2__config__["a" /* URL_BACKEND_API */];
    };
    /**
     *
     * @param error_code
     * @param error_message
     *
     * @code
     *      this.errorResponse( 'error-code' ); // Simply put error code
     *      this.errorResponse( -1234, 'error-message' ); // Error code with message. error code must be less than 0
     * @endcode
     *
     */
    Api.prototype.errorResponse = function (error_code, error_message) {
        if (error_message === void 0) { error_message = ''; }
        if (error_message) {
            return { code: error_code, message: error_message };
        }
        else {
            return {
                code: -999,
                message: error_code
            };
        }
    };
    /**
     *
     *
     *
     * @param code
     * @param message
     */
    Api.prototype.error = function (code, message) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(this.errorResponse(-420, "user-not-logged-in"));
    };
    Object.defineProperty(Api.prototype, "requestOptions", {
        get: function () {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
            var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["e" /* RequestOptions */]({ headers: headers });
            return options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Api.prototype, "logged", {
        get: function () {
            if (this.getSessionId())
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Api.prototype, "admin", {
        get: function () {
            if (this.getSessionId()) {
                if (this.info.admin)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @deprecated use session info.
     * @param res
     */
    /*
    setSessionId( res: USER_LOGIN_RESPONSE ) {
      if ( res === void 0 || res.data === void 0 || res.data.session_id === void 0 ) {
        alert("CRITICAL ERROR: sessionSessionId() - please report this to admin.");
        return;
      }
      localStorage.setItem( API_KEY_SESSION_INFO, res.data.session_id );
    }
    */
    /**
     *
     * @param res - it can by any interface ( type ) as long as it has res.data.sessoin_id
     */
    Api.prototype.setSessionInfo = function (res) {
        if (res === void 0 || res.data === void 0 || res.data.session_id === void 0) {
            // No session_id will be returned if admin edits user info.
            // alert("CRITICAL ERROR: sessionSessionId() - please report this to admin.");
            return;
        }
        localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__define__["a" /* API_KEY_SESSION_INFO */], JSON.stringify(res.data));
    };
    // getSessionInfo() : SESSION_INFO {
    //     let data = localStorage.getItem( API_KEY_SESSION_INFO );
    //     //console.log(data);
    //     if ( data ) {
    //         try {
    //             return JSON.parse( data );
    //         }
    //         catch (e) {
    //             return null;
    //         }
    //     }
    //     else return null;
    // }
    Api.prototype.getSessionId = function () {
        return this.info.session_id;
        // let info = this.getSessionInfo();
        // // console.info(info);
        // if ( info ) return info.session_id;
        // // return localStorage.getItem( API_KEY_SESSION_INFO );
        // else return null;
    };
    Object.defineProperty(Api.prototype, "info", {
        /**
         * this.info.id
         */
        get: function () {
            var data = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__define__["a" /* API_KEY_SESSION_INFO */]);
            //console.log(data);
            if (data) {
                try {
                    return JSON.parse(data);
                }
                catch (e) {
                }
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Api.prototype.deleteSessionInfo = function () {
        localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__define__["a" /* API_KEY_SESSION_INFO */]);
    };
    /**
     *
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     */
    Api.prototype.post = function (data, option) {
        if (option === void 0) { option = {}; }
        var session_id = this.getSessionId();
        console.log('post session_id: ', session_id);
        if (session_id) {
            data['session_id'] = session_id;
        }
        else {
            console.log("session id is undefiend. so, it not set.");
            console.log(data);
        }
        data = this.buildQuery(data);
        var url = this.backendUrl() + '?' + data;
        console.log("post: ", url); // debug in console
        var o = this.http.post(this.backendUrl(), data, this.requestOptions);
        return this.processQuery(o, option);
    };
    /**
     *
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     * @attension If there is error on json(), then 'error' callback will be called on subscribe.
     *      만약, json() 또는 JSON.parse() 에서 에러가 발생하면, subscribe() 을 에러 콜백이 호출된다.
     */
    Api.prototype.get = function (url, option) {
        if (option === void 0) { option = {}; }
        //return this.http.get( url )
        return this.processQuery(this.http.get(url), option);
    };
    Api.prototype.processQuery = function (o, option) {
        var _this = this;
        if (option === void 0) { option = {}; }
        var timeout = __WEBPACK_IMPORTED_MODULE_2__config__["b" /* BACKEND_API_CONNECTION_TIMEOUT */];
        if (option['timeout'] !== void 0)
            timeout = option['timeout'];
        return o
            .timeout(timeout)
            .catch(function (err) {
            //console.log("catch() after .timeout()");
            //console.log(err);
            if (err instanceof __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["TimeoutError"]) {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(_this.errorResponse(__WEBPACK_IMPORTED_MODULE_3__define__["b" /* ERROR_TIMEOUT */]));
            }
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(err);
        })
            .map(function (e) {
            ///
            // console.log('response body:', e['_body']); // debug. comment out to see errors from server.
            if (e['_body'] == '')
                throw _this.errorResponse(-408, 'response-is-empty.');
            if (e['_body'].charAt(0) != '{') {
                console.info("Maybe error");
                console.log(e['_body']);
            }
            var re = e.json();
            if (_this.isError(re)) {
                throw re;
            }
            else
                return re;
        })
            .catch(function (err) {
            console.log('Api::processQuery(): caught an error: ', err);
            if (err instanceof SyntaxError) {
                console.error(err); // debug
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(_this.errorResponse(__WEBPACK_IMPORTED_MODULE_3__define__["c" /* ERROR_JSON_PARSE */])); // JSON 에러
            }
            else if (err && err['code'] !== void 0 && err['code'] < 0)
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(err); // 프로그램 적 에러
            else if (err['_body'] && err['_body']['total'] == 0 && err['_body']['type'] == 'error') {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(__WEBPACK_IMPORTED_MODULE_3__define__["d" /* RES_ERROR_DISCONNECTED */]);
            }
            else
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(err);
        });
    };
    /**
     * return true if the obj is error ( or error response )
     *
     *
     *
     * @param obj
     *      obj must be a form of "{ code: -123, message: 'error message'}"
     *      if 'code' does not exist, it is considered as an ERROR.
     *      if 'code' is less than 0, then it is an error.
     *
     *      { code: ... } 에서 code 값이 없거나 참의 값이면 에러로 간주한다.
     *
     * 참고로 internal sever error 의 경우에는 code 값이 없으로 '참'을 리턴한다.
     *
     * @return
     *      truthy value if the object is an error response.
     *      false if no error.
     * @code
     *
            if ( this.file.isError(err) ) return;

     * @endcode
     *
     */
    Api.prototype.isError = function (obj) {
        if (obj) {
            if (obj['code'] === void 0)
                return __WEBPACK_IMPORTED_MODULE_3__define__["e" /* ERROR_NO_ERROR_CODE */]; // if obj.code not exist.
            if (obj['code'])
                return obj['code']; // if obj.code is not 0.
        }
        return false;
    };
    /**
     * Returns true if it is an internal server error response.
     *
     *
     * @param obj
     */
    Api.prototype.isInternalServerError = function (obj) {
        return typeof obj['status'] !== void 0 && obj['status'] == 500;
    };
    Api.prototype.getErrorString = function (error) {
        if (error['status'] !== void 0 && error['status']) {
            if (error['status'] == 500)
                return "500 ( INTERNAL SERVER ERROR ) : It is a server error.";
            else
                return "ERROR RESPONSE CODE: " + error['status'];
        }
        else if (error === void 0) {
            return 'No error data';
        }
        else if (error['code'] == void 0) {
            return "No error code";
        }
        else if (error['message'] == __WEBPACK_IMPORTED_MODULE_3__define__["c" /* ERROR_JSON_PARSE */]) {
            return "ERROR: JSON PARSE ERROR: This may be PHP script error. " + error['message'];
        }
        else if (error['message'] == __WEBPACK_IMPORTED_MODULE_3__define__["b" /* ERROR_TIMEOUT */]) {
            return "ERROR: JSON PARSE ERROR: This may be PHP script error. " + error['message'];
        }
        else if (typeof error['code'] != 'undefined') {
            return ("ERROR: " + error['code'] + " : " + error['message']);
        }
        else {
            return "unhandled error: ";
            // alert("CRITICAL - UNHANDLED ERROR"); // this should never happen
        }
    };
    /**
     *
     * This simply alerts error message on browser.
     *
     * @param error
     */
    Api.prototype.alert = function (error) {
        alert(this.getErrorString(error));
    };
    // errorHandler( error ) {
    //     if ( error['code'] !== void 0 ) {
    //         console.info( "ERROR: ", error['message'] );
    //     }
    //     else if ( error['status'] !== void 0 ) {
    //         if ( error['status'] == 500 ) console.info("INTERNAL ERROR: It is a server error.");
    //         else console.info("ERROR RESPONSE CODE: ", error['status'] );
    //     }
    //     else if ( error == df.ERROR_JSON_PARSE ) {
    //       console.info("ERROR: JSON PARSE ERROR: ", error);
    //     }
    //     else {
    //         console.log("unhandled error:", error );
    //         alert("CRITICAL - UNHANDLED ERROR"); // this should never happen
    //     }
    // }
    Api.prototype.version = function () {
        return this.get(this.backendUrl() + '?route=version');
    };
    Api.prototype.errorCall = function () {
        return this.get(this.backendUrl() + '?route=system.error');
    };
    Api.prototype.successCall = function () {
        return this.version();
    };
    Api.prototype.scriptError = function () {
        return this.get(this.backendUrl() + '?route=system.scriptError');
    };
    Api.prototype.timeoutError = function () {
        return this.get(this.backendUrl() + '?route=system.timeoutError', { 'timeout': 1000 });
    };
    Api.prototype.internalServerError = function () {
        return this.get(this.backendUrl() + '?route=system.internalServerError');
    };
    Api.prototype.routeMethodError = function () {
        return this.get(this.backendUrl() + '?route=system.routeMethodError');
    };
    Api.prototype.routeRequiredError = function () {
        return this.get(this.backendUrl() + '?route=system.routeRequiredError');
    };
    /**
     * Returns the body of POST method.
     *
     * @attention This addes 'module', 'submit'. If you don't needed just user http_build_query()
     *
     * @param params must be an object.
     */
    Api.prototype.buildQuery = function (params) {
        // params[ 'module' ] = 'ajax'; // 'module' must be ajax.
        // params[ 'submit' ] = 1; // all submit must send 'submit'=1
        return this.http_build_query(params);
    };
    Api.prototype.http_build_query = function (formdata, numericPrefix, argSeparator) {
        if (numericPrefix === void 0) { numericPrefix = ''; }
        if (argSeparator === void 0) { argSeparator = ''; }
        var urlencode = this.urlencode;
        var value;
        var key;
        var tmp = [];
        var _httpBuildQueryHelper = function (key, val, argSeparator) {
            var k;
            var tmp = [];
            if (val === true) {
                val = '1';
            }
            else if (val === false) {
                val = '0';
            }
            if (val !== null) {
                if (typeof val === 'object') {
                    for (k in val) {
                        if (val[k] !== null) {
                            tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator));
                        }
                    }
                    return tmp.join(argSeparator);
                }
                else if (typeof val !== 'function') {
                    return urlencode(key) + '=' + urlencode(val);
                }
                else {
                    throw new Error('There was an error processing for http_build_query().');
                }
            }
            else {
                return '';
            }
        };
        if (!argSeparator) {
            argSeparator = '&';
        }
        for (key in formdata) {
            value = formdata[key];
            if (numericPrefix && !isNaN(key)) {
                key = String(numericPrefix) + key;
            }
            var query = _httpBuildQueryHelper(key, value, argSeparator);
            if (query !== '') {
                tmp.push(query);
            }
        }
        return tmp.join(argSeparator);
    };
    Api.prototype.urlencode = function (str) {
        str = (str + '');
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    };
    /**
     *
     * It gets 'YYYY-MM-DD' input value from form 'date' input and splits into 'birth_year', 'birth_month', 'birth_day'.
     *
     *
     * @param u - user form.
     */
    Api.prototype.splitBirthdays = function (u) {
        u.birth_year = 0;
        u.birth_month = 0;
        u.birth_day = 0;
        if (u['birthday'] !== void 0 && u['birthday'] && u['birthday'].indexOf('-') != -1) {
            var dates = u['birthday'].split('-');
            if (dates.length == 3) {
                u.birth_year = dates[0];
                u.birth_month = dates[1];
                u.birth_day = dates[2];
            }
        }
        return u;
    };
    Api.prototype.mk2c = function (d) {
        if (d < 10)
            return '0' + d;
        else
            return d;
    };
    Api.prototype.composeBirthday = function (u) {
        if (u['birth_day'] !== void 0) {
            u['birthday'] = u['birth_year'] + '-' + this.mk2c(u['birth_month']) + '-' + this.mk2c(u['birth_day']);
        }
        return u;
    };
    return Api;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentFormBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'rxjs/add/operator/debounceTime';

var CommentFormBasicComponent = (function () {
    function CommentFormBasicComponent(fb, postComment, file) {
        this.fb = fb;
        this.postComment = postComment;
        this.file = file;
        this.mode = 'create';
        this.comment = {}; /// only for editing comment.
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.create = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.edit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.files = [];
    }
    CommentFormBasicComponent.prototype.ngOnInit = function () {
        console.log('parent post: ', this.post);
        this.createForm();
    };
    CommentFormBasicComponent.prototype.createForm = function () {
        console.log("CommentFormComponent::createForm() : mode: ", this.mode);
        console.log("CommentFormComponent::createForm()", this.comment);
        if (this.mode == 'create') {
            this.formGroup = this.fb.group({
                content: []
            });
        }
        else {
            this.files = this.comment.files ? this.comment.files : [];
            this.formGroup = this.fb.group({
                content: [this.comment.content]
            });
        }
    };
    CommentFormBasicComponent.prototype.onSubmit = function () {
        if (this.mode == 'create')
            this.createComment();
        else
            this.editComment();
    };
    CommentFormBasicComponent.prototype.createComment = function () {
        var _this = this;
        console.log("CommentFormComponent::createComment() Going to create a comment: ", this.formGroup.value);
        var req = {
            parent_idx: this.parent_idx,
            content: this.formGroup.get('content').value
        };
        req.file_hooks = this.files.map(function (f) { return f.idx; });
        this.postComment.create(req).subscribe(function (res) {
            console.log('comment create: ', res);
            /// inserting comment into the proper position.
            //let post = this.list.data.posts.find( (post: _POST) => post.idx == res.data.root_idx );
            var post = _this.post;
            console.log('parent post: ', post);
            if (post === void 0)
                return;
            if (post.comments === void 0)
                post.comments = [];
            var i = post.comments.findIndex(function (c) { return c.idx == res.data.parent_idx; });
            if (i == -1)
                post.comments.unshift(res.data);
            else {
                post.comments.splice(i + 1, 0, res.data);
            }
            _this.createSuccess(res.data);
        }, function (err) { return _this.postComment.alert(err); });
    };
    CommentFormBasicComponent.prototype.editComment = function () {
        var _this = this;
        console.log("CommentFormComponent::editComment() Going to edit a comment: ", this.formGroup.value);
        var req = {
            idx: this.comment.idx,
            content: this.formGroup.get('content').value
        };
        req.file_hooks = this.files.map(function (f) { return f.idx; });
        console.log('files: ', this.files);
        console.log('file_hooks', req.file_hooks);
        this.postComment.edit(req).subscribe(function (res) {
            console.log('editComment():', res.data);
            Object.assign(_this.comment, res.data); // two-way binding. pass-by-reference.
            _this.editSuccess(res.data);
        }, function (err) { return _this.postComment.alert(err); });
    };
    CommentFormBasicComponent.prototype.reset = function () {
        this.files = [];
        this.formGroup.get('content').patchValue('');
    };
    CommentFormBasicComponent.prototype.createSuccess = function (comment) {
        this.reset();
        this.create.emit(comment);
    };
    CommentFormBasicComponent.prototype.editSuccess = function (comment) {
        this.reset();
        this.edit.emit(comment);
    };
    CommentFormBasicComponent.prototype.onClickCancel = function () {
        this.cancel.emit();
    };
    return CommentFormBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], CommentFormBasicComponent.prototype, "mode", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Object)
], CommentFormBasicComponent.prototype, "parent_idx", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_COMMENT"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_COMMENT"]) === "function" && _a || Object)
], CommentFormBasicComponent.prototype, "comment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], CommentFormBasicComponent.prototype, "cancel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], CommentFormBasicComponent.prototype, "create", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], CommentFormBasicComponent.prototype, "edit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST"]) === "function" && _b || Object)
], CommentFormBasicComponent.prototype, "post", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST_LIST_RESPONSE"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST_LIST_RESPONSE"]) === "function" && _c || Object)
], CommentFormBasicComponent.prototype, "list", void 0);
CommentFormBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'comment-form-basic-component',
        template: __webpack_require__(266)
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostComment"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostComment"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["File"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["File"]) === "function" && _f || Object])
], CommentFormBasicComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=comment-form-basic-component.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentViewBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommentViewBasicComponent = (function () {
    function CommentViewBasicComponent(postComment, domSanitizer) {
        this.postComment = postComment;
        this.domSanitizer = domSanitizer;
        this.mode = '';
    }
    CommentViewBasicComponent.prototype.onClickLike = function (choice) {
        var _this = this;
        this.postComment.vote(this.comment.idx, choice).subscribe(function (res) {
            console.log('res: ', res);
            _this.comment.vote_good = res.data.vote_good;
            _this.comment.vote_bad = res.data.vote_bad;
        }, function (err) { return _this.postComment.alert(err); });
    };
    CommentViewBasicComponent.prototype.onClickReport = function () {
        var _this = this;
        this.postComment.report(this.comment.idx).subscribe(function (res) {
            console.log('res: ', res);
            _this.comment.report = res.data.report;
        }, function (err) { return _this.postComment.alert(err); });
    };
    Object.defineProperty(CommentViewBasicComponent.prototype, "myComment", {
        get: function () {
            return this.comment.user.id == this.postComment.info.id;
        },
        enumerable: true,
        configurable: true
    });
    CommentViewBasicComponent.prototype.sanitize = function (obj) {
        if (obj === void 0 || obj['content'] === void 0 || !obj['content'])
            return '';
        var c = obj['content'].replace(/\n/g, "<br>");
        return this.domSanitizer.bypassSecurityTrustHtml(c);
    };
    return CommentViewBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__interface__["_COMMENT"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__interface__["_COMMENT"]) === "function" && _a || Object)
], CommentViewBasicComponent.prototype, "comment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__interface__["_POST"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__interface__["_POST"]) === "function" && _b || Object)
], CommentViewBasicComponent.prototype, "post", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__interface__["_POST_LIST_RESPONSE"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__interface__["_POST_LIST_RESPONSE"]) === "function" && _c || Object)
], CommentViewBasicComponent.prototype, "list", void 0);
CommentViewBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'comment-view-basic-component',
        template: __webpack_require__(267)
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostComment"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostComment"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _e || Object])
], CommentViewBasicComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=comment-view-basic-component.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__define__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileFormBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FileFormBasicComponent = (function () {
    function FileFormBasicComponent(file, ngZone) {
        this.file = file;
        this.ngZone = ngZone;
        this.percentage = 0;
    }
    FileFormBasicComponent.prototype.onChangeFile = function (_) {
        var _this = this;
        this.percentage = 1;
        this.file.uploadPostFile(_.files[0], function (percentage) {
            console.log('percentage:', percentage);
            _this.percentage = percentage;
            _this.ngZone.run(function () { });
        }).subscribe(function (res) {
            _this.files.push(res.data);
            console.log('files: ', _this.files);
            _this.percentage = 0;
        }, function (err) {
            console.log('err:', err);
            if (_this.file.isError(err) == __WEBPACK_IMPORTED_MODULE_2__define__["g" /* ERROR_NO_FILE_SELECTED */])
                return;
            _this.file.alert(err);
        });
    };
    FileFormBasicComponent.prototype.onClickDeleteFile = function (file) {
        var _this = this;
        console.log("FileFormComponent::onClickDeleteFile(file): ", file);
        this.file.delete(file.idx).subscribe(function (res) {
            console.log("file delete: ", res);
            var i = _this.files.findIndex(function (f) { return f.idx == res.data.idx; });
            // Object.assign( this.files, files );
            _this.files.splice(i, 1);
            console.log('files: ', _this.files);
        }, function (err) { return _this.file.alert(err); });
    };
    return FileFormBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Object)
], FileFormBasicComponent.prototype, "files", void 0);
FileFormBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'file-form-basic-component',
        template: __webpack_require__(268),
        styles: [__webpack_require__(250)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_backend__["File"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_backend__["File"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* NgZone */]) === "function" && _b || Object])
], FileFormBasicComponent);

var _a, _b;
//# sourceMappingURL=file-form-basic-component.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginFormBasicComponent = (function () {
    function LoginFormBasicComponent(user) {
        this.user = user;
        this.login = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.error = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.form = {};
    }
    LoginFormBasicComponent.prototype.onClickLogin = function () {
        var _this = this;
        this.user.login(this.form).subscribe(function (res) {
            console.log(res);
            _this.login.emit(res);
        }, function (err) {
            _this.error.emit(_this.user.getErrorString(err));
            //this.user.alert(err);
            console.log(err);
        });
    };
    LoginFormBasicComponent.prototype.onClickCancel = function () {
        this.cancel.emit();
    };
    return LoginFormBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], LoginFormBasicComponent.prototype, "login", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], LoginFormBasicComponent.prototype, "cancel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], LoginFormBasicComponent.prototype, "error", void 0);
LoginFormBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'login-form-basic-component',
        template: __webpack_require__(269)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_backend__["User"]) === "function" && _a || Object])
], LoginFormBasicComponent);

var _a;
//# sourceMappingURL=login-form-basic-component.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNavigationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNavigationComponent = (function () {
    function PageNavigationComponent() {
        this.numbers = [];
        this.no_of_total_pages = 0;
        this.currentDisplay = 0;
        this.no_of_total_items = null;
        this.no_of_items_in_one_page = null;
        this.no_of_pages_in_navigator = null;
        this.no_of_current_page = 1;
        this.show_prev_next = true;
        this.show_first_last = true;
        this.text_prev = '&lsaquo;';
        this.text_next = '&rsaquo;';
        this.text_first = '&laquo;';
        this.text_last = '&raquo;';
        this.structureClass = {
            ul: 'pagination',
            li: 'page-item',
            a: 'page-link',
            active: 'active',
            pageIn: 'page-indicator'
        };
        this.pageClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        //console.log('pagination::constructor()');
    }
    PageNavigationComponent.prototype.ngOnChanges = function () {
        //console.log("ngOnChanges: ...");
        if (this.no_of_total_items > 0)
            this.showPagination();
    };
    PageNavigationComponent.prototype.showPagination = function () {
        //console.log('this.no_of_total_items:', this.no_of_total_items);
        //console.log('this.no_of_items_in_one_page:', this.no_of_items_in_one_page);
        //console.log('this.no_of_pages_in_navigator:', this.no_of_pages_in_navigator);
        this.no_of_total_pages = Math.ceil(this.no_of_total_items / this.no_of_items_in_one_page);
        this.currentDisplay = Math.floor((this.no_of_current_page - 1) / this.no_of_pages_in_navigator);
        this.numbers = [];
        for (var i = 0; i < this.no_of_pages_in_navigator; i++) {
            var current_page_no = this.currentDisplay * this.no_of_pages_in_navigator + i;
            var next_block_page_no = (this.currentDisplay + 1) * this.no_of_pages_in_navigator;
            if (current_page_no < this.no_of_total_pages && current_page_no < next_block_page_no) {
                this.numbers.push(current_page_no + 1);
            }
        }
        //console.log('numbers: ', this.numbers);
    };
    PageNavigationComponent.prototype.nextPage = function () {
        var nextPage = (this.currentDisplay + 1) * this.no_of_pages_in_navigator + 1;
        //console.log('nextPage: ', nextPage);
        this.pageClick.emit(nextPage);
    };
    PageNavigationComponent.prototype.previousPage = function () {
        var prevPage = (this.currentDisplay) * this.no_of_pages_in_navigator;
        //console.log('prev: ', prevPage);
        this.pageClick.emit(prevPage);
    };
    PageNavigationComponent.prototype.gotoPage = function (page) {
        //console.log('page: ', page);
        this.pageClick.emit(page);
    };
    PageNavigationComponent.prototype.gotoLast = function () {
        this.pageClick.emit(this.no_of_total_pages);
    };
    PageNavigationComponent.prototype.gotoFirst = function () {
        this.pageClick.emit(1);
    };
    return PageNavigationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Number)
], PageNavigationComponent.prototype, "no_of_total_items", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Number)
], PageNavigationComponent.prototype, "no_of_items_in_one_page", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Number)
], PageNavigationComponent.prototype, "no_of_pages_in_navigator", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Number)
], PageNavigationComponent.prototype, "no_of_current_page", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Boolean)
], PageNavigationComponent.prototype, "show_prev_next", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Boolean)
], PageNavigationComponent.prototype, "show_first_last", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], PageNavigationComponent.prototype, "text_prev", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], PageNavigationComponent.prototype, "text_next", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], PageNavigationComponent.prototype, "text_first", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], PageNavigationComponent.prototype, "text_last", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Object)
], PageNavigationComponent.prototype, "structureClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], PageNavigationComponent.prototype, "pageClick", void 0);
PageNavigationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'page-navigation',
        template: __webpack_require__(270),
        styles: [__webpack_require__(264)]
    }),
    __metadata("design:paramtypes", [])
], PageNavigationComponent);

//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaswordChangeFormBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaswordChangeFormBasicComponent = (function () {
    function PaswordChangeFormBasicComponent(fb, user) {
        this.fb = fb;
        this.user = user;
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
    }
    PaswordChangeFormBasicComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    PaswordChangeFormBasicComponent.prototype.createForm = function () {
        this.formGroup = this.fb.group({
            old_password: [],
            new_password: []
        });
    };
    PaswordChangeFormBasicComponent.prototype.onClickCancel = function () {
        this.cancel.emit();
    };
    PaswordChangeFormBasicComponent.prototype.onClickChangePassword = function () {
        var _this = this;
        var req = {
            old_password: this.formGroup.get('old_password').value,
            new_password: this.formGroup.get('new_password').value
        };
        this.user.changePassword(req).subscribe(function (res) {
            _this.update.emit();
        }, function (err) { return _this.user.alert(err); });
    };
    return PaswordChangeFormBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], PaswordChangeFormBasicComponent.prototype, "cancel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], PaswordChangeFormBasicComponent.prototype, "update", void 0);
PaswordChangeFormBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'password-change-form-basic-component',
        template: __webpack_require__(271)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["User"]) === "function" && _b || Object])
], PaswordChangeFormBasicComponent);

var _a, _b;
//# sourceMappingURL=password-change-form-basic-component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostFormBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostFormBasicComponent = (function () {
    function PostFormBasicComponent(fb, file, postData) {
        this.fb = fb;
        this.file = file;
        this.postData = postData;
        this.create = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.edit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.post = {}; // post data to edit. this is only used when editing.
        this.files = [];
    }
    PostFormBasicComponent.prototype.ngOnInit = function () {
        /// test
        //this.post_config_id = 'qna'; // test
        this.createForm();
        //this.createPost(); // test
    };
    PostFormBasicComponent.prototype.createForm = function () {
        console.log('post config id: ', this.post_config_id);
        if (this.isCreate()) {
            console.log("creating");
            this.files = [];
            this.formGroup = this.fb.group({
                post_config_id: [this.post_config_id],
                title: [],
                content: [],
                link: []
            });
        }
        else {
            this.files = this.post.files ? this.post.files : [];
            this.formGroup = this.fb.group({
                // post_config_id: [],
                title: [this.post.title],
                content: [this.post.content],
                link: [this.post.link]
            });
        }
        console.log(this.formGroup.value);
    };
    PostFormBasicComponent.prototype.onSubmit = function () {
        console.log(this.formGroup.value);
        if (this.isCreate())
            this.createPost();
        else
            this.editPost();
    };
    PostFormBasicComponent.prototype.reset = function () {
        this.files = [];
        this.formGroup.get('title').patchValue('');
        this.formGroup.get('content').patchValue('');
    };
    PostFormBasicComponent.prototype.createSuccess = function (post) {
        this.reset();
        this.create.emit(post);
    };
    PostFormBasicComponent.prototype.editSuccess = function (post) {
        this.reset();
        console.log("emit: ", post);
        this.edit.emit(post);
    };
    PostFormBasicComponent.prototype.onClickCancel = function () {
        this.cancel.emit();
    };
    /**
     *
     * Emits the newly created post. Meaning, the post list page should take it and unshift it.
     *
     */
    PostFormBasicComponent.prototype.createPost = function () {
        var _this = this;
        var create = this.formGroup.value;
        //create.post_config_id = this.post_config_id;
        create.file_hooks = this.files.map(function (f) { return f.idx; });
        this.postData.create(create).subscribe(function (res) {
            console.log(res);
            _this.createSuccess(res.data);
        }, function (err) { return _this.postData.alert(err); });
    };
    /**
     * After edit, it assigns to original reference. Meaning, it does two-way binding.
     */
    PostFormBasicComponent.prototype.editPost = function () {
        var _this = this;
        var edit = this.formGroup.value;
        edit.idx = this.post.idx;
        edit.file_hooks = this.files.map(function (f) { return f.idx; });
        console.log('post-form-conpoment::editPost()', edit);
        this.postData.edit(edit).subscribe(function (res) {
            console.log('after edit: ', res);
            Object.assign(_this.post, res.data); // two-way binding since it is pass-by-reference.
            //this.post = res.data;
            _this.editSuccess(res.data);
        }, function (err) { return _this.postData.alert(err); });
    };
    PostFormBasicComponent.prototype.isCreate = function () {
        return this.post === void 0 || this.post.idx === void 0;
    };
    PostFormBasicComponent.prototype.isEdit = function () {
        return !this.isCreate();
    };
    return PostFormBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], PostFormBasicComponent.prototype, "create", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], PostFormBasicComponent.prototype, "edit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], PostFormBasicComponent.prototype, "cancel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], PostFormBasicComponent.prototype, "post_config_id", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST"]) === "function" && _a || Object)
], PostFormBasicComponent.prototype, "post", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Object)
], PostFormBasicComponent.prototype, "option", void 0);
PostFormBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'post-form-basic-component',
        template: __webpack_require__(272)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["File"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["File"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"]) === "function" && _d || Object])
], PostFormBasicComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=post-form-basic-component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostViewBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostViewBasicComponent = (function () {
    function PostViewBasicComponent(postData, domSanitizer) {
        this.postData = postData;
        this.domSanitizer = domSanitizer;
        this.showPostEditForm = false;
        this.showCommentForm = false;
    }
    PostViewBasicComponent.prototype.ngOnInit = function () {
        //console.log("post-view-basic-component: post: ", this.post);
    };
    PostViewBasicComponent.prototype.onClickLike = function (choice) {
        var _this = this;
        this.postData.vote(this.post.idx, choice).subscribe(function (res) {
            console.log('res: ', res);
            _this.post.vote_good = res.data.vote_good;
            _this.post.vote_bad = res.data.vote_bad;
        }, function (err) { return _this.postData.alert(err); });
    };
    PostViewBasicComponent.prototype.onClickReport = function () {
        var _this = this;
        this.postData.report(this.post.idx).subscribe(function (res) {
            console.log('res: ', res);
            _this.post.report = res.data.report;
        }, function (err) { return _this.postData.alert(err); });
    };
    Object.defineProperty(PostViewBasicComponent.prototype, "myPost", {
        get: function () {
            if (this.post.user === void 0)
                return false; // 'post data' may not have user information.
            return this.post.user.id == this.postData.info.id;
        },
        enumerable: true,
        configurable: true
    });
    PostViewBasicComponent.prototype.sanitize = function (obj) {
        if (obj === void 0 || obj['content'] === void 0 || !obj['content'])
            return '';
        var c = obj['content'].replace(/\n/g, "<br>");
        return this.domSanitizer.bypassSecurityTrustHtml(c);
    };
    return PostViewBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST"]) === "function" && _a || Object)
], PostViewBasicComponent.prototype, "post", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST_LIST_RESPONSE"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["_POST_LIST_RESPONSE"]) === "function" && _b || Object)
], PostViewBasicComponent.prototype, "list", void 0);
PostViewBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'post-view-basic-component',
        template: __webpack_require__(273)
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_backend__["PostData"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _d || Object])
], PostViewBasicComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=post-view-basic-component.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterFormBasicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterFormBasicComponent = (function () {
    function RegisterFormBasicComponent(router, fb, user, ngZone, 
        //private router: Router,
        file) {
        var _this = this;
        this.router = router;
        this.fb = fb;
        this.user = user;
        this.ngZone = ngZone;
        this.file = file;
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.register = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* EventEmitter */]();
        this.data = {};
        this.percentage = 0;
        this.formErrors = {
            id: '',
            password: '',
            name: '',
            email: ''
        };
        this.validationMessages = {
            id: {
                'required': 'ID is required.',
                'minlength': 'ID must be at least 3 characters long.',
                'maxlength': 'ID cannot be more than 32 characters long.'
            },
            name: {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 3 characters long.',
                'maxlength': 'Name cannot be more than 32 characters long.'
            },
            password: {
                'required': 'Password is required.',
                'minlength': 'Password must be at least 5 characters long.',
                'maxlength': 'Password cannot be more than 128 characters long.'
            },
            email: {
                'required': 'Email is required.',
                'minlength': 'Email must be at least 8 characters long.',
                'maxlength': 'Email cannot be more than 32 characters long.',
                'malformed': 'Email must be in valid format. valudator error'
            }
        };
        this.form = fb.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(32)]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, this.emailValidator]],
            mobile: [],
            gender: [],
            birthday: []
        });
        if (!this.user.logged) {
            this.form.addControl('id', new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(32)]));
            this.form.addControl('password', new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(128)]));
        }
        this.form.valueChanges
            .debounceTime(500)
            .subscribe(function (res) { return _this.onValueChanged(res); });
        if (this.user.logged)
            this.loadUserData();
    }
    RegisterFormBasicComponent.prototype.emailValidator = function (c) {
        if (!c.value)
            return;
        if (c.value.length < 8) {
            return { 'minlength': '' };
        }
        if (c.value.length > 64) {
            return { 'maxlength': '' };
        }
        var re = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(c.value);
        if (re)
            return;
        else
            return { 'malformed': '' };
    };
    RegisterFormBasicComponent.prototype.onValueChanged = function (data) {
        if (!this.form)
            return;
        var form = this.form;
        for (var field in this.formErrors) {
            this.formErrors[field] = ''; // clear previous error message (if any)
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    RegisterFormBasicComponent.prototype.loadUserData = function () {
        var _this = this;
        this.user.data().subscribe(function (res) {
            _this.data = res.data.user;
            _this.data = _this.user.composeBirthday(_this.data);
            // console.log(this.data);
            _this.form.patchValue(_this.data);
        }, function (err) {
            console.log('err: ', err);
            if (err.code == __WEBPACK_IMPORTED_MODULE_4__define__["h" /* ERROR_WRONG_SESSION_ID_NO_USER_DATA_BY_THAT_SESSION_ID */]) {
                _this.user.deleteSessionInfo();
                alert("WARNING: Your login had invalidated. Please login again.");
                _this.router.navigate(['/']);
            }
            else
                _this.user.alert(err);
        });
    };
    RegisterFormBasicComponent.prototype.onChangeFileUpload = function (_) {
        var _this = this;
        this.file.uploadPrimaryPhoto(_.files[0], function (p) {
            _this.percentage = p;
            _this.ngZone.run(function () { });
            console.log('p: ', _this.percentage);
        })
            .subscribe(function (res) {
            console.log("Register::onChangeFileUpload:: success: ", res);
            _this.data.primary_photo = res.data;
            _this.percentage = 0;
        }, function (err) {
            _this.percentage = 0;
            _this.file.alert(err);
        });
    };
    /**
     * @see readme#registration
     */
    RegisterFormBasicComponent.prototype.onClickRegister = function () {
        var _this = this;
        console.log(this.form.value);
        var register = this.user.splitBirthdays(this.form.value);
        if (this.data.primary_photo)
            register.file_hooks = [this.data.primary_photo.idx];
        this.user.register(register).subscribe(function (res) {
            // console.log('register: ', register);
            //this.router.navigate( [ '/' ] );
            _this.register.emit();
        }, function (err) { return _this.user.alert(err); });
    };
    RegisterFormBasicComponent.prototype.onClickUpdate = function () {
        var _this = this;
        var edit = this.user.splitBirthdays(this.form.value);
        /// When register, "id, password" exist. If the user registers, then it must be deleted. But if the user does not register, (only update, already register), id, pw does not exists.
        if (edit['id'] !== void 0)
            delete edit['id'];
        if (edit['password'] !== void 0)
            delete edit['password'];
        this.user.edit(edit).subscribe(function (res) {
            console.log(res);
            _this.update.emit();
        }, function (err) { return _this.user.alert(err); });
    };
    RegisterFormBasicComponent.prototype.onClickDeletePhoto = function () {
        var _this = this;
        console.log("FileFormComponent::onClickDeleteFile(file): ", this.data.primary_photo);
        this.file.delete(this.data.primary_photo.idx).subscribe(function (res) {
            console.log("file delete: ", res);
            _this.data.primary_photo = {};
        }, function (err) { return _this.file.alert(err); });
    };
    ////
    RegisterFormBasicComponent.prototype.onClickCancel = function () {
        this.cancel.emit();
    };
    return RegisterFormBasicComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], RegisterFormBasicComponent.prototype, "cancel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], RegisterFormBasicComponent.prototype, "register", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], RegisterFormBasicComponent.prototype, "update", void 0);
RegisterFormBasicComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'register-form-basic-component',
        template: __webpack_require__(274)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_backend__["User"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* NgZone */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_backend__["File"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_backend__["File"]) === "function" && _e || Object])
], RegisterFormBasicComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=register-form-basic-component.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_admin_service__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminHeaderComponent = (function () {
    function AdminHeaderComponent(user, admin) {
        this.user = user;
        this.admin = admin;
        this.isLogged = null;
        this.navclass = "collapse navbar-collapse";
    }
    AdminHeaderComponent.prototype.ngOnInit = function () {
        if (!this.user.logged)
            return;
        // This needs internet connection every load.
        // We must limit internet connection as much as possible.
        // this.user.data().subscribe( res =>{
        //   this.usertype = res.data.user.id;
        // });
    };
    AdminHeaderComponent.prototype.onClickLogout = function () {
        var _this = this;
        this.user.logout().subscribe(function (res) {
            console.log(res);
        }, function (err) {
            _this.user.alert(err);
        });
    };
    AdminHeaderComponent.prototype.onClickMore = function () {
        this.navclass = this.navclass ? null : "collapse navbar-collapse";
    };
    return AdminHeaderComponent;
}());
AdminHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'admin-header',
        template: __webpack_require__(275),
        styles: [__webpack_require__(251)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_backend__["User"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_admin_service__["a" /* AdminService */]) === "function" && _b || Object])
], AdminHeaderComponent);

var _a, _b;
//# sourceMappingURL=header.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostEditModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

var PostEditModalComponent = (function () {
    function PostEditModalComponent(postData
        // public activeModal: NgbActiveModal
    ) {
        //
        // if (  ! this.idx ) activeModal.close('idx is empty');
        // else {
        //     this.loadPostData();
        // }
        this.postData = postData;
        this.post = [];
        this.posts = [];
    }
    return PostEditModalComponent;
}());
PostEditModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'post-edit-modal',
        template: __webpack_require__(276),
        styles: [__webpack_require__(252)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_backend__["PostData"]) === "function" && _a || Object])
], PostEditModalComponent);

var _a;
//# sourceMappingURL=edit.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminSidebarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminSidebarComponent = (function () {
    function AdminSidebarComponent() {
    }
    return AdminSidebarComponent;
}());
AdminSidebarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'admin-sidebar',
        template: __webpack_require__(277),
        styles: [__webpack_require__(253)]
    }),
    __metadata("design:paramtypes", [])
], AdminSidebarComponent);

//# sourceMappingURL=sidebar.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoBoxComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InfoBoxComponent = (function () {
    function InfoBoxComponent() {
        this.infoBoxClass = null;
        this.iconclass = null;
        this.iClass = 'fa-gear fa-3x';
        this.textClass = null;
        this.titleClass = null;
        this.contentClass = null;
        this.titleInnerHTML = 'Title';
        this.contentInnerHTML = 'Content';
    }
    return InfoBoxComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "infoBoxClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "iconclass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "iClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "textClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "titleClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "contentClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "titleInnerHTML", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", String)
], InfoBoxComponent.prototype, "contentInnerHTML", void 0);
InfoBoxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'info-box',
        template: __webpack_require__(284),
        styles: [__webpack_require__(260)]
    }),
    __metadata("design:paramtypes", [])
], InfoBoxComponent);

//# sourceMappingURL=info-box.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressGroupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressGroupComponent = (function () {
    function ProgressGroupComponent() {
    }
    return ProgressGroupComponent;
}());
ProgressGroupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'progress-group',
        template: __webpack_require__(285),
        styles: [__webpack_require__(261)]
    }),
    __metadata("design:paramtypes", [])
], ProgressGroupComponent);

//# sourceMappingURL=progress-group.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__progress__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomBrowserXhr; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CustomBrowserXhr = (function (_super) {
    __extends(CustomBrowserXhr, _super);
    function CustomBrowserXhr(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    CustomBrowserXhr.prototype.build = function () {
        var _this = this;
        var xhr = _super.prototype.build.call(this);
        // xhr.onprogress = (event) => {            
        //   this.service.downloadProgress.next(event);
        // };
        xhr.upload.onprogress = function (event) {
            if (_this.service)
                _this.service.uploadProgress.next(event);
        };
        return (xhr);
    };
    return CustomBrowserXhr;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* BrowserXhr */]));
CustomBrowserXhr = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__progress__["a" /* ProgressService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__progress__["a" /* ProgressService */]) === "function" && _a || Object])
], CustomBrowserXhr);

var _a;
//# sourceMappingURL=custom-browser-xhr.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
        /// backend url.
        window['url_backend_api'] = "https://womanapp.sonub.com/index.php";
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(286),
        styles: [__webpack_require__(262)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_backend_angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_backend_angular_backend_admin__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__woman_woman_module__ = __webpack_require__(194);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_backend_angular_backend__["AngularBackend"],
            __WEBPACK_IMPORTED_MODULE_6__angular_backend_angular_backend_admin__["a" /* AngularBackendAdmin */],
            __WEBPACK_IMPORTED_MODULE_8__woman_woman_module__["a" /* WomanModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot([])
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_backend_angular_backend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_page_scroll__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ArticleListComponent = (function () {
    function ArticleListComponent(meta, domSanitizer, activated, pageScroll, postData, router) {
        this.meta = meta;
        this.domSanitizer = domSanitizer;
        this.activated = activated;
        this.pageScroll = pageScroll;
        this.postData = postData;
        this.router = router;
        this.option = {
            showTitle: false,
            showCreateButton: false
        };
        this.post_config_id = null;
        this.lists = [];
        this.postListResponse = null;
        this.showPostForm = false;
        this.inLoading = false;
        this.noMorePosts = false;
        this.page = 0;
        this.favorites = [];
    }
    ArticleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activated.params.subscribe(function (params) {
            console.log('param subs:', params);
            _this.reset();
            if (params['post_config_id'] !== void 0) {
                _this.post_config_id = params['post_config_id'];
            }
            _this.load();
        });
        this.watch = this.pageScroll.watch('body', 350).subscribe(function (e) { return _this.load(); });
        this.getFavorites();
    };
    ArticleListComponent.prototype.ngOnDestroy = function () {
        this.watch.unsubscribe();
    };
    ArticleListComponent.prototype.reset = function () {
        this.lists = [];
        this.page = 0;
        this.inLoading = false;
        this.noMorePosts = false;
    };
    ArticleListComponent.prototype.onLoaded = function (res) {
        this.postListResponse = res;
        console.log('res:', res);
    };
    ArticleListComponent.prototype.load = function () {
        var _this = this;
        console.log("load() is called");
        if (this.inLoading) {
            console.log("but it's still loading previous page. so, just don't do anything");
            return;
        }
        if (this.noMorePosts) {
            console.log("but no more posts. so don't do anything");
            return;
        }
        this.inLoading = true;
        this.page++;
        console.log("loading page: ", this.page);
        var req = {
            where: 'parent_idx=?',
            bind: '0',
            order: 'idx desc',
            page: this.page,
            limit: 16,
            extra: {
                post_config_id: this.post_config_id,
                user: true,
                meta: true,
                file: true,
                comment: true
            }
        };
        this.postData.list(req).subscribe(function (res) {
            console.log('post list: ', res);
            _this.inLoading = false;
            /// pre process
            res.data.posts.map(function (post) {
                post.title = post.title.substr(0, 12);
            });
            // eo
            _this.lists.push(res);
            if (res.data.posts.length == 0)
                _this.noMorePosts = true;
            else {
            }
        }, function (err) {
            if (err['code'] == -40232) {
                _this.router.navigateByUrl('/');
                alert('forum not exist');
            }
            else
                _this.reset();
        });
    };
    ArticleListComponent.prototype.sanitize = function (obj) {
        if (obj === void 0 || obj['content'] === void 0 || !obj['content'])
            return '';
        var c = obj['content'].replace(/\n/g, "<br>");
        return this.domSanitizer.bypassSecurityTrustHtml(c);
    };
    ArticleListComponent.prototype.onClickFavorite = function (post) {
        var _this = this;
        console.log("onClickFavorite: ", post);
        if (this.isFavorite(post)) {
            var f = this.findFavorite(post);
            this.meta.delete(f.idx).subscribe(function (res) {
                console.log('delete favorite: ', res);
                _this.favorites.splice(_this.favorites.findIndex(function (m) { return m.idx == res.data.idx; }), 1);
            }, function (err) {
                _this.meta.alert(err);
            });
        }
        else {
            var req = {
                model: 'favorite',
                model_idx: post.idx,
                code: '' + post.idx
            };
            this.meta.create(req).subscribe(function (res) {
                console.log('meta create: ', res);
                _this.favorites.push(res.data.meta);
            }, function (err) {
                _this.meta.alert(err);
            });
        }
    };
    ArticleListComponent.prototype.getFavorites = function () {
        var _this = this;
        var req = {
            where: 'model=?',
            bind: 'favorite',
            limit: 100
        };
        this.meta.list(req).subscribe(function (res) {
            console.log("favorites: ", res);
            if (res.data && res.data.meta && res.data.meta.length) {
                _this.favorites = res.data.meta;
            }
            else {
                // this.favorites;
            }
        }, function (err) {
            _this.meta.alert(err);
        });
    };
    ArticleListComponent.prototype.isFavorite = function (post) {
        return this.favorites.findIndex(function (m) { return m.model_idx == post.idx; }) != -1;
    };
    ArticleListComponent.prototype.findFavorite = function (post) {
        return this.favorites.find(function (m) { return m.model_idx == post.idx; });
    };
    return ArticleListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Input */])(),
    __metadata("design:type", Object)
], ArticleListComponent.prototype, "option", void 0);
ArticleListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'article-list-component',
        template: __webpack_require__(287)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_backend_angular_backend__["Meta"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_backend_angular_backend__["Meta"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_page_scroll__["a" /* PageScroll */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_page_scroll__["a" /* PageScroll */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_backend_angular_backend__["PostData"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_backend_angular_backend__["PostData"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object])
], ArticleListComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=article-list.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_backend_angular_backend__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    function HeaderComponent(user) {
        this.user = user;
        this.showPanel = false;
    }
    HeaderComponent.prototype.onClickLogout = function () {
        this.user.logout();
    };
    HeaderComponent.prototype.onClickReport = function () {
        alert("아직 지원하지 않는 기능입니다.");
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'header-component',
        template: __webpack_require__(288)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_backend_angular_backend__["User"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_backend_angular_backend__["User"]) === "function" && _a || Object])
], HeaderComponent);

var _a;
//# sourceMappingURL=header.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_forum_forum__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_password_change_password_change__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__woman_routing_module__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_header_header__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_article_list_article_list__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_page_scroll__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_backend_modules_angular_backend_components_module__ = __webpack_require__(105);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WomanModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var WomanModule = (function () {
    function WomanModule() {
    }
    return WomanModule;
}());
WomanModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_forum_forum__["a" /* ForumPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__components_header_header__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_article_list_article_list__["a" /* ArticleListComponent */],
            __WEBPACK_IMPORTED_MODULE_5__pages_password_change_password_change__["a" /* PasswordChangePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_backend_modules_angular_backend_components_module__["a" /* AngularBackendComponentModule */],
            __WEBPACK_IMPORTED_MODULE_6__woman_routing_module__["a" /* WomanRoutingModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__services_page_scroll__["a" /* PageScroll */]]
    })
], WomanModule);

//# sourceMappingURL=woman.module.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_forum_forum__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_password_change_password_change__ = __webpack_require__(116);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WomanRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var WomanRoutes = [
    { path: 'forum/:post_config_id', component: __WEBPACK_IMPORTED_MODULE_3__pages_forum_forum__["a" /* ForumPage */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */] },
    { path: 'password-change', component: __WEBPACK_IMPORTED_MODULE_5__pages_password_change_password_change__["a" /* PasswordChangePage */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */], pathMatch: 'full' },
    { path: '**', redirectTo: '/' }
];
var WomanRoutingModule = (function () {
    function WomanRoutingModule() {
    }
    return WomanRoutingModule;
}());
WomanRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(WomanRoutes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], WomanRoutingModule);

//# sourceMappingURL=woman.routing.module.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

;
;
;
;
;
;
; // universal. all kinds of delete requst.
;
; // universal. all kinds of delete response.
;
;
;
;
; // user data table.
; // use it to get user data.
;
;
;
;
; // to get response of user edit. it is only session info and name, email, id.
;
;
;
;
; // to login
; // to log out. use 'RESPONSE' for the response.
;
;
;
;
;
;
;
;
;
;
;
;
;
; // to create a forum.
; // to update a forum.
; // to delete a forum.
; // to get a forum config fields.
; // to receive a complete forum config fields. Use this after create/update/get/delete a forum
; // to create a post
; // to update a post
;
;
; // to update a post
;
; // to create/update/get/delete a post.
; // to edit user data
;
;
;
;
;
;
; // universal. all kinds of delete requst.
; // universal. all kinds of delete response.
;
;
; // to login
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
//# sourceMappingURL=interface.js.map

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".file {\n  position: relative; }\n  .file .fa-stack {\n    position: absolute;\n    bottom: .4em;\n    right: .4em;\n    cursor: pointer; }\n    .file .fa-stack .fa-trash {\n      color: #454; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "/*a{*/\n/*cursor: pointer;*/\n/*}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "td {\n  position: relative; }\n\ntr.strikeout td:before {\n  content: \" \";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  border-bottom: 1px solid #111;\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "body {\n  padding-top: 40px;\n  padding-bottom: 40px;\n  background-color: #eee; }\n\n.form-container {\n  max-width: 330px;\n  padding: 15px;\n  margin: 0 auto; }\n\n.form-signin .form-signin-heading,\n.form-signin .checkbox {\n  margin-bottom: 10px; }\n\n.form-signin .checkbox {\n  font-weight: normal; }\n\n.form-signin .form-control {\n  position: relative;\n  height: auto;\n  box-sizing: border-box;\n  padding: 10px;\n  font-size: 16px; }\n\n.form-signin .form-control:focus {\n  z-index: 2; }\n\n.form-signin input[type=\"email\"] {\n  margin-bottom: -1px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.form-signin input[type=\"password\"] {\n  margin-bottom: 10px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".pagination {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: .25rem;\n}\n\n.pagination a {\n  text-decoration: none;\n}\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: .5rem .75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 266:
/***/ (function(module, exports) {

module.exports = "\n<h4>Comment {{ mode }} {{ mode == 'create' ? 'under ' + parent_idx : comment.idx }}</h4>\n<form [formGroup]=\"formGroup\" (ngSubmit)=\" onSubmit() \"  novalidate>\n\n  <file-form-basic-component [files]=\" files \"></file-form-basic-component>\n  \n  <div class=\"form-group\">\n    <label for=\"content-box\">Content</label>\n    <textarea id=\"content-box\" class=\"form-control\" formControlName=\"content\"></textarea>\n    <div class=\"form-text text-muted\">Please, input content</div>\n  </div>\n  \n  <button type=\"submit\" class=\"btn btn-primary\">Create Comment</button>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"onClickCancel()\">Cancel</button>\n\n</form>\n"

/***/ }),

/***/ 267:
/***/ (function(module, exports) {

module.exports = "<hr>\n<article *ngIf=\" comment && mode != 'edit' \" class=\"comment bg-white p-3\" [attr.depth]=\" comment.depth \">\nidx: {{ comment.idx }}\nauthor: {{ comment.user.name }}\n<p [innerHTML]=\" sanitize( comment ) \"></p>\n\n      <div class=\"files clearfix\" *ngIf=\" comment.files \">\n        <div class=\"w-25 float-left\" *ngFor=\" let file of comment.files \">\n          <img [src]=\" file.url + '&crop=100x100x50'  \" style=\"width: 100%;\">\n        </div>\n      </div>\n\n<div class=\"buttons\">\n    <span *ngIf=\" myComment \" (click)=\" mode = 'edit' \" class=\"\">Edit</span>\n    <span (click)=\" mode = 'create' \" class=\"\">Reply</span>\n    <span (click)=\" onClickLike( 'G' ) \" class=\"\">Like({{comment.vote_good}})</span>\n    <span (click)=\" onClickLike( 'B' ) \" class=\"\">Dislike({{comment.vote_bad}})</span>\n    <span (click)=\" onClickReport() \" class=\"\">Report({{comment.report}})</span>\n</div>\n\n</article>\n\n<comment-form-basic-component\n    *ngIf = \" mode \"\n    [mode] = \" mode \"\n    [list] = \" list \"\n    [post] = \" post \"\n    [parent_idx]=\" comment.idx \"\n    [comment]=\" comment \"\n    (create) = \" mode = '' \"\n    (edit) = \" mode = '' \"\n    (cancel) = \" mode = '' \"\n    ></comment-form-basic-component>"

/***/ }),

/***/ 268:
/***/ (function(module, exports) {

module.exports = "<div class=\"form-files clearfix\">\n    <div class=\"file w-25 float-left\" *ngFor=\" let file of files \">\n        \n        <span (click)=\" onClickDeleteFile( file ) \" class=\"fa-stack fa-lg\">\n            <i class=\"fa fa-circle fa-stack-2x fa-inverse\"></i>\n            <i class=\"fa fa-trash fa-stack-1x\"></i>\n        </span>\n\n        <img style=\"width: 100%\" src=\"{{ file.url + '&crop=100x100x70' }}\">\n    </div>\n</div>\n    \n    <div class=\"form-group\">\n      <label for=\"file-box\">Upload Photos</label>\n        <div *ngIf=\" percentage \" class=\"progress mb-2\">\n            <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\" percentage + '%' \">{{ percentage }} %</div>\n        </div>\n\n      <input type=\"file\" class=\"form-control-file\" id=\"file-box\" #file (change)=\"onChangeFile(file)\">\n      <small class=\"form-text text-muted\">Please select a photo to upload</small>\n    </div>\n\n"

/***/ }),

/***/ 269:
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"form-container\">\n    <label for=\"inputId\" class=\"sr-only\">Email address</label>\n    <input type=\"text\" id=\"inputId\" name=\"id\" class=\"form-control\" [(ngModel)]=\"form.id\" placeholder=\"UserID\" required autofocus>\n    <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n    <input type=\"password\" id=\"inputPassword\" name=\"password\" class=\"form-control\" [(ngModel)]=\"form.password\" placeholder=\"Password\" required>\n    <button class=\"btn btn-primary btn-block btn-sm\" type=\"button\" (click)=\"onClickLogin()\">Sign in</button>\n    <button class=\"btn btn-success btn-block btn-sm\" type=\"button\" (click)=\"onClickCancel()\">Cancel</button>\n  </div>\n\n"

/***/ }),

/***/ 270:
/***/ (function(module, exports) {

module.exports = "<nav *ngIf=\"no_of_total_items\">\n  <ul class=\"{{structureClass.ul}}\">\n    <li class=\"{{structureClass.li}}{{structureClass.pageIn}}\"><a class=\"{{structureClass.a}}\">Page {{no_of_current_page}} of {{no_of_total_pages}}</a></li>\n    <li class=\"{{structureClass.li}}\" *ngIf=\"show_first_last && currentDisplay > 0\" (click)=\"gotoFirst()\">\n      <a class=\"{{structureClass.a}}\" innerHTML=\"{{text_first}}\"></a>\n    </li>\n    <li class=\"{{structureClass.li}}\" *ngIf=\"show_prev_next && currentDisplay > 0\"  (click)=\"previousPage()\">\n      <a class=\"{{structureClass.a}}\" innerHTML=\"{{text_prev}}\">\n\n      </a>\n    </li>\n    <li class=\"{{structureClass.li}}\" *ngFor=\"let x of numbers\"\n            [ngClass]=\"{ active : no_of_current_page == x }\"\n            (click)=\"gotoPage( x )\"\n    >\n      <a class=\"{{structureClass.a}}\">{{x}}</a>\n    </li>\n    <li class=\"{{structureClass.li}}\" *ngIf=\"show_prev_next && numbers[ numbers.length - 1] < no_of_total_pages \"  (click)=\"nextPage()\">\n      <a class=\"{{structureClass.a}}\" innerHTML=\"{{text_next}}\"></a>\n    </li>\n    <li class=\"{{structureClass.li}}\" *ngIf=\"show_first_last && numbers[ numbers.length - 1] < no_of_total_pages\" (click)=\"gotoLast()\">\n      <a class=\"{{structureClass.a}}\" innerHTML=\"{{text_last}}\"></a>\n    </li>\n  </ul>\n</nav>\n"

/***/ }),

/***/ 271:
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formGroup\">\n    <div class=\"form-group mt-2\">\n        <label for=\"OldPassword\">Old Password</label>\n        <input type=\"password\" id=\"OldPassword\" class=\"form-control\" required autofocus formControlName=\"old_password\">\n    </div>\n    <div class=\"form-group mt-2\">\n        <label for=\"NewPassword\">New Password</label>\n        <input type=\"password\" id=\"NewPassword\" class=\"form-control\" required formControlName=\"new_password\">\n    </div>\n    <button class=\"btn btn-primary btn-block btn-sm\" type=\"button\" (click)=\"onClickChangePassword()\">Change Password</button>\n    <button class=\"btn btn-success btn-block btn-sm\" type=\"button\" (click)=\"onClickCancel()\">Cancel</button>\n</form>\n\n"

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"card mb-2\">\n  <div class=\"card-block\">\n    <h3 *ngIf=\" isCreate() \" class=\"card-title\">Writing on {{ post_config_id }} Forum</h3>\n    <h3 *ngIf=\" isEdit() \" class=\"card-title\">Editing No. {{ post.idx }}</h3>\n    <form [formGroup]=\"formGroup\" (ngSubmit)=\"onSubmit()\" novalidate>\n        \n        <file-form-basic-component [files]=\" files \"></file-form-basic-component>\n\n        \n        <div *ngIf=\" option?.hideForumID === true && isCreate() \" class=\"form-group\">\n          <label for=\"title-box\">Forum ID</label>\n          <input type=\"text\" class=\"form-control\" id=\"title-box\" formControlName=\"post_config_id\">\n          <small class=\"form-text text-muted\">Input forum ID like 'qna'</small>\n        </div>\n\n        <div *ngIf=\" option?.showTitle === true \" class=\"form-group\">\n          <label for=\"title-box\">Title</label>\n          <input type=\"text\" class=\"form-control\" id=\"title-box\" formControlName=\"title\">\n          <small class=\"form-text text-muted\">Input title</small>\n        </div>\n\n        <div *ngIf=\" option?.showContent === true \" class=\"form-group\">\n          <label for=\"content-box\">Content</label>\n          <textarea class=\"form-control\" id=\"content-box\" formControlName=\"content\"></textarea>\n          <small class=\"form-text text-muted\">Please, input content</small>\n        </div>\n        \n        <div *ngIf=\" option?.showLink === true \" class=\"form-group\">\n          <label for=\"link-box\">Link</label>\n          <input class=\"form-control\" id=\"link-box\" formControlName=\"link\">\n          <small class=\"form-text text-muted\">Any links like homepage</small>\n        </div>\n        \n        <button type=\"submit\" class=\"btn btn-primary\">Post</button>\n        <button type=\"button\" class=\"btn btn-Secondary\" (click)=\" onClickCancel() \">Cancel</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ 273:
/***/ (function(module, exports) {

module.exports = "\n<div *ngIf=\" ! showPostEditForm \" class=\"card post\">\n  <div class=\"card-block\">\n    <table>\n      <tr>\n        <td width=\"1%\">\n          <img *ngIf=\" post.user?.url_primary_photo \" src=\"{{ post.user.url_primary_photo }}\"\n          style=\" width: 40px; height: 40px; border-radius: 50%; \">\n        </td>\n        <td>\n          <h4 class=\"card-title\">{{ post.title }}</h4>\n          <h6 class=\"card-subtitle mb-2 text-muted\">{{ post.idx }}, {{ post.user?.name }}</h6>\n        </td>\n      </tr>\n    </table>\n\n      <p class=\"card-text rounded bg-lightgrey p-3\" [innerHTML]=\" sanitize(post) \"></p>\n\n\n      <div class=\"files clearfix\" *ngIf=\" post.files \">\n        <div class=\"w-25 float-left\" *ngFor=\" let file of post.files \">\n          <img [src]=\" file.url + '&crop=200x100x70'\" style=\"width: 100%;\">\n        </div>\n      </div>\n    \n      <div class=\"buttons\">\n        <span *ngIf=\" myPost \" class=\"card-link\" (click)=\" showPostEditForm = !showPostEditForm \">Edit</span>\n        <span class=\"card-link\" (click)=\" showCommentForm = !showCommentForm \">Reply</span>\n        <span class=\"card-link\" (click)=\" onClickLike('G') \">Like({{ post.vote_good }})</span>\n        <span class=\"card-link\" (click)=\" onClickLike('B') \">Dislike({{ post.vote_bad }})</span>\n        <span (click)=\" onClickReport() \" class=\"card-link\">Report({{post.report}})</span>\n      </div>\n\n  </div>\n</div>\n\n  <post-form-basic-component\n    *ngIf=\" showPostEditForm \"\n    [post] = \" post \"\n    (cancel) = \" showPostEditForm = false \"\n    (edit) = \" showPostEditForm = false; \"\n  ></post-form-basic-component>\n\n\n\n\n\n\n<comment-form-basic-component\n  *ngIf = \" showCommentForm \"\n  [post] = \" post \"\n  [list] = \" list \"\n  [parent_idx]=\" post.idx \"\n  (create) = \" showCommentForm = false \"\n  (cancel) = \" showCommentForm = false \"\n></comment-form-basic-component>\n"

/***/ }),

/***/ 274:
/***/ (function(module, exports) {

module.exports = "\n\n    <form [formGroup]=\"form\" novalidate>\n\n      <div class=\"row\">\n        <div *ngIf=\" data?.primary_photo?.idx \" class=\"primary-photo\" style=\"position: relative; max-width: 100px;\">\n          <span (click)=\"onClickDeletePhoto()\" class=\"fa-stack fa-lg pointer\" style=\"position: absolute; right: .6em; bottom: .6em;\">\n            <i class=\"fa fa-circle fa-stack-2x fa-inverse\"></i>\n            <i class=\"fa fa-trash fa-stack-1x\"></i>\n          </span>\n          <img class=\"img-thumbnail\" src=\"{{ data.primary_photo.url }}&crop=100x120x80\">\n        </div>\n      </div>\n\n      \n      \n      <div class=\"row\" *ngIf=\" percentage \">\n          <div class=\"progress bg-grey w-100 my-1\">\n            <div class=\"progress-bar\" role=\"progressbar\" [style.width]=\" percentage + '%' \" aria-valuemin=\"0\" aria-valuemax=\"100\">{{ percentage }}%</div>\n          </div>\n      </div>\n\n      <div class=\"row form-group\">\n      \n        <input class=\"form-control-file\" #userfile type=\"file\" (change)=\"onChangeFileUpload( userfile )\">\n      </div>\n      \n\n\n      <ng-container *ngIf=\" ! user.logged \">\n      <div class=\"row\">\n        <input class=\"form-control\" formControlName=\"id\" placeholder=\"User ID\">\n      </div>\n      <div *ngIf=\"formErrors.id\" class=\"alert alert-danger\">\n        {{ formErrors.id }}\n      </div>\n      <div class=\"row\">\n        <input class=\"form-control\" formControlName=\"password\" placeholder=\"Password\">\n      </div>\n      <div *ngIf=\"formErrors.password\" class=\"alert alert-danger\">\n        {{ formErrors.password }}\n      </div>\n      </ng-container>\n      \n      <div class=\"row\" *ngIf=\" user.logged \">\n        {{ user.info.id }}\n      </div>\n\n      <div class=\"row\">\n        <input class=\"form-control\" formControlName=\"name\" placeholder=\"Name\">\n      </div>\n      <div *ngIf=\"formErrors.name\" class=\"alert alert-danger\">\n        {{ formErrors.name }}\n      </div>\n\n      <div class=\"row\">\n        <input class=\"form-control\" formControlName=\"email\" placeholder=\"Email\">\n      </div>\n      <div *ngIf=\"formErrors.email\" class=\"alert alert-danger\">\n        {{ formErrors.email }}\n      </div>\n\n      <div class=\"row\">\n        <input class=\"form-control\" formControlName=\"mobile\" placeholder=\"Mobile\">\n      </div>\n      \n      <div class=\"row\">\n        <div class=\"col-4 col-sm-4\">Gender</div>\n        <div class=\"col-8 col-sm-8\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" formControlName=\"gender\" id=\"inlineRadio1\" value=\"M\"> Male\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" formControlName=\"gender\" id=\"inlineRadio2\" value=\"F\"> Female\n            </label>\n          </div>\n        </div>\n      </div>\n\n\n      \n      <div class=\"row\">\n        <input class=\"form-control\" formControlName=\"birthday\" type=\"date\">\n      </div>\n      \n\n      <div class=\"row\" *ngIf=\" ! user.logged \">\n          <button type=\"button\" class=\"btn btn-success btn-block btn-sm\" (click)=\"onClickRegister()\"\n            [disabled] = \" ! form.valid \"\n          >Register</button>\n      </div>\n      <div class=\"row\" *ngIf=\" user.logged \">\n          <button type=\"button\" class=\"btn btn-success btn-block btn-sm\" (click)=\"onClickUpdate()\"\n          [disabled] = \" ! form.valid \"\n          >Update</button>\n      </div>\n      \n      <div class=\"row\">\n        <button class=\"btn btn-secondary btn-block btn-sm\" type=\"button\" (click)=\"onClickCancel()\">Cancel</button>\n      </div>\n  </form>"

/***/ }),

/***/ 275:
/***/ (function(module, exports) {

module.exports = "<header class=\"navbar fixed-top p-0\">\n  <div class=\"container no-space\">\n    <div class=\"row\">\n      <div class=\"col-12 col-sm-4 col-md-3\">\n        <div class=\"text-center bg-primary\">Backend Admin</div>\n      </div>\n      <div class=\"col-12 col-sm-8 col-md-9\">\n        <div class=\"bg-grey\">\n          <i (click)=\" admin.onClickMenuMore() \" class=\"fa fa-bars\"></i>\n          Bottom line\n        </div>\n      </div>\n    </div>\n  </div>\n</header>"

/***/ }),

/***/ 276:
/***/ (function(module, exports) {

module.exports = "########################\n{{post | json}}"

/***/ }),

/***/ 277:
/***/ (function(module, exports) {

module.exports = "<div class=\"side-menu\">\n  <nav>\n    <ul>\n      <li class=\"heading\" routerLink=\"/\">Application Home</li>\n      <li class=\"heading\" routerLink=\"/admin\">Dashboard Home</li>\n      <li class=\"heading\" routerLink=\"/admin/user\">User</li>\n      <li class=\"heading\" routerLink=\"/admin/forum\">Forum</li>\n      <li class=\"depth-2\" routerLink=\"/admin/forum/configs\">Configs</li>\n      <!--<li class=\"depth-2\" routerLink=\"/admin/forum/categories\">Categories</li>-->\n      <li class=\"depth-2\" routerLink=\"/admin/forum/posts\">Posts</li>\n      <li class=\"heading\">File</li>\n      <!--<li class=\"heading\" routerLink=\"/admin/statistic\">Statistic</li>\n      <li class=\"depth-2\" routerLink=\"/admin/statistic/user\">User</li>\n      <li class=\"depth-2\" routerLink=\"/admin/statistic/posts\">Posts</li>-->\n    </ul>\n  </nav>\n</div>"

/***/ }),

/***/ 278:
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\n<div class=\"container-fluid margin-top-5 mt-sm-5\">\n  <div class=\"row\">\n    <admin-sidebar class=\"{{ admin.hidden_xs_down }} col-sm-3 col-md-2 px-0\"></admin-sidebar>\n    <main class=\"col-12 col-sm-9 col-md-10\">\n      <ng-container>\n        <div class=\"container mb-3\">\n          <h2>Category Create</h2>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">ID</span>\n            <input type=\"text\" class=\"form-control\"  [(ngModel)]=\"categoryCreate.id\"  placeholder=\"Category ID\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Model</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"categoryCreate.model\" placeholder=\"Model\">\n          </div>\n\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Model IDX</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"categoryCreate.model_idx\" placeholder=\"Model IDX\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Name</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"categoryCreate.name\" placeholder=\"Name..\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Description</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"categoryCreate.description\" placeholder=\"Description...\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Parent IDX</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"categoryCreate.parent_idx\" placeholder=\"Parent IDX\">\n          </div>\n          <button (click)=\"onClickCreateCategory()\" type=\"button\">Category Create</button>\n        </div>\n\n\n\n\n        <div class=\"container mb-3\">\n          <h2>Category Search</h2>\n          <div class=\"row\">\n            <div class=\"col\">\n              <div>ID: <input name=\"id\" [(ngModel)]=\"searchCategoryForm.id\" (keyup)=\"onChangeConfigSearch()\"></div>\n            </div>\n            <div class=\"col\">\n              <div>Name: <input name=\"name\" [(ngModel)]=\"searchCategoryForm.name\" (keyup)=\"onChangeConfigSearch()\"></div>\n            </div>\n            <div class=\"col\">\n              <div>Description: <input name=\"description\" [(ngModel)]=\"searchCategoryForm.description\" (keyup)=\"onChangeConfigSearch()\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"container mb-3\">\n\n\n          <h2>Category List</h2>\n\n          <div *ngIf=\"categories\" class=\"pagination-user\" >\n            <table class=\"table table-responsive\">\n              <thead class=\"thead-inverse\">\n              <tr>\n                <th>IDX</th>\n                <th>ID</th>\n                <th>Name</th>\n                <th>Description</th>\n                <th>Moderators</th>\n                <th>List</th>\n                <th>View</th>\n                <th>Write</th>\n                <th>Comment</th>\n                <th class=\"text-center\">Edit</th>\n                <th class=\"text-center\">Delete</th>\n              </tr>\n              </thead>\n              <tbody class=\"users\">\n              <tr *ngFor=\"let category of categories\" class=\"user\">\n                <th scope=\"row\">{{category.idx}}</th>\n                <td>\n                  {{category.id}}\n                </td>\n                <td>\n                  <input type=\"text\" name=\"email\" [(ngModel)]=\"category.model\" placeholder=\"model\">\n                </td>\n                <td>\n                  <input type=\"text\" name=\"email\" [(ngModel)]=\"category.model_idx\" placeholder=\"model_idx\">\n                </td>\n                <td>\n                  <input type=\"text\" name=\"moderator\" [(ngModel)]=\"category.name\" placeholder=\"name\">\n                </td>\n                <td>\n                  <input type=\"number\" name=\"list\" [(ngModel)]=\"category.description\" placeholder=\"description\">\n                </td>\n                <td>\n                  <input type=\"number\" name=\"view\" [(ngModel)]=\"category.parent_idx\" placeholder=\"parent_idx\">\n                </td>\n                <td (click)=\"onClickConfigEdit( category )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-pencil\"></i></td>\n                <td (click)=\"onClickConfigDelete( category.id )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-trash\"></i></td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n          <page-navigation\n            [no_of_total_items]=\" pageOption['totalRecord'] \"\n            [no_of_items_in_one_page] = \" pageOption['limitPerPage'] \"\n            [no_of_pages_in_navigator] = \" pageOption['limitPerNavigation'] \"\n            [no_of_current_page] = \" pageOption['currentPage'] \"\n            [show_prev_next] = \" true \"\n            (pageClick)=\"onConfigPageClick($event)\"\n          >\n          </page-navigation>\n        </div>\n\n      </ng-container>\n\n      <!--<ng-container *ngIf=\"config_idx\">-->\n\n        <!--<div class=\"container mb-3\">-->\n          <!--<h2>Post Search</h2>-->\n          <!--<div class=\"row\">-->\n            <!--<div class=\"col\">-->\n              <!--<div>ID: <input name=\"id\" [(ngModel)]=\"searchPostForm.id\" (keyup)=\"onChangePostSearch()\"></div>-->\n            <!--</div>-->\n            <!--<div class=\"col\">-->\n              <!--<div>Title: <input name=\"title\" [(ngModel)]=\"searchPostForm.title\" (keyup)=\"onChangePostSearch()\"></div>-->\n            <!--</div>-->\n            <!--<div class=\"col\">-->\n              <!--<div>Content: <input name=\"content\" [(ngModel)]=\"searchPostForm.content\" (keyup)=\"onChangePostSearch()\"></div>-->\n            <!--</div>-->\n          <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngFor=\" let post of posts \">-->\n          <!--{{ post.idx }} - -->\n          <!--{{ post.title }} - -->\n          <!--{{ post.created }} - -->\n\n          <!--{{ post.files | json }}-->\n        <!--</div>-->\n\n      <!--</ng-container>-->\n\n\n    </main>\n  </div>\n</div>\n"

/***/ }),

/***/ 279:
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\n<div class=\"container-fluid margin-top-5 mt-sm-5\">\n  <div class=\"row\">\n    <admin-sidebar class=\"{{ admin.hidden_xs_down }} col-sm-3 col-md-2 px-0\"></admin-sidebar>\n    <main class=\"col-12 col-sm-9 col-md-10\">\n      <ng-container>\n        <div class=\"container mb-3\">\n          <h2>Forum Create</h2>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">ID</span>\n            <input type=\"text\" class=\"form-control\"  [(ngModel)]=\"configCreate.id\"  placeholder=\"Forum ID\">\n          </div>\n\n\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Name</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"configCreate.name\" placeholder=\"Forum Name\">\n          </div>\n\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Description</span>\n            <textarea rows=\"1\" class=\"form-control\" [(ngModel)]=\"configCreate.description\" placeholder=\"Forum description....\"></textarea>\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Moderators</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"configCreate.moderators\" placeholder=\"Moderators....\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Level List</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"configCreate.level_list\" placeholder=\"Level List....\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Level View</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"configCreate.level_view\" placeholder=\"Level View....\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Level Write</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"configCreate.level_write\" placeholder=\"Level Write....\">\n          </div>\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\">Level Comment</span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"configCreate.level_comment\" placeholder=\"Level Comment....\">\n          </div>\n\n\n          <button (click)=\"onClickCreateForum()\" type=\"button\">Forum Create</button>\n        </div>\n\n\n\n\n        <div class=\"container mb-3\">\n          <h2>Forum Search</h2>\n          <div class=\"row\">\n            <div class=\"col\">\n              <div>ID: <input name=\"id\" [(ngModel)]=\"searchConfigForm.id\" (keyup)=\"onChangeConfigSearch()\"></div>\n            </div>\n            <div class=\"col\">\n              <div>Name: <input name=\"name\" [(ngModel)]=\"searchConfigForm.name\" (keyup)=\"onChangeConfigSearch()\"></div>\n            </div>\n            <div class=\"col\">\n              <div>Description: <input name=\"description\" [(ngModel)]=\"searchConfigForm.description\" (keyup)=\"onChangeConfigSearch()\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"container mb-3\">\n\n\n          <h2>Forum List</h2>\n\n          <div *ngIf=\"postConfigs\" class=\"pagination-user\" >\n            <table class=\"table table-responsive\">\n              <thead class=\"thead-inverse\">\n              <tr>\n                <th>IDX</th>\n                <th>ID</th>\n                <th>Name</th>\n                <th>Description</th>\n                <th>Moderators</th>\n                <th>List</th>\n                <th>View</th>\n                <th>Write</th>\n                <th>Comment</th>\n                <th class=\"text-center\">Edit</th>\n                <th class=\"text-center\">Delete</th>\n              </tr>\n              </thead>\n              <tbody class=\"users\">\n              <tr *ngFor=\"let config of postConfigs\" class=\"user\">\n                <th scope=\"row\">{{config.idx}}</th>\n                <td>\n                  <div routerLink=\"/admin/forum/posts/{{config.id}}\" role=\"button\">{{config.id}}</div>\n                </td>\n                <td>\n                  <input type=\"text\" name=\"name\" [(ngModel)]=\"config.name\" placeholder=\"Name\">\n                </td>\n                <td>\n                  <input type=\"text\" name=\"description\" [(ngModel)]=\"config.description\" placeholder=\"Description\">\n                </td>\n                <td>\n                  <input type=\"text\" name=\"moderator\" [(ngModel)]=\"config.moderators\" placeholder=\"Moderator\">\n                </td>\n                <td>\n                  <input type=\"number\" name=\"list\" [(ngModel)]=\"config.level_list\" placeholder=\"Level List\">\n                </td>\n                <td>\n                  <input type=\"number\" name=\"view\" [(ngModel)]=\"config.level_view\" placeholder=\"Level View\">\n                </td>\n                <td>\n                  <input type=\"number\" name=\"write\" [(ngModel)]=\"config.level_write\" placeholder=\"Level Write\">\n                </td>\n                <td>\n                  <input type=\"number\" name=\"comment\" [(ngModel)]=\"config.level_comment\" placeholder=\"Level Comment\">\n                </td>\n                <td (click)=\"onClickConfigEdit( config )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-pencil\"></i></td>\n                <td (click)=\"onClickConfigDelete( config.id )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-trash\"></i></td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n          <page-navigation\n            [no_of_total_items]=\" pageOption['totalRecord'] \"\n            [no_of_items_in_one_page] = \" pageOption['limitPerPage'] \"\n            [no_of_pages_in_navigator] = \" pageOption['limitPerNavigation'] \"\n            [no_of_current_page] = \" pageOption['currentPage'] \"\n            [show_prev_next] = \" true \"\n            (pageClick)=\"onConfigPageClick($event)\"\n          >\n          </page-navigation>\n        </div>\n\n      </ng-container>\n    </main>\n  </div>\n</div>\n"

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(174);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import { Optional } from '@angular/core';

var Base = (function (_super) {
    __extends(Base, _super);
    function Base(http, taxonomy) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.taxonomy = taxonomy;
        return _this;
    }
    /**
     *
     *
     *
     * @param req
     *
     * @code example code.
        this.config.list( {} ).subscribe( res => {
          
            console.log(res);
        }, err => {
            console.log(err);
        });
        
     *
     * @endcode
     *
     * @code
        this.config.list( {page: 2} ).subscribe( res => { } ); // get items of page no 2 of post_config
        this.user.list( { page: 2, limit: 3 } ).subscribe( res => { }); // get 2nd page of users. A pages has 3 users.
        this.config.list( { page: 1, limit: 3, where: 'id LIKE ?', bind: 'my%' } ).subscribe( res => { } ); // get upto 3 post_configs whose id begins with 'my'
        this.config.list( { limit: 1, where: 'id LIKE ?', bind: 'my%', order: 'idx DESC' } ).subscribe( res => {} ); // get the newly created post_config whose id begins with 'my'. only one data will be returned.
     * @endcode
     *
     */
    Base.prototype.list = function (req) {
        if (req === void 0) { req = {}; }
        req['route'] = this.taxonomy + '.list';
        /**
         * @deprecated code. // Pagination helper.
         *
         * To make it clear and easy understanding,
         *
         */
        // if ( ! req['limit'] ) req.limit = NO_OF_ITEMS_PER_PAGE;
        // if ( req['page'] ) {
        //     let page = req['page'] > 0 ? req['page'] : 1;
        //     let limit = req.limit;
        //     req.from =  ( page - 1 ) * limit;
        //     delete( req.page );
        // }
        //
        // req.session_id = this.getSessionId();
        return this.post(req);
    };
    Base.prototype.create = function (req) {
        if (req === void 0) { req = {}; }
        req['route'] = this.taxonomy + '.create';
        return this.post(req);
    };
    Base.prototype.delete = function (idx) {
        var req = {
            route: this.taxonomy + '.delete'
        };
        /// bug fix: if idx is numeric, then it is a number.
        var no = parseInt(idx);
        if (Number.isInteger(no))
            req.idx = idx;
        else
            req.id = idx;
        return this.post(req);
    };
    Base.prototype.edit = function (req) {
        if (req === void 0) { req = {}; }
        req['route'] = this.taxonomy + '.edit';
        return this.post(req);
    };
    Base.prototype.data = function (idx) {
        var req = {
            route: this.taxonomy + '.data'
        };
        if (idx) {
            if (!isNaN(idx))
                req.idx = idx;
            else
                req.id = idx;
        }
        return this.post(req);
    };
    Base.prototype.vote = function (idx, choice) {
        if (choice === void 0) { choice = 'G'; }
        var req = {
            route: this.taxonomy + '.vote',
            idx: idx,
            choice: choice
        };
        return this.post(req);
    };
    Base.prototype.report = function (idx) {
        var req = {
            route: this.taxonomy + '.report',
            idx: idx
        };
        return this.post(req);
    };
    /**
     *
     * Common api.
     *
     * @param idx
     */
    Base.prototype.fileUrl = function (idx) {
        return this.backendUrl() + '?route=download&idx=' + idx;
    };
    return Base;
}(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* Api */]));

//# sourceMappingURL=base.js.map

/***/ }),

/***/ 280:
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\n<div class=\"container-fluid margin-top-5 mt-sm-5\">\n  <div class=\"row\">\n    <admin-sidebar class=\"{{ admin.hidden_xs_down }} col-sm-3 col-md-2 px-0\"></admin-sidebar>\n    \n    \n    \n    <main class=\"col-12 col-sm-9 col-md-10\">\n\n      <button *ngIf=\" ! showPostForm \" (click)=\" postPostForm = {}; showPostForm = true \" class=\"btn btn-secondary\">Create New Post</button>      \n\n      <post-form-basic-component\n        *ngIf=\" showPostForm \"\n        [post_config_id] = \" 'qna' \"\n        [post] = \" postPostForm \"\n        (create) = \" reloadPosts() \"\n        (edit) = \" showPostForm = false \"\n        (cancel) = \" showPostForm = false \"\n      ></post-form-basic-component>\n\n\n      <div class=\"container mb-3\">\n        <h2>Post Search</h2>\n        <div class=\"row\">\n          <div class=\"col\">\n            <div>\n              Forums: Input forum id you want to search. Separate by comma(,)\n              <select class=\"form-control\" [(ngModel)]=\"post_config_id\" (change)=\"onChangePostSearch()\">\n                <option value=\"\">All</option>\n                <option *ngFor=\"let config of postConfigs\" value=\"{{config.id}}\">{{config.name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"col\">\n            <div>Title <input name=\"title\" [(ngModel)]=\"searchPostForm.title\" (keyup)=\"onChangePostSearch()\"></div>\n          </div>\n          <div class=\"col\">\n            <div>Content <input name=\"content\" [(ngModel)]=\"searchPostForm.content\" (keyup)=\"onChangePostSearch()\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"container mb-3\">\n\n\n        <h2>Post List</h2>\n\n        <div *ngIf=\"posts\" class=\"pagination-user\" >\n          <table class=\"table table-responsive\">\n            <thead class=\"thead-inverse\">\n            <tr>\n              <th>E</th>\n              <th>IDX</th>\n              <th>Config IDX</th>\n              <th>Title</th>\n              <th>Content</th>\n              <th>Attached</th>\n              <th class=\"text-center\">Edit</th>\n              <th class=\"text-center\">Delete</th>\n            </tr>\n            </thead>\n            <tbody class=\"users\">\n            <tr *ngFor=\"let post of posts\" class=\"post\" role=\"button\" [ngClass]=\"{strikeout: post.deleted == '1'}\">\n              <td (click)=\" postPostForm = post; showPostForm = true \" class=\"text-center\" role=\"button\"><i class=\"fa fa-pencil\"></i></td>\n              \n              <th scope=\"row\" (click)=\"onClickShowPostDetail(post.idx)\">\n                {{post.idx}}\n              </th>\n              <td>\n                {{post.post_config_idx}}\n              </td>\n              <td>\n                <input [disabled]=\"post.deleted == '1'\" type=\"text\" name=\"title\" [(ngModel)]=\"post.title\" placeholder=\"Title\">\n              </td>\n              <td>\n                <input [disabled]=\"post.deleted == '1'\" type=\"text\" name=\"content\" [(ngModel)]=\"post.content\" placeholder=\"Content\">\n              </td>\n              <td>\n                <div *ngFor=\" let _file of post.files \">\n                  <img style=\"width:25%; float:left;\" src=\"{{ _file.url }}\">\n                </div>\n              </td>\n              <td (click)=\"onClickPostEdit( post )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-pencil\"></i></td>\n              <td (click)=\"onClickPostDelete( post )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-trash\"></i></td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n        <page-navigation\n                [no_of_total_items]=\" pageOption['totalRecord'] \"\n                [no_of_items_in_one_page] = \" pageOption['limitPerPage'] \"\n                [no_of_pages_in_navigator] = \" pageOption['limitPerNavigation'] \"\n                [no_of_current_page] = \" pageOption['currentPage'] \"\n                [show_prev_next] = \" true \"\n                (pageClick)=\"onPostPageClick($event)\"\n        >\n        </page-navigation>\n      </div>\n    </main>\n  </div>\n</div>\n"

/***/ }),

/***/ 281:
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\n<div class=\"container-fluid margin-top-5 mt-sm-5\">\n  <div class=\"row\">\n    <admin-sidebar class=\"{{ admin.hidden_xs_down }} col-sm-3 col-md-2 px-0\"></admin-sidebar>\n    <main class=\"col-12 col-sm-9 col-md-10\">\n\n      <div classs=\"container\">\n        <section class=\"row\">\n          <div class=\"col-sm-6 col-md-3\">\n            <info-box [title]=\"\" content=\"\"></info-box>\n          </div>\n          <div class=\"col-sm-6 col-md-3\">\n            <info-box></info-box>\n          </div>\n          <div class=\"col-sm-6 col-md-3\">\n            <info-box></info-box>\n          </div>\n          <div class=\"col-sm-6 col-md-3\">\n            <info-box></info-box>\n          </div>\n        </section>\n\n      <div class=\"container px-0\">\n        <div class=\"row fs-80\">\n          <div class=\"col\">\n            <progress-group></progress-group>\n          </div>\n          <div class=\"col\">\n            <progress-group></progress-group>\n          </div>\n          <div class=\"col\">\n            <progress-group></progress-group>\n          </div>\n        </div>\n      </div>\n\n\n          \n      </div>\n\n\n    </main>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 282:
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\n<div class=\"container-fluid margin-top-5 mt-sm-5\">\n  <div class=\"row\">\n    <admin-sidebar class=\"{{ admin.hidden_xs_down }} col-sm-3 col-md-2 px-0\"></admin-sidebar>\n    <main class=\"col-12 col-sm-9 col-md-10\">\n        <div>\n            <input #userfileEdit type=\"file\">\n            <div class=\"progress\" *ngIf=\"percentage\">{{percentage}}%</div>\n            <img src=\"{{ edit_src_photo }}\" width=\"100%\">\n            <div>Name: <input name=\"name\" [(ngModel)]=\"edit.name\"></div>\n            <div>Email: <input name=\"email\" [(ngModel)]=\"edit.email\"></div>\n            <div>Gender<input name=\"gender\" [(ngModel)]=\"edit.gender\"></div>\n            <div><button (click)=\"onClickUpdateProfile()\" type=\"button\">Update Profile</button></div>\n        </div>\n    </main>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 283:
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\n<div class=\"container-fluid margin-top-5 mt-sm-5\">\n  <div class=\"row\">\n    <admin-sidebar class=\"{{ admin.hidden_xs_down }} col-sm-3 col-md-2 px-0\"></admin-sidebar>\n    <main class=\"col-12 col-sm-9 col-md-10\">\n\n\n\n      <h2>User management By admin</h2>\n\n      <div class=\"container mb-3\">\n        <div class=\"row\">\n          <div class=\"col\">\n            <div>UserID: <input name=\"id\" [(ngModel)]=\"searchForm.id\" (keyup)=\"onChangeSearch()\"></div>\n          </div>\n          <div class=\"col\">\n            <div>Name: <input name=\"name\" [(ngModel)]=\"searchForm.name\" (keyup)=\"onChangeSearch()\"></div>\n          </div>\n          <div class=\"col\">\n            <div>Email: <input name=\"email\" [(ngModel)]=\"searchForm.email\" (keyup)=\"onChangeSearch()\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div *ngIf=\"paginationUsers\" class=\"pagination-user\" >\n        <table class=\"table\">\n          <thead class=\"thead-inverse\">\n          <tr>\n            <th>IDX</th>\n            <th>User ID</th>\n            <th>Name</th>\n            <th>Gender</th>\n            <th>Email</th>\n            <th class=\"text-center\">Edit</th>\n            <th class=\"text-center\">Delete</th>\n          </tr>\n          </thead>\n          <tbody class=\"users\">\n          <tr *ngFor=\"let user of paginationUsers\" class=\"user\">\n            <th scope=\"row\">{{user.idx}}</th>\n            <td>\n              {{user.id}}\n            </td>\n            <td>\n              <input type=\"email\" name=\"email\" [(ngModel)]=\"user.name\" placeholder=\"Name\">\n            </td>\n            <td>\n              <input type=\"text\" name=\"gender\" [(ngModel)]=\"user.gender\" placeholder=\"M/F\">\n            </td>\n            <td>\n              <input type=\"email\" name=\"email\" [(ngModel)]=\"user.email\" placeholder=\"Email Address\">\n            </td>\n            <td (click)=\"onClickEdit( user )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-pencil\"></i></td>\n            <td (click)=\"onClickDelete( user.id )\" class=\"text-center\" role=\"button\"><i class=\"fa fa-trash\"></i></td>\n          </tr>\n          </tbody>\n        </table>\n        <page-navigation\n                [no_of_total_items]=\" totalRecord \"\n                [no_of_items_in_one_page] = \" limitPerPage \"\n                [no_of_pages_in_navigator] = \" numberPerNav \"\n                [no_of_current_page] = \" currentPage \"\n                [show_prev_next] = \" true \"\n                (pageClick)=\"onPageClick($event)\"\n        >\n        </page-navigation>\n      </div>\n\n    </main>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

module.exports = "<div class=\"info-box {{infoBoxClass}}\">\n  <div class=\"icon {{iconclass}}\"><i class=\"fa {{iClass}}\"></i></div>\n  <div class=\"text {{textClass}}\">\n    <div class=\"title {{titleClass}}\"  innerHTML=\"{{titleInnerHTML}}\"></div>\n    <div class=\"content {{contentClass}}\" innerHTML=\"{{contentInnerHTML}}\"></div>\n  </div>\n</div>\n"

/***/ }),

/***/ 285:
/***/ (function(module, exports) {

module.exports = "<div class=\"progress-group\">\n  <span class=\"text\">Cart</span>\n  <span class=\"number\"><b>160</b>/200</span>\n\n  <div class=\"progress sm\">\n    <div class=\"progress-bar progress-bar-aqua\" style=\"width: 80%; height: .2em;\"></div>\n  </div>\n</div>\n"

/***/ }),

/***/ 286:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

module.exports = "<div class=\"article-list p-1\">\n\n  <div *ngIf=\" ! lists.length \" class=\"alert alert-success\">\n    <i class=\"fa fa-spin fa-spinner\"></i>\n    Loading <b>{{ post_config_id }}</b> forum ...\n  </div>\n  \n  \n\n  <div *ngIf=\" option?.showTitle == true && lists[0] && lists[0]?.data?.configs.length \"\n    class=\"alert alert-info border-0 rounded-0 mb-2\">\n    <div>{{ lists[0].data.configs[0].name }} / {{ lists[0].data.configs[0].description }}</div>\n  </div>\n\n\n    <div *ngIf=\" option?.showCreateButton == true && postData.info.id == 'admin' \" class=\"d-flex justify-content-end\">\n        <button *ngIf=\" ! showPostForm \" (click)=\" showPostForm = true \"\n            class=\"btn btn-secondary mb-0 border-0 bg-lightgrey\">Create New Post</button>\n    </div>\n\n    <post-form-basic-component\n        *ngIf=\" showPostForm \"\n        [post_config_id] = \" post_config_id \"\n        [option] = \" {\n            showForumID: false,\n            showTitle: true,\n            showContent: false,\n            showLink: true\n        } \"\n        [post] = \" postPostForm \"\n        (create) = \" lists[0].data.posts.unshift( $event ); showPostForm = false \"\n        (edit) = \" showPostForm = false \"\n        (cancel) = \" showPostForm = false \"\n    ></post-form-basic-component>\n\n    <section class=\"posts\">\n        <ng-container *ngIf=\" lists.length \">\n            <ng-container *ngFor=\" let list of lists \">\n                <article *ngFor=\" let post of list.data.posts \" class=\"mb-1\">\n\n<!-- Post View -->\n<div class=\"card w-50 float-left border-0 pointer\">\n    <a href=\"{{ post.link }}\" target=\"_blank\" class=\"\">\n        <img class=\"card-img p-1 w-100\" src=\"{{\n            post.first_image_idx && post.first_image_idx != '0' ? postData.fileUrl( post.first_image_idx ) + '&crop=240x160x80' : 'assets/img/grey.jpg'\n        }}\" style=\"min-height: 60px;\">\n\n        <div class=\"card-img-overlay p-1 d-flex\">\n            <h4 class=\"card-title w-100 m-0 p-2 align-self-end fs-1\" style=\"background: rgba(229, 235, 243, 0.9); color: #303331;\">{{ post.title }}</h4>\n        </div>\n    </a>\n\n    <div class=\"favorite ptr p-2\" [class.active]=\" isFavorite( post ) \" style=\"opacity: .8;\" (click)=\"onClickFavorite(post)\">\n        <span class=\"fa-stack fa-lg fs-1\">\n            <i class=\"fa fa-circle fa-stack-2x white\"></i>\n            <i class=\"fa fa-star fa-stack-1x grey\"></i>\n        </span>\n    </div>\n\n</div>\n<!-- EO Post View -->\n\n                </article>\n            </ng-container>\n        </ng-container>\n    </section>\n\n\n    <div class=\"no-more-posts alert alert-info\" *ngIf=\" inLoading \">\n       <i class=\"fa fa-spinner fa-spin\"></i>  more posts ...\n    </div>\n\n\n    <div class=\"no-more-posts alert alert-info\" *ngIf=\" noMorePosts \">\n        No more posts...\n    </div>\n</div>"

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

module.exports = "<header class=\"fixed-top header-box bg-menu\">\n    <div class=\"logo h-60 p-2\">\n        <div class=\"d-flex justify-content-between pointers\">\n            <div (click)=\" showPanel = !showPanel \"  class=\"p-2\"><i class=\"fa fa-bars fa-inverse fs-130\"></i></div>\n            <div class=\"white p-2\" routerLink=\"/\">여자앱</div>\n            <div><i class=\"p-2 fa fa-share fa-inverse fs-120\"></i></div>\n        </div>\n    </div>\n    <div class=\"menu d-flex justify-content-center h-50 bg-lightgrey pointers\">\n        <div class=\"p-2\" routerLink=\"/\">전체보기</div>\n        <div class=\"p-2\" routerLink=\"/forum/interest\">여자들의 관심사</div>\n        <div class=\"p-2\" routerLink=\"/forum/fashion-style\">패션 스타일</div>\n    </div>\n</header>\n\n<section class=\"p-absolute bg-menu white z-index-high\" [class.d-none]=\" !showPanel \">\n    <nav>\n        <ul class=\"panel\">\n            <li routerLink=\"/favorite\"><i class=\"fa fa-bookmark\"></i> 내가 찜한 게시물</li>\n            <li routerLink=\"/forum/book\"><i class=\"fa fa-book\"></i> 책 읽는 여자</li>\n            <li routerLink=\"/forum/love\"><i class=\"fa fa-heart-o\"></i> 연애성장백서</li>\n            <li routerLink=\"/forum/wedding\"><i class=\"fa fa-venus-mars\"></i> 웨딩스토리</li>\n            <li (click)=\"onClickReport()\"><i class=\"fa fa-flag\"></i> 오류, 건의, 신고</li>\n            <li (click)=\"onClickReport()\"><i class=\"fa fa-share-alt\"></i> 앱 공유하기</li>\n            <li><i class=\"fa fa-vk\"></i> 소장하고 싶은 여자들의 모든 것</li>\n            <li routerLink=\"/admin\"><i class=\"fa fa-gear\"></i> 관리자</li>\n            <li *ngIf=\" ! user.logged \" routerLink=\"/login\"><i class=\"fa fa-sign-in\"></i> 로그인</li>\n            <li *ngIf=\" user.logged \" routerLink=\"/password-change\"><i class=\"fa fa-key\"></i> 비밀번호 변경</li>\n            <li *ngIf=\" user.logged \" (click)=\"onClickLogout()\"><i class=\"fa fa-sign-out\"></i> 로그아웃</li>\n        </ul>\n    </nav>\n</section>\n"

/***/ }),

/***/ 289:
/***/ (function(module, exports) {

module.exports = "<header-component></header-component>\n<article-list-component\n    [option]=\"{\n        showTitle: true,\n        showCreateButton: true\n        }\"\n></article-list-component>\n\n\n"

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AdminService = (function () {
    function AdminService() {
        this.hidden_xs_down = "hidden-xs-down";
    }
    AdminService.prototype.onClickMenuMore = function () {
        this.hidden_xs_down = this.hidden_xs_down ? null : 'hidden-xs-down';
    };
    return AdminService;
}());
AdminService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])()
], AdminService);

//# sourceMappingURL=admin.service.js.map

/***/ }),

/***/ 290:
/***/ (function(module, exports) {

module.exports = "<header-component></header-component>\n<article-list-component\n    [option] = \"{\n        showTitle: false,\n        showCreateButton: false\n        }\"\n></article-list-component>"

/***/ }),

/***/ 291:
/***/ (function(module, exports) {

module.exports = "<header-component></header-component>\n<div class=\"container\">\n\n\n    <h2 class=\"\">Please sign in</h2>\n    <login-form-basic-component\n      (login)=\" router.navigate(['/']) \"\n      (cancel)=\" router.navigate(['/']) \"\n      (error)= \" error = $event \"\n    ></login-form-basic-component>\n\n    <div *ngIf=\" error \" class=\"alert alert-danger\">\n      {{ error }}\n    </div>\n\n\n</div> <!-- /container -->\n"

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

module.exports = "<header-component></header-component>\n<div class=\"container\">\n\n    <password-change-form-basic-component\n        (cancel)=\"router.navigateByUrl('/')\"\n        (update)=\"router.navigateByUrl('/')\"\n    ></password-change-form-basic-component>\n\n</div> <!-- /container -->\n"

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(168);


/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Backend", function() { return Backend; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Backend = (function (_super) {
    __extends(Backend, _super);
    function Backend(http) {
        return _super.call(this, http, '') || this;
    }
    return Backend;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
Backend = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], Backend);

var _a;
//# sourceMappingURL=backend.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { KEY_SESSION_ID } from './defines';
var User = (function (_super) {
    __extends(User, _super);
    function User(http) {
        return _super.call(this, http, 'user') || this;
    }
    /**
     *
     *
     * Gets user data from backend.
     *
     * @note User can only get his data. so, no need to get 'session_id' as parameter. Just get it from localStorage.
     *
     *
     * @code

        let req : USER_REGISTER_REQUEST_DATA = {
            id:         this.id,
            password:   this.password,
            name:       this.name,
            nickname:   this.nickname,
            email:      this.email,
            mobile:     this.mobile,
            landline:   this.landline,
            gender:     this.gender,
            birthday:   this.birthday,
            meta:       {
                type: this.type,
                classid: 'my-skype-id'
            }
        }
        console.log(req);
        this.user.register( req, ( res: USER_REGISTER_RESPONSE_DATA ) => {
            console.info('register success: ', res);
        },
        error => alert(error),
        () => console.log('user registration complete') );

     * @endcode
     */
    User.prototype.data = function (id) {
        // if id is empty, it will get self data.
        // if ( id === void 0 ) id = this.info.id;
        if (this.logged == false)
            return this.error(-420, 'login-first-before-get-user-info');
        return _super.prototype.data.call(this, id);
    };
    User.prototype.register = function (req) {
        var _this = this;
        if (req.id === void 0 || !req.id)
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(this.errorResponse(-4291, 'user-id-is-required-for-register'));
        if (req.password === void 0 || req.password.length < 5)
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(this.errorResponse(-4292, 'password-is-required-and-must-be-at-least-5-characters-long-for-register'));
        req.route = 'register';
        return this.post(req)
            .map(function (res) {
            _this.setSessionInfo(res);
            return res;
        });
    };
    User.prototype.edit = function (req) {
        var _this = this;
        console.log('edit::req', req);
        if (this.logged == false)
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(this.errorResponse(-421, 'login-first-before-edit'));
        // if ( req['id'] !== void 0 ) return Observable.throw( this.errorResponse( -422, 'id-has-passed-over-form-submission--user-cannot-edit-id') );
        if (req['password'] !== void 0)
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(this.errorResponse(-423, 'password-has-passed-over-form-submission--user-cannot-edit-password-on-edit-form'));
        return _super.prototype.edit.call(this, req)
            .map(function (res) {
            //console.log('edit res: ', res );
            _this.setSessionInfo(res);
            return res;
        });
    };
    User.prototype.login = function (req) {
        var _this = this;
        req.route = 'login';
        return this.post(req)
            .map(function (res) {
            _this.setSessionInfo(res);
            return res;
        });
    };
    User.prototype.logout = function () {
        var req = {
            route: 'logout'
        };
        var observable = this.post(req);
        this.deleteSessionInfo();
        return observable;
    };
    User.prototype.changePassword = function (req) {
        var _this = this;
        req.route = 'change_password';
        return this.post(req)
            .map(function (res) {
            _this.deleteSessionInfo();
            return res;
        });
    };
    return User;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
User = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], User);

var _a;
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ProgressService = (function () {
    function ProgressService() {
        //downloadProgress: Subject<any> = new Subject();
        this.uploadProgress = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    return ProgressService;
}());
ProgressService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])()
], ProgressService);

//# sourceMappingURL=progress.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_backend__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_user__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_post_data__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_post_config__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_post_comment__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test_test__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_file__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_meta__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_category__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_progress__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_custom_browser_xhr__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__interface__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_13__interface__, "_COMMENT")) __webpack_require__.d(__webpack_exports__, "_COMMENT", function() { return __WEBPACK_IMPORTED_MODULE_13__interface__["_COMMENT"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_13__interface__, "_POST")) __webpack_require__.d(__webpack_exports__, "_POST", function() { return __WEBPACK_IMPORTED_MODULE_13__interface__["_POST"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_13__interface__, "_POST_LIST_RESPONSE")) __webpack_require__.d(__webpack_exports__, "_POST_LIST_RESPONSE", function() { return __WEBPACK_IMPORTED_MODULE_13__interface__["_POST_LIST_RESPONSE"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_13__interface__, "ERROR_WRONG_SESSION_ID")) __webpack_require__.d(__webpack_exports__, "ERROR_WRONG_SESSION_ID", function() { return __WEBPACK_IMPORTED_MODULE_13__interface__["ERROR_WRONG_SESSION_ID"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__define__ = __webpack_require__(17);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ERROR_WRONG_SESSION_ID", function() { return __WEBPACK_IMPORTED_MODULE_14__define__["i"]; });
/* unused harmony reexport Backend */
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__model_user__, "User")) __webpack_require__.d(__webpack_exports__, "User", function() { return __WEBPACK_IMPORTED_MODULE_2__model_user__["User"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__model_post_config__, "PostConfig")) __webpack_require__.d(__webpack_exports__, "PostConfig", function() { return __WEBPACK_IMPORTED_MODULE_4__model_post_config__["PostConfig"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__model_post_data__, "PostData")) __webpack_require__.d(__webpack_exports__, "PostData", function() { return __WEBPACK_IMPORTED_MODULE_3__model_post_data__["PostData"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__model_post_comment__, "PostComment")) __webpack_require__.d(__webpack_exports__, "PostComment", function() { return __WEBPACK_IMPORTED_MODULE_5__model_post_comment__["PostComment"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__model_file__, "File")) __webpack_require__.d(__webpack_exports__, "File", function() { return __WEBPACK_IMPORTED_MODULE_7__model_file__["File"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_8__model_meta__, "Meta")) __webpack_require__.d(__webpack_exports__, "Meta", function() { return __WEBPACK_IMPORTED_MODULE_8__model_meta__["Meta"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_9__model_category__, "Category")) __webpack_require__.d(__webpack_exports__, "Category", function() { return __WEBPACK_IMPORTED_MODULE_9__model_category__["Category"]; });
/* unused harmony reexport Test */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularBackend", function() { return AngularBackend; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var AngularBackend = (function () {
    function AngularBackend() {
    }
    return AngularBackend;
}());
AngularBackend = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [],
        imports: [],
        providers: [__WEBPACK_IMPORTED_MODULE_1__model_backend__["Backend"],
            __WEBPACK_IMPORTED_MODULE_2__model_user__["User"],
            __WEBPACK_IMPORTED_MODULE_4__model_post_config__["PostConfig"],
            __WEBPACK_IMPORTED_MODULE_3__model_post_data__["PostData"],
            __WEBPACK_IMPORTED_MODULE_5__model_post_comment__["PostComment"],
            __WEBPACK_IMPORTED_MODULE_6__test_test__["a" /* Test */],
            __WEBPACK_IMPORTED_MODULE_7__model_file__["File"],
            __WEBPACK_IMPORTED_MODULE_8__model_meta__["Meta"],
            __WEBPACK_IMPORTED_MODULE_9__model_category__["Category"],
            __WEBPACK_IMPORTED_MODULE_10__services_progress__["a" /* ProgressService */],
            { provide: __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* BrowserXhr */], useClass: __WEBPACK_IMPORTED_MODULE_12__services_custom_browser_xhr__["a" /* CustomBrowserXhr */] }]
    })
], AngularBackend);

//# sourceMappingURL=angular-backend.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageScroll; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 *
 *
 *
 *
 *
 * @note 페이지가 열리거나 reload 할 때, 스크롤이 이미 되어져 있다면, 즉, 현재 페이지를 reload 하면, Y 스크롤바 엮시 유지가 되는데, 이렇게 되면, 페이지가 열리자 마자 이미 스크롤리 되어버린 상태이다.
 *      이 경우, scroll 이벤트가 한번 발생한다.
 *
 * @code Example codes.
 
    watch = null;
    inLoading: boolean = false;
    pageNo: number = 0;
    ngOnInit() {
      this.watch = this.pageScroll.watch( 'section.content' ).subscribe( e => {
        if ( this.inLoading ) {
          console.info("Page is in loading...");
          return;
        }
        this.inLoading = true;
        this.pageNo ++;
        console.info("Going to load Page No. ", this.pageNo );
        setTimeout( () => { this.inLoading = false; console.info(`Page No. ${this.pageNo} loaded!`); }, 3000 );
      });
    }
    
    ngOnDestroy() {
      this.watch.unsubscribe();
    }

 * @endcode
 *
 *
 * @code example 2
    
    
    constructor( private pageScroll: PageScroll ) {
        this.loadPage();
    }
    ngOnInit() {
      this.watch = this.pageScroll.watch( 'section.content', 350 ).subscribe( e => this.loadPage() );
    }
    
    ngOnDestroy() {
      this.watch.unsubscribe();
    }

    loadPage() {
      if ( this.inLoading ) return;
      this.inLoading = true;
      this.pageNo++;

      let option: PAGE_OPTION = {
        post_id: POST_ID,
        page_no: this.pageNo
      };

      this.post.page( option, (page: PAGE) => {
          this.inLoading = false;
          if ( page.posts.length == 0 || page.posts.length < LIMIT ) {
            this.noMorePosts = true;
          }
          this.pages.push( page );
      },
      error => {
        this.inLoading = false;
      },
      () => {} );
  }

 *
 *
 *
 * @endcode
 *
 */


var PageScroll = (function () {
    function PageScroll() {
        this.scrollCount = 0;
        this.scrollCountOnDistance = 0;
    }
    /**
     *
     * @attention - distance 거리에서는 이벤트가 계속 발생하므로, 이 함수를 사용하는 코드에서 적절히 사용해야 한다.
     *      예를 들면, 게시판 글을 무한 로딩한다면, 아래와 같이 하면 된다.
     *          (1) 로딩 중이 아니면,
     *          (2) 로딩 중이라고 표시하고, (페이지를 1 증가하고,) 다음 페이지를 로딩한다.
     *          (3) 로딩이 끝나면, 로딩 중이 아니라고 표시한다.
     *
     *
     * @param selector - 어떤 element 를 스크롤 할 지 선택한다.
     * @param distance - bottom 으로 부터 얼마나 거리를 둘지, 그 거리 내에 들어가면 scroll 이벤트를 발생 시킬지를 결정한다.
     *
     *
     * @return Observable
     */
    PageScroll.prototype.watch = function (selector, distance) {
        var _this = this;
        if (distance === void 0) { distance = 300; }
        var element = document.querySelector(selector);
        if (element === void 0 || !element) {
            console.error("No element to watch on scrolling. Wrong query selector.");
            return;
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].fromEvent(document, 'scroll') // 스크롤은 window 또는 document 에서 발생.
            .debounceTime(100)
            .map(function (e) {
            _this.scrollCount++;
            // console.log("scrollCount: ", this.scrollCount);
            return e;
        })
            .filter(function (x) {
            if (element['offsetTop'] === void 0)
                return false; // @attention this is error handling for some reason, especially on first loading of each forum, it creates "'offsetTop' of undefined" error.
            var elementHeight = element['offsetTop'] + element['clientHeight'];
            var windowYPosition = window.pageYOffset + window.innerHeight;
            // console.log("page scroll reaches at bottom: windowYPosition=" + windowYPosition + ", elementHeight-distance=" + (elementHeight-distance));
            if (windowYPosition > elementHeight - distance) {
                _this.scrollCountOnDistance++;
                // console.log( "scrollCountOnDistance", this.scrollCountOnDistance );
                return true;
            }
            return false;
        });
    };
    PageScroll.prototype.stop = function () {
    };
    return PageScroll;
}());
PageScroll = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], PageScroll);

//# sourceMappingURL=page-scroll.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_admin_index_index__ = __webpack_require__(109);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__pages_admin_index_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_admin_user_list_list__ = __webpack_require__(111);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__pages_admin_user_list_list__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_admin_user_edit_edit__ = __webpack_require__(110);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__pages_admin_user_edit_edit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_admin_forum_config_config__ = __webpack_require__(107);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__pages_admin_forum_config_config__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_admin_forum_category_category__ = __webpack_require__(106);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_8__pages_admin_forum_category_category__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_admin_forum_post_post__ = __webpack_require__(108);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_9__pages_admin_forum_post_post__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_admin_components_header_header__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_admin_components_sidebar_sidebar__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_components_info_box_info_box__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_components_progress_group_progress_group__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_admin_services_admin_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modules_angular_backend_components_module__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_admin_components_modal_post_edit_edit__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_backend_admin_routing__ = __webpack_require__(173);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngularBackendAdmin; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var AngularBackendAdmin = (function () {
    function AngularBackendAdmin() {
    }
    return AngularBackendAdmin;
}());
AngularBackendAdmin = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__pages_admin_index_index__["a" /* BackendAdminPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_admin_user_list_list__["a" /* BackendAdminUserListPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_admin_user_edit_edit__["a" /* BackendAdminUserEditPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_admin_forum_config_config__["a" /* BackendAdminForumConfigPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_admin_forum_category_category__["a" /* BackendAdminForumCategoryPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_admin_forum_post_post__["a" /* BackendAdminForumPostPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_admin_components_header_header__["a" /* AdminHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_11__pages_admin_components_sidebar_sidebar__["a" /* AdminSidebarComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pages_components_info_box_info_box__["a" /* InfoBoxComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pages_components_progress_group_progress_group__["a" /* ProgressGroupComponent */],
            __WEBPACK_IMPORTED_MODULE_16__pages_admin_components_modal_post_edit_edit__["a" /* PostEditModalComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_15__modules_angular_backend_components_module__["a" /* AngularBackendComponentModule */],
            __WEBPACK_IMPORTED_MODULE_17__angular_backend_admin_routing__["a" /* AngularBackendAdminRoutingModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_14__pages_admin_services_admin_service__["a" /* AdminService */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_16__pages_admin_components_modal_post_edit_edit__["a" /* PostEditModalComponent */]
        ]
    })
], AngularBackendAdmin);

//# sourceMappingURL=angular-backend-admin.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return URL_BACKEND_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BACKEND_API_CONNECTION_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NO_OF_ITEMS_PER_PAGE; });
//export const URL_BACKEND_API = 'http://localhost/www/backend/index.php';
// export const URL_BACKEND_API = 'http://backend.dev/index.php';
// export const URL_BACKEND_API = 'http://localhost:8000/index.php';
//
//export const URL_BACKEND_API = '//backend.sonub.com/index.php'; // real server
var URL_BACKEND_API = 'http://backend.org/index.php'; // Mr. Song's test server.
// Mr. Song's test server.
var BACKEND_API_CONNECTION_TIMEOUT = 45000; // request time out
// request time out
var NO_OF_ITEMS_PER_PAGE = 5;
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interface__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__define__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return Category; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Category = (function (_super) {
    __extends(Category, _super);
    function Category(http) {
        return _super.call(this, http, 'category') || this;
    }
    return Category;
}(__WEBPACK_IMPORTED_MODULE_2__base__["a" /* Base */]));
Category = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], Category);

var _a;
//# sourceMappingURL=category.js.map

/***/ })

},[554]);
//# sourceMappingURL=main.bundle.js.map