/**
 * Created by tevonial on 5/28/2017.
 */

angular.module('ilitate')

    .controller('nav', function ($http, $scope, $rootScope) {
        $http.get('/api/group').then(
            function (response) {
                $rootScope.groups = response.data;
                selectGroup(response.data[0]._id);
            }, function (response) {
                alert(response.data.message);
            }
        );

        $('#groupSelect').change(function () {
            selectGroup(this.value);
        });

        function selectGroup(id) {
            $rootScope.groupId = id;
            $rootScope.$broadcast('groupChange', id);
        }
    });