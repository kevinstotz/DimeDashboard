"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular5_social_login_1 = require("angular5-social-login");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(socialAuthService) {
        this.socialAuthService = socialAuthService;
    }
    SigninComponent.prototype.ngOnInit = function () {
    };
    SigninComponent.prototype.socialSignIn = function (socialPlatform) {
        var socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = angular5_social_login_1.FacebookLoginProvider.PROVIDER_ID;
        }
        else if (socialPlatform == "google") {
            socialPlatformProvider = angular5_social_login_1.GoogleLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            console.log(socialPlatform + " sign in data : ", userData);
            // Now sign-in with userData
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.css']
        }),
        __metadata("design:paramtypes", [angular5_social_login_1.AuthService])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin.component.js.map