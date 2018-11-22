(() => {
    angular.module('imgSlider')
    .directive('sliderDirective', sliderDirective);

    function sliderDirective() {
        let sliderObject = {
            slideshow: "=",
            link: link,
            templateUrl: 'app/slider/templates/sliderTemplate.html'
        }

        return sliderObject;

        function link(scope, element, attr) {
            scope.currentIndex = 0;

            scope.slideshow = [
                {
                    title: 'Image 1',
                    src: 'img1.jpg',
                    visible: true
                },
                {
                    title: 'Image 2',
                    src: 'img2.jpg',
                    visible: false
                },
                {
                    title: 'Image 3',
                    src: 'img3.jpg',
                    visible: false
                }
            ];


            scope.next = function() {
                if(scope.currentIndex >= scope.slideshow.length - 1) {
                    scope.currentIndex = 0;
                } else {
                    scope.currentIndex++;
                }
            }

            scope.previous = function() {
                if(scope.currentIndex <= 0) {
                    scope.currentIndex = scope.slideshow.length - 1;
                } else {
                    scope.currentIndex--;
                }
            }

            scope.thisImage = function(index) {
                scope.currentIndex = index;
            }

            scope.$watch('currentIndex', function() {
                changeImage();
            });

            function changeImage() {
                for(let i = 0; i < scope.slideshow.length; i++) {
                    console.log('loop');
                    if(scope.currentIndex === i) {
                        scope.slideshow[i].visible = true;
                    } else {
                        scope.slideshow[i].visible = false;
                    }
                }
            }
        }
    }
})();