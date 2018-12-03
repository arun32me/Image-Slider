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
            scope.viewDotIndex = 0;

            scope.slideshow = [
                {
                    id : 0,
                    title: 'Image 1',
                    src: 'img1.jpg',
                    visible: true
                },
                {
                    id : 1,
                    title: 'Image 2',
                    src: 'img2.jpg',
                    visible: false
                },
                {
                    id : 2,
                    title: 'Image 3',
                    src: 'img3.jpg',
                    visible: false
                },
                {
                    id : 3,
                    title: 'Image 4',
                    src: 'img4.jpg',
                    visible: false
                },
                {
                    id : 4,
                    title: 'Image 5',
                    src: 'img5.jpg',
                    visible: false
                },
                {
                    id : 5,
                    title: 'Image 6',
                    src: 'img6.jpg',
                    visible: false
                }
                // ,
                // {
                //     title: 'Image 7',
                //     src: 'img7.jpg',
                //     visible: false
                // },
                // {
                //     title: 'Image 8',
                //     src: 'img8.jpg',
                //     visible: false
                // },
                // {
                //     title: 'Image 9',
                //     src: 'img9.jpg',
                //     visible: false
                // },
                // {
                //     title: 'Image 10',
                //     src: 'img10.jpg',
                //     visible: false
                // }
            ];

            scope.viewDots = scope.slideshow.slice();
            scope.viewDots.length = 3;
            let start = 0;
            let end = 3;

            scope.next = function () {
                if(scope.currentIndex >= scope.slideshow.length - 1) {
                    scope.currentIndex = 0;
                } else {
                    scope.currentIndex++;
                }
                if (scope.viewDotIndex >= scope.viewDots.length - 1) {
                    scope.viewDotIndex = 0;
                    if (end + 2 < scope.slideshow.length) {
                        start = end;
                        end = end + 3;
                        scope.viewDots = scope.slideshow.slice(start, end);
                    } else {
                        start = 0;
                        end = 3;
                        scope.viewDots = scope.slideshow.slice(start, end);
                    }
                    
                    // changeImage();

                } else {
                    scope.viewDotIndex++;
                }

                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.previous = function () {
                if(scope.currentIndex <= 0) {
                    scope.currentIndex = scope.slideshow.length - 1;
                } else {
                    scope.currentIndex--;
                }
                if (scope.viewDotIndex <= 0) {
                    scope.viewDotIndex = scope.viewDots.length - 1;
                    if (start - 2 > 0) {
                        end = 3;
                        start = 0;
                        scope.viewDots = scope.slideshow.slice(start, end);
                    } else {
                        start = 3;
                        end = scope.slideshow.length;
                        scope.viewDots = scope.slideshow.slice(start, end);
                    }
                } else {
                    scope.viewDotIndex--;
                }

                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.thisImage = function (index) {
                scope.viewDotIndex = index;
                scope.currentIndex = scope.viewDots[index].id;
                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.$watch('currentIndex', function () {
                changeImage();
            });

            function autoSlide() {
                slideTimer = $interval(function() {
                    scope.next();
                }, 5000);
            }
            autoSlide();

            function changeImage() {
                for (let i = 0; i < scope.slideshow.length; i++) {
                    if (scope.currentIndex === i) {
                        scope.slideshow[i].visible = true;
                    } else {
                        scope.slideshow[i].visible = false;
                    }
                }
                for (let i = 0; i < scope.viewDots.length; i++) {
                    if (scope.viewDotIndex === i) {
                        scope.viewDots[i].visible = true;
                    } else {
                        scope.viewDots[i].visible = false;
                    }
                }
            }

            scope.pauseSlide = function() {
                console.log("slide Paused");
                $interval.cancel(slideTimer);
            }
            scope.startSlide = function() {
                autoSlide();
            }
        }
    }
})();