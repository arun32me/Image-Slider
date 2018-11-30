(() => {
    angular.module('imgSlider')
    .directive('sliderDirective', sliderDirective);
    sliderDirective.$inject = ['$interval'];
    function sliderDirective($interval) {
        let sliderObject = {
            slideshow: "=",
            link: link,
            templateUrl: 'app/slider/templates/sliderTemplate.html'
        }

        return sliderObject;

        function link(scope, element, attr) {
            scope.currentIndex = 0;
            let slideTimer;
            scope.dotIndex = 0;
            scope.viewDots = [];

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
                },
                {
                    title: 'Image 4',
                    src: 'img4.jpg',
                    visible: false
                },
                {
                    title: 'Image 5',
                    src: 'img5.jpg',
                    visible: false
                },
                {
                    title: 'Image 6',
                    src: 'img6.jpg',
                    visible: false
                },
                {
                    title: 'Image 7',
                    src: 'img7.jpg',
                    visible: false
                },
                {
                    title: 'Image 8',
                    src: 'img8.jpg',
                    visible: false
                },
                {
                    title: 'Image 9',
                    src: 'img9.jpg',
                    visible: false
                },
                {
                    title: 'Image 10',
                    src: 'img10.jpg',
                    visible: false
                }
            ];

            var start = 0;
            var end = 5;
            var numOfDots = 5;


            function viewDotSlide() {
                if(scope.currentIndex === end) {
                    start = end;
                    end = 9;
                }
                if(scope.currentIndex === start) {
                    start = 0;
                    end = 5;
                }
                for(let i = start; i <= end; i++) {
                    scope.viewDots[i] = scope.slideshow[i];
                }
                console.log(scope.viewDots);
            }
            viewDotSlide();

            scope.next = function() {
                viewDotSlide();
                if(scope.currentIndex >= scope.slideshow.length - 1) {
                    scope.currentIndex = 0;
                } else {
                    scope.currentIndex++;
                }
            //    scope.dotIndex++;
              
                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.previous = function() {
                viewDotSlide();
                if(scope.currentIndex <= 0) {
                    scope.currentIndex = scope.slideshow.length - 1;
                } else {
                    scope.currentIndex--;
                }
                if(scope.dotIndex <= 0) {
                    scope.dotIndex = scope.viewDots.length - 1;
                } else {
                    scope.dotIndex--;
                }
                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.thisImage = function(index) {
                scope.currentIndex = index;
                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.$watch('currentIndex', function() {
                changeImage(scope.slideshow, scope.currentIndex);
            });

            function autoSlide() {
                // slideTimer = $interval(function() {
                //     scope.next();
                // }, 5000);
            }
            autoSlide();

            function changeImage(dataset, index) {
                for(let i = 0; i < dataset.length; i++) {
                    if(index === i) {
                        dataset[i].visible = true;
                    } else {
                        dataset[i].visible = false;
                    }
                }
            }
        }
    }
})();