/**
 * Created by tevonial on 7/8/2017.
 */

angular.module('ilitate')

    .controller('note', function ($http, $scope) {
        if ($scope.groupId)
            refresh($scope.groupId);

        $scope.$on('groupChange', function (e, id) {
            refresh(id);
        });

        function refresh(id) {
            $http.get('/api/group/note/' + id).then(
                function (response) {
                    $scope.notes = response.data;
                }, function (response) {
                    alert(response.data.message);
                }
            );
        }
    })

    .controller('note.detail', function($http, $scope, $stateParams, $state) {
        $http.get('/api/note/' + $stateParams.id).then(
            function (response) {
                $scope.note = response.data;
            }, function (response) {
                alert(response.data.message);
            }
        );

        $scope.edit = function () {
            if ($stateParams.id)
                $state.go('note.edit', {id:$stateParams.id, note:$scope.note});
        }
    })

    .controller('note.edit', function ($scope, $http, $stateParams, $state) {
        var i = 0;
        $scope.unsaved = [];

        if ($stateParams.note) {
            $scope.note = $stateParams.note;
        } else if ($stateParams.id) {
            $http.get('/api/note/' + $stateParams.id).then(
                function (response) {
                    $scope.note = response.data;
                }
            );
        } else {
            $scope.note = {
                group: $scope.groupId,
                clients: []
            };
        }

        if ($scope.groupId)
            refreshClients($scope.groupId);

        if (!$scope.note._id) {
            $scope.$on('groupChange', function (e, id) {
                refreshClients(id);
            });
        }

        function refreshClients(id) {
            $http.get('/api/group/client/' + id).then(
                function (response) {
                    $scope.clients = response.data;
                }, function (response) {
                    alert(response.data.message);
                }
            );
        }

        $scope.save = function () {
            $scope.note.clients = $scope.note.clients.concat($scope.unsaved);

            if ($scope.note._id) {
                $http.put('/api/note/', $scope.note).then(
                    function (response) {
                        $state.go('note.detail', {id:$scope.note._id});
                    }
                );
            } else {
                $http.post('/api/note/', $scope.note).then(
                    function (response) {
                        $state.go('note.detail', {id:response.data._id});
                    }, function (response) {
                        alert(response.data.message);
                    }
                );
            }
        };

        $scope.add = function () {
            $scope.unsaved.push({i:i++});
        };

        $scope.remove = function (i) {
            if (isNaN(i)) {     // Existing array of clients
                $scope.note.clients = $scope.note.clients.filter(function (c) {
                    return c.client._id !== i;
                });
            } else {            // New, unsaved clients
                $scope.unsaved = $scope.unsaved.filter(function (item) {
                    return item.i !== i;
                });
            }
        };
        
        $scope.delete = function () {
            if ($scope.note._id) {
                $http.delete('/api/note/' + $scope.note._id).then(
                    function (response) {
                        $state.go('note');
                    }
                )
            }
        }
    });