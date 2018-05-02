var app = angular.module('cocoGirf',['ng','ngRoute']);

// app.value('userinfo',function () {
//     sessionStorage.getItem('phone') ? JSON.parse(sessionStorage.getItem('phone')) : ''
// })

// app.prototype.info=function () {
//     app.value('userinfo',function () {
//         sessionStorage.getItem('phone') ? JSON.parse(sessionStorage.getItem('phone')) : ''
//     })
// };

app.value('userinfo', sessionStorage.getItem('phone') ? JSON.parse(sessionStorage.getItem('phone')) : '');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/start',{
            templateUrl:'tpl/start.html',
            controller:'startCtrl'
        })
        .when('/main',{
            templateUrl:'tpl/main.html',
            controller:'mainCtrl'
        })
        // .when('/header',{
        //     templateUrl:'tpl/start.html',
        //     controller:'headerCtrl'
        // })
        .when('/show',{
            templateUrl:'tpl/show.html',
            controller:'showCtrl'
        })
        .when('/customize',{
            templateUrl:'tpl/customize.html',
            controller:'customizeCtrl'
        })
        .when('/cart',{
            templateUrl:'tpl/cart.html',
            controller:'cartCtrl'
        })
        .when('/order',{
            templateUrl:'tpl/order.html',
            controller:'orderCtrl'
        })
        // .when('/order/:id',{
        //     templateUrl:'tpl/order.html',
        //     controller:'orderCtrl'
        // })
        .when('/myOrder',{
            templateUrl:'tpl/myOrder.html',
            controller:'myOrderCtrl'
        })
        // .otherwise({redirectTo:''})
        .otherwise({redirectTo:'/start'})

});

app.controller('parentCtrl',['$scope','$location',function ($scope,$location) {
    $scope.jump = function (arg) {
        $location.path(arg);
    }
}]);

app.controller('startCtrl',['$scope','$http','userinfo','$location','$routeParams',function ($scope,$http,userinfo,$location,$routeParams) {
    $scope.userinfo = userinfo;
    $scope.carousels=function(){
        $('.carousel').carousel({ interval: 3000 });
    }

    var uid = $routeParams.uid;
    console.log(userinfo);
    $scope.reg = {'uid':uid};
    //console.log("reg");
    $scope.submitReg = function () {
        // console.log($scope.reg);
        var args = jQuery.param($scope.reg);
       // console.log(args);
        $http
            .get('data/user_reg.php?'+args)
            .success(function (data) {
                //console.log(data);
                if(data[0].msg == 'success'){
                    // sessionStorage.setItem('phone',$scope.order.phone);
                    //console.log(uid);
                    $scope.successMsg = "注册成功,";
                    location.reload();
                    //$scope.successMsg = "注册成功，编号为"+data[0].uid;
                }else {
                    $scope.errorMsg = "注册失败！";
                }
            })
    };

    var phone = $routeParams.phone;
    // console.log(uid);
    //console.log("Login")
    $scope.login = {'phone':phone};
    $scope.submitLogin = function () {
       // console.log($scope.login);
        var args = jQuery.param($scope.login);
        //console.log(args);
        $http
            .get('data/user_login.php?'+args)
            .success(function (data) {
               // console.log(data);
                if(data.msg == 'success'){
                    sessionStorage.setItem('phone',$scope.login.phone);
                    console.log($location)
                    // $scope.jump('/start')
                    $scope.successMsg = "登陆成功,";
                    //$scope.successMsg = "注册成功，编号为"+data[0].uid;
                    location.reload();
                }else {
                    $scope.errorMsg = "登陆失败！";
                }
            });
        $http
            .get('data/user_login.php?phone='+sessionStorage.getItem('phone'))
            .success(function (data) {
                console.log(data);
                $scope.orderList = data;
            })
    }

    $scope.submitExit = function () {
        sessionStorage.removeItem('phone');
        console.log($location)
        location.reload();
        // $route.reload();
        // $scope.jump('/start')
    }

}]);

app.controller('mainCtrl',['$scope','$http',function ($scope,$http) {
    $scope.hasMore=true;
    $http
        .get('data/dish_getbypage.php?start=0')
        .success(function (data) {
            console.log(data);
            $scope.dishList = data;
        })

    $scope.loadMore = function () {
        $http
            .get('data/dish_getbypage.php?start='+$scope.dishList.length)
            .success(function (data) {
                $scope.dishList = $scope.dishList.concat(data);
                if(data.length<5){
                    $scope.hasMore = false;
                }
            })
    }

    $scope.$watch('kw',function () {
        if($scope.kw){
            $http
                .get('data/dish_kw.php?kw='+$scope.kw)
                .success(function (data) {
                    $scope.dishList = data;
                })
        }
    })

}]);

app.controller('showCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
    var did = $routeParams.id;
    $http
        .get('data/dish_getbyid.php?id='+did)
        .success(function (data) {
            console.log(data);
            $scope.dish = data[0];
        })
}]);


app.controller('customizeCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
    // var did = $routeParams.id;
    // $http
    //     .get('data/dish_getbyid.php?id='+did)
    //     .success(function (data) {
    //         console.log(data);
    //         $scope.dish = data[0];
    //     })
}]);

app.controller('cartCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
    // var did = $routeParams.id;
    // $http
    //     .get('data/dish_getbyid.php?id='+did)
    //     .success(function (data) {
    //         console.log(data);
    //         $scope.dish = data[0];
    //     })
}]);

// app.controller('headerCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
//       var uid = $routeParams.uid;
//      console.log(uid);
//       $scope.reg = {'uid':uid};
//     $scope.submitReg = function () {
//         console.log($scope.reg);
//         var args = jQuery.param($scope.reg);
//         console.log(args);
//         $http
//             .get('data/user_reg.php?'+args)
//             .success(function (data) {
//                 console.log(data);
//                 if(data[0].msg == 'success'){
//                     // sessionStorage.setItem('phone',$scope.order.phone);
//                     //console.log(uid);
//                     $scope.successMsg = "注册成功,";
//                     //$scope.successMsg = "注册成功，编号为"+data[0].uid;
//                 }else {
//                     $scope.errorMsg = "注册失败！";
//                 }
//             })
//     }
// }]);

app.controller('myOrderCtrl',['$scope','$http',function ($scope,$http) {
    $http
        .get('data/order_getbyphone.php?phone='+sessionStorage.getItem('phone'))
        .success(function (data) {
            console.log(data);
            $scope.orderList = data;
        })
}]);