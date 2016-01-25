(function(){
    'use strict';

    angular.module('main', ['ui.bootstrap'])
        .service('L1', function($http){
            var self = this;
            $http.get('/api/login', function(info){
                self.username = info.username;
            });
        })
        .factory('L2', function($http){
            var self = this;
            $http.get('/api/login', function(info){
                self.username = info.username;
            });
            return {
                username: self.username,
                getUserName: self.isLogin
            }
        })
        .controller('UserCtrl', function($scope, $http, $uibModal, L1, L2){
            var self = this;
            self.username1 = L1.username;
            self.username2 = L2.username;
            $http.get('/api/user').success(function(data){
                self.users = {};
                data.forEach(function(user){
                    self.users[user._id] = user;
                });
            })

            self.add = function(user) {
                delete user._id;
                $http.post('/api/user', user).success(function(data){
                    self.users[data.user._id] = data.user;
                });
            };

            self.selectUser = function(user) {
                self.newUser = angular.copy(user);
            }

            self.updateUser = function(user){
                $http.put('/api/user', user).success(function(data){
                    self.users[data.user._id] = data.user;
                });
            };

            self.del = function(uid){
                $http.delete('/api/user/'+uid).success(function(){
                    delete self.users[uid];
                });
            }

            self.openLoginForm = function() {
                $uibModal.open({
                    templateUrl: 'login.html',
                    controller: 'LoginCtrl'
                });
            };
        });

})()
