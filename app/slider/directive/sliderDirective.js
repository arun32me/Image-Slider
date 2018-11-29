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

            // scope.viewDots = scope.slideshow.slice();
            // scope.viewDots.length = 3;

            // function slideDotRoller() {
            //     console.log('slideDotRoller');
            //     if(scope.currentIndex === scope.viewDots.length - 2) {
            //         console.log('On Image');
            //         let lastIndex = scope.slideshow.length - 1;
            //         console.log('lastIndex : '+lastIndex);
            //         let numOfElements = 3;
            //         if((scope.viewDots.length - 1) + numOfElements > lastIndex) {
            //             numOfElements = lastIndex - scope.currentIndex;
            //         }
            //         console.log('numOfElements : ' + numOfElements);
            //         let subArr = scope.slideshow.slice(scope.currentIndex + 1, scope.currentIndex + numOfElements + 1);
            //         console.log(subArr);
            //         scope.viewDots = scope.viewDots.concat(subArr);
            //         scope.viewDots.splice(0, numOfElements);
            //         console.log(scope.viewDots);
            //     }
            // }

            scope.next = function() {
                if(scope.currentIndex >= scope.slideshow.length - 1) {
                    scope.currentIndex = 0;
                } else {
                    scope.currentIndex++;
                }
                // slideDotRoller();
                $interval.cancel(slideTimer);
                autoSlide();
            }

            scope.previous = function() {
                if(scope.currentIndex <= 0) {
                    scope.currentIndex = scope.slideshow.length - 1;
                } else {
                    scope.currentIndex--;
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
                changeImage();
            });

            function autoSlide() {
                slideTimer = $interval(function() {
                    scope.next();
                }, 5000);
            }
            autoSlide();

            function changeImage() {
                for(let i = 0; i < scope.slideshow.length; i++) {
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