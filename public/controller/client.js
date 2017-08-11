/**
 * Created by tevonial on 7/6/2017.
 */

angular.module('ilitate')

    .controller('client', function ($http, $scope, $state) {
        if ($scope.groupId && !$scope.client)
            refresh($scope.groupId);

        $scope.$on('groupChange', function (e, id) {
            refresh(id);
            $scope.client = null;
        });

        function refresh(id) {
            $http.get('/api/group/client/' + id).then(
                function (response) {
                    $scope.clients = response.data;
                }, function (response) {
                    alert(response.data.message);
                }
            );
        }

        $scope.selectClient = function (id) {

            $http.get('/api/client/detail/' + id).then(
                function (response) {
                    $scope.client = response.data;
                    $('#client' + $scope.clientId).removeClass("active");
                    $('#client' + id).addClass("active");
                    $scope.clientId = id;
                }, function (response) {
                    alert(response.data.message);
                }
            );

            $scope.$broadcast('selectClient', id);
        };

        $scope.edit = function () {
            if ($scope.clientId)
                $state.go('client.edit', {client: $scope.client});
        }

    })

    .controller('client.detail', function ($scope, $stateParams) {

        if ($stateParams.id) {
            $scope.$watch(function () { return $scope.clients; },
                function (clients, old) {
                    if (clients === old)   return;

                    $scope.selectClient($stateParams.id);
                });
        }
    })

    .controller('client.contact', function ($http, $scope) {
        if ($scope.clientId)
            refresh($scope.clientId);

        $scope.$on('selectClient', function (e, id) {
            refresh(id);
        });

        function refresh(id) {
            // $http.get('/api/client/contact/' + id);
        }

    })

    .controller('client.note', function ($http, $scope) {
        if ($scope.clientId)
            refresh($scope.clientId);

        $scope.$on('selectClient', function (e, id) {
            refresh(id);
        });

        function refresh(id) {
            $http.get('/api/client/note/' + id).then(
                function(response) {
                    $scope.notes = response.data;
                }, function (response) {
                    alert(response.data.message);
                }
            );
        }

    })
    
    .controller('client.file', function ($http, $scope) {
        if ($scope.clientId)
            refresh($scope.clientId);

        $scope.$on('selectClient', function (e, id) {
            refresh(id);
        });

        function refresh(id) {
            // $http.get('/api/client/file/' + id);
        }

    })

    .controller('client.edit', function ($http, $scope, $stateParams, $state) {

        $scope.refreshCustom = function(id) {
            $http.get('/api/group/custom/' + id).then(
                function (response) {
                    $scope.client.custom = $scope.client.custom.filter(function (clientField) {
                        return response.data.some(function (groupField) {
                            return groupField._id === clientField._id;
                        });
                    });

                    response.data.forEach(function (groupField) {
                        if (!$scope.client.custom.some(function (clientField) {
                                return groupField._id === clientField._id;
                            })) {
                            $scope.client.custom.push(groupField);
                        }
                    });
                }
            );
        };

        if ($stateParams.client) {  // Edit existing client
            $scope.client = $stateParams.client;
            $scope.client.date.dob = new Date($scope.client.date.dob);
        } else {                    // Create new client
            $scope.client = {
                group: {_id: $scope.groupId},
                custom: []
            };

            $scope.refreshCustom($scope.groupId);
        }

        $scope.$on('groupChange', function (e, id) {
            $scope.refreshCustom(id);
        });

        $scope.save = function () {
            if ($scope.client._id) {    // Edit existing client
                $http.put('/api/client', $scope.client).then(
                    function (response) {
                        $state.go('client.detail', {id: $scope.client._id});
                    }, function (response) {
                        alert(response.data.message);
                    }
                );
            } else {    // Create new client
                $http.post('/api/client', $scope.client).then(
                    function (response) {
                        $state.go('client.detail', {id: response.data._id});
                    }, function (response) {
                        alert(response.data.message);
                    }
                );
            }

        };

        $scope.delete = function () {
            if (!$scope.client._id) return;

            $http.delete('/api/client/' + $scope.client._id).then(
                function (response) {
                    $state.go('client.detail');
                }, function (response) {
                    alert(response.data.message);
                }
            );

        };
    });