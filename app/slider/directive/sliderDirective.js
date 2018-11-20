(() => {
    angular.module('imgSlider')
    .directive('sliderDirective', sliderDirective);

    function sliderDirective() {
        let sliderObject = {
            link: link,
            templateUrl: 'app/slider/templates/sliderTemplate.html'
        }

        return sliderObject;

        function link(scope, element, attr) {
            scope.n = false;
            scope.next = function() {
                scope.n = !scope.n;
            }
        }
    }
})();