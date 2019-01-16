import $ from 'jquery';
import slick from 'slick-carousel';

const HomeSlider = {
    HomeSlider: null,
    loader: null,
    vars: {
        HomeSliderClass: 'sib-home-slider__slick',
        autoPlaySpeed: 8000
    },
    init: () => {

        // Set all variables
        HomeSlider.setVars();

        // Init HomeSlider accordion
        HomeSlider.initSlick();
    },
    setVars: () => {
        HomeSlider.HomeSlider = $(document.getElementsByClassName(HomeSlider.vars.HomeSliderClass)[0]);
        HomeSlider.loader = $('#sib-home-slider__loader');
    },
    initSlick: () => {
        HomeSlider.HomeSlider.on('afterChange', function(){
            HomeSlider.startLoaderAnimation(HomeSlider.HomeSlider.slick('slickCurrentSlide'));
        });
        HomeSlider.HomeSlider.on('init', function(){
            HomeSlider.startLoaderAnimation(0);
        });

        // Init slider
        HomeSlider.HomeSlider.slick({
            dots: false,
            arrows: false,
            slidesToShow: 1,
            infinite: false,
            autoplay:true,
            pauseOnHover:false,
            autoplaySpeed:HomeSlider.vars.autoPlaySpeed
        });
    },
    startLoaderAnimation: (slideIndex) => {
        let param = {
            width: '66.6666%',
            left: '0'
        };
        if(slideIndex != 0) {
            param.width = '66.6666%';
            param.left = '33.3333%';
        }

        HomeSlider.loader.css({
            left:param.left,
            width:0
        });
        HomeSlider.loader.stop().animate({
            width:param.width
        }, HomeSlider.vars.autoPlaySpeed, function(){
            HomeSlider.loader.css({width:0});
        });
    }
};

module.exports = HomeSlider;
