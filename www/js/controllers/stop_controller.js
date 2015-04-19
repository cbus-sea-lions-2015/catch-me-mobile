starter.constant('SW_DELAI', 100)

starter.controller('StopCtrl', function (SW_DELAI,$timeout, $scope) {
    var data = {
            value: 0,
            laps: []
        },
        stopwatch = null;

    var start = function () {;
        stopwatch = $timeout(function() {
            data.value++;
            start();
        }, SW_DELAI);
    };

    var stop = function () {
        $timeout.cancel(stopwatch);
        stopwatch = null;
    };

    var reset = function () {
        stop()
        data.value = 0;
        data.laps = [];
    };

    var lap = function () {
        data.laps.push(data.value);
    };

    return {
        data: data,
        start: start,
        stop: stop,
        reset: reset,
        lap: lap
    };
});

