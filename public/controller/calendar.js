angular.module('ilitate')

    .controller('calendar', function ($http, $scope, $state) {
        $scope.month = {
            length: 0,
            days: []
        };

        function calculateMonth(date) {
            var first = new Date(date.getFullYear(), date.getMonth(), 1);
            var last = new Date(date.getFullYear(), date.getMonth()+1, 0);

            $scope.month.length = last.getDate();
            console.log("length" + $scope.month.length);
            for (i = 0; i < date.getDay(); i++)
                $scope.month.days[i] = {date: null, label: ""}
            for (i = 0; i < $scope.month.length; i++)
                $scope.month.days[i + date.getDay()] = {date: new Date(first.getFullYear(), first.getMonth(), 1), label: i + 1}
        }

        calculateMonth(new Date());

    });