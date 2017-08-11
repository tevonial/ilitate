/**
 * Created by tevonial on 7/13/2017.
 */

angular.module('ilitate')

    .controller('settings', function ($scope, $http, $window) {
        var i = 0;
        var groupId;

        $scope.group = {};
        $scope.unsaved = [];

        if ($scope.groupId)
            refresh();

        $scope.$on('groupChange', function (e, id) {
            refresh();
        });

        $scope.refresh = function () { refresh(); };

        function refresh() {
            groupId = $scope.groupId;

            $scope.group.name = $scope.groups.filter(function (group) {
                return group._id === $scope.groupId;
            })[0].name;

            i = 0;
            $scope.unsaved = [];
            $http.get('/api/group/custom/' + $scope.groupId).then(
                function (response) {
                    $scope.custom = response.data;
                }
            );
        }

        $scope.add = function () {
            $scope.unsaved.push({i:i++});
        };

        $scope.remove = function (i) {
            if (isNaN(i)) {
                $scope.custom = $scope.custom.filter(function (item) {
                    return item._id !== i;
                });
            } else {
                $scope.unsaved = $scope.unsaved.filter(function (item) {
                    return item.i !== i;
                });
            }
        };

        $scope.save = function () {
            if (groupId) {
                $http.put('/api/group/' + groupId, $scope.group).then(
                    function (response) {
                        $scope.group = response.data;
                    }
                );
                saveCustom();
            } else {
                $http.post('/api/group/', $scope.group).then(
                    function (response) {
                        $scope.group = response.data;
                        groupId = $scope.group._id;
                        saveCustom().then(function () {
                            $window.location.reload();
                        });
                    }
                );
            }


        };

        function saveCustom() {
            return $http.put('/api/group/custom/' + groupId,
                $scope.custom.concat($scope.unsaved)).then(
                function (response) {
                    $scope.custom = response.data;
                    $scope.unsaved = [];
                }
            );
        }

        $scope.delete = function () {
            $http.delete('/api/group/' + groupId).then(
                function (response) {
                    // $state.go('client.details');
                    $window.location.reload();
                }
            )
        };

        $scope.create = function () {
            groupId = null;
            $scope.$apply(function () {
                $scope.group = {};
                $scope.custom = [];
                $scope.unsaved = [];
            });
        };

    });