var app = angular.module('wiki', ['ui.router']);

function WikiPage(title, content) {
    this.title = title;
    this.content = content;
}

var pages = {
    Python: new WikiPage('Python', 'Python is a fun to use programming language. It is great for beginners.'),
    HTML: new WikiPage('HTML', 'HTML is the markup language used for making pages on the world wide web.')
};

app.controller('CreatePage', function($scope, $stateParams) {


})

app.controller('PageViewController', function($scope, $stateParams) {
    $scope.page_name = $stateParams.page_name;
    $scope.page = pages[$scope.page_name];
});

app.controller('PageEditController', function($scope, $stateParams) {
    $scope.page_name = $stateParams.page_name;
    $scope.page = pages[$scope.page_name];
    if ($scope.page === undefined) {
      $scope.page = new WikiPage($scope.page_name, "");
      pages[$scope.page_name] = $scope.page;
    }
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            templateUrl: 'home.html'
        })
        .state({
            name: 'page_view',
            url: '/{page_name}',
            templateUrl: 'page_view.html',
            controller: 'PageViewController'

        })
        .state({
            name: 'edit_page',
            url: '/{page_name}/edit',
            templateUrl: 'edit_page.html',
            controller: 'PageEditController'
        });

    $urlRouterProvider.otherwise('/');
});
