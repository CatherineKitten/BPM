﻿// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// 'ionic-datepicker' is found in ionic-datepicker.js
angular.module('formApp', ['ionic', 'formApp.controllers', 'formApp.services', 'formApp.directives', 'ion-datetime-picker', 'ngIOS9UIWebViewPatch', 'ngCordova', 'oc.lazyLoad'])
    .run(function ($ionicPlatform, $location, $timeout, $rootScope, $ionicPickerI18n,
        $cordovaToast, $ionicHistory, $state, $cordovaNetwork, $cordovaPush, $templateCache,$ionicConfig) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            //解决安卓不能表单不能滑动的bug
            $ionicConfig.scrolling.jsScrolling(true);
            // console.log($ionicConfig,'$ionicConfig')
            // console.log(window.cordova,'cordova')
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.cordova && window.cordova.InAppBrowser) {
                window.open = window.cordova.InAppBrowser.open;
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            //禁止屏幕旋转
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.screenorientation) {
                window.cordova.plugins.screenorientation.setOrientation("portrait")
            }
            //禁止键盘搜索按钮关闭表单
            $(document).keydown(function (event) {
                if (event.keyCode == 13) {
                    if (event.currentTarget.activeElement.type != "textarea") {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
            });
        });
        // 主界面和登录界面双击物理返回键退出
        $ionicPlatform.registerBackButtonAction(
            function (e) { }, 100);

        //时间控件自定义设定
        var lang = window.localStorage.getItem('H3.Language') || 'zh_cn';
        
        if (lang=='en_us') {
            $ionicPickerI18n.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            $ionicPickerI18n.months = ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Otc", "Nov", "Dec"];
            $ionicPickerI18n.ok = "OK";
            $ionicPickerI18n.cancel = "Clear";
        } else{
            $ionicPickerI18n.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
            $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            $ionicPickerI18n.ok = "确定";
            $ionicPickerI18n.cancel = "清空";
        }


        //单选、下拉、多选模板
        var begin = "<ion-modal-view class='bpm-mobile-select'>" +
        "<ion-header-bar class='bar-dark'>" +
          "<h1 class='title'>{{header}}</h1>" +
          "<button class='button button-clear button-icon ion-close-circled item-right' ng-click='modal.hide()'></button>" +
        "</ion-header-bar>" +
        "<ion-header-bar class='bar-subheader item-input-inset'>" +
          "<label class='item-input-wrapper'>" +
            "<i class='icon ion-ios-search placeholder-icon'></i>" +
            "<input type='search' placeholder='Search' ng-model='searchText'>" +
          "</label>" +
        "</ion-header-bar>" +
        "<ion-content>" +
          "<ion-list>";
        var checkbox = "<ion-checkbox ng-repeat='item in CheckListDisplay| filter:searchText'" +
                             "ng-model='item.checked'" +
                             "ng-checked='item.checked' ng-click='clickCheckList()'>{{item.text}}" +
                        "</ion-checkbox>";
        var radio = "<ion-radio ng-repeat='item in RadioListDisplay | filter:searchText'" +
                             "ng-model='RadioListValue'" +
                             "ng-value='item.Value'" +
                             "ng-click='clickRadio(item.Value,item.Text)'>{{item.Text}}" +
                  "</ion-radio>";
        var end = "</ion-list>" +
          "</ion-content>" +
        "</ion-modal-view>";

        var style = "<style>" +
            ".bpm-mobile-select {top: 190px;}" +
            ".bpm-mobile-select ion-list div.list{padding-bottom:190px;}" +
            ".bpm-mobile-select ion-list div.list label div.item-content{padding-bottom: 10px;padding-top: 10px;}" +
            "</style>";
        $templateCache.put('checkbox_autocomplete.html', begin + checkbox + style + end);
        $templateCache.put('radio_autocomplete.html', begin + radio + style + end);
    })
    //.constant('$ionicLoadingConfig', {
    //    template: "<ion-spinner icon=\"bubbles\" class=\"spinner-balanced\"></ion-spinner>"
    //})
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // 修改默认显示效果
        // $ionicConfigProvider.platform.ios.tabs.style("standard");
        // $ionicConfigProvider.platform.ios.tabs.position("bottom");
        $ionicConfigProvider.platform.android.tabs.style("standard");
        $ionicConfigProvider.platform.android.tabs.position("bottom");
        // $ionicConfigProvider.platform.ios.navBar.alignTitle("center");
        $ionicConfigProvider.platform.android.navBar.alignTitle("center");
        // 设置返回文本为空和箭头图标  // previousTitleText("")
        //$ionicConfigProvider.platform.ios.backButton.icon("ion-android-arrow-back");//ion-ios-arrow-thin-left
        //$ionicConfigProvider.platform.android.backButton.icon("ion-android-arrow-back");
        $ionicConfigProvider.backButton.previousTitleText(false).text("").icon("ion-android-arrow-back");
        $ionicConfigProvider.platform.ios.views.transition("ios");
        $ionicConfigProvider.platform.android.views.transition("android");
        $stateProvider
            .state('form', {
                url: '/form',
                abstract: true,
                templateUrl: function () { return 'Mobile/form/templates/empty.html?v=' + new Date().getTime() },
                controller: "mainCtrl",
                params: {
                    dataField: "",
                    loadUrl: "",
                    loadOptions: "",
                    initUsers: null,
                    isMutiple: false,
                    options: null
                }
            })
            .state('form.detail', {
                url: '/detail',
                views: {
                    'form-detail': {
                        templateUrl: function () { return 'Mobile/form/templates/formDetail.html?v=' + new Date().getTime() },
                        controller: 'formSheetCtrl'
                    }
                }
            })
            .state('form.sheetquery', {
                url: '/sheetquery/:datafield/:rownum/:objectid',
                views: {
                    'form-detail': {
                        templateUrl: function () { return 'Mobile/form/templates/sheetQuery.html?v=' + new Date().getTime() },
                        controller: 'sheetQueryCtrl'
                    }
                }
            })
            .state('form.sheetuser', {
                url: '/sheetuser',
                views: {
                    'form-detail': {
                        templateUrl: function () { return 'Mobile/form/templates/sheetUser.html?v=' + new Date().getTime() },
                        controller: 'sheetUserCtrl'
                    }
                }
            })
        //传阅、征询、转发路由
         .state('form.fetchuser', {
             url: '/fetchuser',
             views: {
                 'form-detail': {
                     templateUrl: function () { return 'Mobile/form/templates/FetchUser.html?v=' + new Date().getTime() },
                     controller: 'fetchUserCtrl'
                 }
             }
         })
         // // 评论
         //    .state('form.comment', {
         //        url: '/comment',
         //        views: {
         //            'form-detail': {
         //                templateUrl: function () { return 'Mobile/form/templates/Comment.html?v=' + new Date().getTime() },
         //                controller: 'comment'
         //            }
         //        }
         //    })

            // 评论详情
            .state('form.commentDetail', {
                url: '/commentDetail',
                views: {
                    'form-detail': {
                        templateUrl: function () { return 'Mobile/form/templates/CommentDetail.html?v=' + new Date().getTime() },
                        controller: 'commentDetail'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "Mobile/css/formMobile/detail.css?v=201802091435"
                        ])
                    }]
                }
            })

            // 添加评论
            .state('form.AddComment', {
                url: '/addComment',
                views: {
                    'form-detail': {
                        templateUrl: function () { return 'Mobile/form/templates/AddComment.html?v=' + new Date().getTime() },
                        controller: 'addComment'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "Mobile/css/formMobile/detail.css?v=201802091435"
                            // 'vendor/angular/angular-file/ng-file-upload-shim.js',
                            // 'vendor/angular/angular-file/ng-file-upload.js'
                        ])
                    }]
                }
            })

            // 选择用户
            .state('form.SelectPerson', {
                url: '/selectPersons',
                views: {
                    'form-detail': {
                        templateUrl: function () { return 'Mobile/form/templates/selectPersons.html?v=' + new Date().getTime() },
                        controller: 'selectPersons'
                    }
                },
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            "Mobile/css/formMobile/selectperson.css?v=201802091435"
                        ])
                    }]
                }
            })
        //流程状态
        .state('form.instancestate', {
            url: '/instancestate/:Mode/:InstanceID/:WorkflowCode/:WorkflowVersion',
            views: {
                'form-detail': {
                    templateUrl: function () { return 'Mobile/form/templates/instanceState.html?v=' + new Date().getTime() },
                    controller: 'instanceStateCtrl'
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    console.log("_PORTALROOT_GLOBAL >>> " + _PORTALROOT_GLOBAL)
                    return $ocLazyLoad.load([
                    "WFRes/assets/stylesheets/sheet.css?v=201802091435",
                    "WFRes/_Content/designer/css/designer.css?v=201802091435",
                    "Mobile/Scroll/iscroll-zoom.js?v=201802091435",// zaf
                    // "WFRes/_Scripts/designer/loader.js", // zaf
                    "WFRes/_Scripts/designer/Activity.js?v=201802091435",
                    "WFRes/_Scripts/designer/ActivityDrag.js?v=201802091435",
                    "WFRes/_Scripts/designer/ActivityModel.js?v=201802091435",
                    "WFRes/_Scripts/designer/Line.js?v=201802091435",
                    "WFRes/_Scripts/designer/Workflow.js?v=201802091435",
                    "WFRes/_Scripts/designer/WorkflowDocument.js?v=201802091435"
                    ]).then(function () {
                        return $ocLazyLoad.load([
                            "WFRes/_Scripts/jquery/jquery.lang.js?v=201802091435",
                            "WFRes/_Scripts/designer/misc.js?v=201802091435",
                            "WFRes/_Scripts/designer/MobileLoader.js?v=201802091435" // zaf
                        ]);
                    })
                }]
            }
        })
        .state('form.downLoadFile', {
            url: 'downLoadFile/:url/:extension',
            cache: false,
            views: {
                'form-detail': {
                    templateUrl: function () { return 'Mobile/form/templates/downLoadFile.html?v=' + new Date().getTime() },
                    controller: 'downLoadFileCtrl'
                }
            }
        })
        $urlRouterProvider.otherwise("/form/detail");
    });