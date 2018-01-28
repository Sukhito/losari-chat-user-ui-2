var app = angular.module('losari',['ui.router','ui.bootstrap']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('home',{
            url: '/',
            templateUrl: 'js/home/index.html',
            controller: 'HomeCtrl'
        })
        .state('conversation',{
            url: '/conversation',
            templateUrl: 'js/conversation/index.html',
            controller: 'ConversationCtrl'
        })
        .state("otherwise",{
            url: '',
            templateUrl: 'index.html'
        })


    
    $locationProvider.hashPrefix('');
});