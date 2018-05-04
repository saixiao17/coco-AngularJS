var app = angular.module('cocoGirf',['ng','ngRoute']);

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
        .when('/show',{
            templateUrl:'tpl/show.html',
            controller:'showCtrl'
        })
        .when('/show/:id',{
            templateUrl:'tpl/show.html',
            controller:'showCtrl'
        })
        .when('/cart',{
            templateUrl:'tpl/cart.html',
            controller:'cartCtrl'
        })
        .when('/cart/:id',{
            templateUrl:'tpl/cart.html',
            controller:'cartCtrl'
        })
        .when('/customize',{
            templateUrl:'tpl/customize.html',
            controller:'customizeCtrl'
        })
        .when('/order',{
            templateUrl:'tpl/myOrder.html',
            controller:'orderCtrl'
        })
        .otherwise({redirectTo:'/start'})

});

app.controller('parentCtrl',['$scope','$location','userinfo',function ($scope,$location,userinfo) {
    $scope.jump = function (arg) {
        $location.path(arg);
    }
    $scope.userinfo = userinfo;
}]);

app.controller('startCtrl',['$scope','$http','userinfo','$location','$routeParams',function ($scope,$http,userinfo,$location,$routeParams) {
    $scope.userinfo = userinfo;
    console.log(userinfo);
    $scope.carousels=function(){
        $('.carousel').carousel({ interval: 3000 });
    }

    var uid = $routeParams.uid;
    $scope.reg = {'uid':uid};
    $scope.submitReg = function () {
        var args = jQuery.param($scope.reg);
        console.log($scope.reg)
        console.log(args);
        $http
            .get('data/user_reg.php?'+args)
            .success(function (data) {
                if(data[0].msg == 'success'){
                    $scope.successMsg = "注册成功,";
                    location.reload();
                }else {
                    $scope.errorMsg = "注册失败！";
                }
            })
    };

    var phone = $routeParams.phone;
    $scope.login = {'phone':phone};
    $scope.submitLogin = function () {
        var args = jQuery.param($scope.login);
        $http
            .get('data/user_login.php?'+args)
            .success(function (data) {
               // console.log(data);
                if(data.msg == 'success'){
                    sessionStorage.setItem('phone',$scope.login.phone);
                    // console.log($location)
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
                // console.log(data);
                $scope.orderList = data;
            })
    }

    $scope.submitExit = function () {
        sessionStorage.removeItem('phone');
        location.reload();
        // $route.reload();
        // $scope.jump('/start')
    }

    //新品数据加载
    $scope.hasMore=true;
    $http
        .get('data/commodity_byxppage.php?start=0')
        .success(function (data) {
            // console.log(data);
            $scope.commodityList = data;
            // console.log($scope.commodityList)
        })
    //加载更多
    $scope.loadMore = function () {
        $http
            .get('data/commodity_byxppage.php?start='+$scope.commodityList.length)
            .success(function (data) {
                $scope.commodityList = $scope.commodityList.concat(data);
                if(data.length<3){
                    $scope.hasMore = false;
                }
            })
    }

}]);

app.controller('mainCtrl',['$scope','$http',function ($scope,$http) {

}]);

app.controller('showCtrl',['$scope','$http','$routeParams','userinfo',function ($scope,$http,$routeParams,userinfo) {
    var cid = $routeParams.id;
    console.log('cid'+cid);
    $scope.userinfo = userinfo;
    $http
        .get('data/commodity_byxpid.php?cid='+cid)
        .success(function (data) {
            $scope.commodity = data[0];
        });

    $scope.cart = {'cid':cid,'userinfo':userinfo};
    $scope.submitCart = function () {
         console.log($scope.cart);
        var args = jQuery.param($scope.cart);
        // console.log(args);
        $http
            .get('data/cart_add.php?'+args)
            .success(function (data) {
                if(data[0].msg == 'success'){
                    // sessionStorage.setItem('phone',$scope.order.phone);
                    $scope.successMsg = "加入购物车成功,";
                }else {
                    $scope.errorMsg = "加入购物车失败！";
                }
            })
    }
}]);


app.controller('customizeCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
}]);

app.controller('cartCtrl',['$scope','$http','$routeParams','userinfo',function ($scope,$http,$routeParams,userinfo) {
    $scope.userinfo = userinfo;
    $scope.hasMore=true;
    $http
        .get('data/cart_bypage.php?start=0&userinfo='+userinfo)
        .success(function (data) {
            $scope.cartList = data;
            console.log($scope.cartList)
        })

    $scope.loadMore = function () {
        console.log($scope.cartList.length)
        $http
            .get('data/cart_bypage.php?start='+$scope.cartList.length+'&userinfo='+userinfo)
            .success(function (data) {
                $scope.cartList = $scope.cartList.concat(data);
                if(data.length<1){
                    $scope.hasMore = false;
                }
                console.log($scope.cartList)
            })
    }

    var oid = $routeParams.id;
    console.log('shenmegui')
    console.log($scope.order);
    $scope.order = {'oid':oid,'userinfo':userinfo};
    // $scope.order.oid = oid
    // $scope.order.userinfo = userinfo
    $scope.submitOrder = function () {
        console.log($scope.order);
        var args = jQuery.param($scope.order);
        console.log(args);
        $http
            .get('data/order_add.php?'+args)
            .success(function (data) {
                console.log(data);
                if(data[0].msg == 'success'){
                    $scope.successMsg = "支付成功";
                }else {
                    $scope.errorMsg = "支付失败！";
                }
            })
    }

}]);

app.controller('orderCtrl',['$scope','$http','$routeParams','userinfo',function ($scope,$http,$routeParams,userinfo) {

}]);

app.controller('myOrderCtrl',['$scope','$http',function ($scope,$http) {
    $http
        .get('data/order_getbyphone.php?phone='+sessionStorage.getItem('phone'))
        .success(function (data) {
            console.log(data);
            $scope.orderList = data;
            //console.log($scope.commodityList)
        })
}]);