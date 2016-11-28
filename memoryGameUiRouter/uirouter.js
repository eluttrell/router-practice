var app = angular.module('memoryGame', ['ui.router']);

app.controller('BoardController', function($scope, $stateParams, $state, $timeout) {

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function Card(num) {
        this.image = 'images/monsters-' + num + '.png';
        this.back = 'images/logo.png';
        this.open = false;
        this.matched = false;
        this.randID = Math.floor(Math.random() * 16);
    }

    $scope.newGame = false;

    $scope.newBoard = function() {

        var cardsInit = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16"
        ];

        $scope.cards = [];

        var randomNumGen = function() {
            var random = Math.floor(Math.random() * cardsInit.length);
            return random;
        };

        var num = $stateParams.board_type;
        for (var j = 0; j < num / 2; j++) {
            var randArr = randomNumGen();
            if (cardsInit[randArr])
                $scope.cards.push(new Card(cardsInit[randArr]));
            $scope.cards.push(new Card(cardsInit[randArr]));
            cardsInit.splice(randArr, 1);
            console.log(cardsInit);
        }

        return $scope.cards = shuffle($scope.cards);
    };

    $scope.newBoard();

    $scope.checkWin = function() {
        console.log($scope.cards.length);
        console.log($scope.winCounter);
        $scope.winCounter += 2;
        if ($scope.winCounter === $scope.cards.length) {
            $timeout(function() {
                alert("You Win!");
            }, 500);
        }
    };

    $scope.counter = 0;
    var unclickable = false;
    $scope.flip = function(index) {
        if (!unclickable) {
            $scope.cards[index].open = true;
            if ($scope.counter === 0) {
                $scope.firstOpen = $scope.cards[index];
                $scope.indexOne = index;
                $scope.counter += 1;
                console.log("herhere:" + index);
            } else if ($scope.counter === 1) {
                console.log("this is happening:" + index);
                unclickable = true;
                $scope.secondOpen = $scope.cards[index];
                $scope.counter += 1;

                if ($scope.firstOpen.image == $scope.secondOpen.image) {

                    $scope.indexTwo = index;
                    $scope.cards[$scope.indexOne].matched = true;
                    $scope.cards[$scope.indexTwo].matched = true;
                    $scope.checkWin();
                    unclickable = false;
                } else {
                    $scope.indexTwo = index;
                    $timeout(function() {
                        $scope.cards[$scope.indexOne].open = false;
                        $scope.cards[$scope.indexTwo].open = false;
                        unclickable = false;
                    }, 500);
                }
                if ($scope.counter === 2) {
                    $scope.counter = 0;
                }
            }
        }

    };
});



app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            templateUrl: 'home.html'
        })
        .state({
            name: 'board',
            url: '/{board_type}',
            templateUrl: 'board.html',
            controller: 'BoardController'
        });
    $urlRouterProvider.otherwise('/');
})
