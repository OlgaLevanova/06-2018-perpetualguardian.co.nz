import $ from 'jquery';
import slick from 'slick-carousel';

const NewsSlider = {
    NewsSlide: null,
    vars: {
        NewsSliderClass: 'sib-news-list__slider'
    },
    init: () => {

        // Set all variables
        NewsSlider.setVars();

        // Init NewsSlider accordion
        NewsSlider.initSlick();
    },
    setVars: () => {
        NewsSlider.NewsSlide = $(document.getElementsByClassName(NewsSlider.vars.NewsSliderClass)[0]);
    },
    initSlick: () => {
        // Dots must be in slide, but it's not possible to have multiple sets of dots for each slide,
        // So move dots container from slide to slide when slider was initiate and on change active slide
        NewsSlider.NewsSlide.on('afterChange', function(){
            NewsSlider.moveSlickDots();
        });
        NewsSlider.NewsSlide.on('init', function(){
            NewsSlider.moveSlickDots();
        });

        // Init slider
        NewsSlider.NewsSlide.slick({
            dots: true,
            arrows: true,
            slidesToShow: 1,
            infinite: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: false,
                        arrows: false
                    }
                }
            ]
        });
    },
    // Move dots and make them visible
    moveSlickDots: () => {
        let $dots = $('.slick-dots');

        $dots.removeClass('slick-dots--moved');

        $('.slick-current').find('.sib-news-list__slider__info').prepend($dots);

        $dots.addClass('slick-dots--moved');
    },
    clearSlick: () => {

        // Destroy Slider
        NewsSlider.NewsSlide.slick('unslick');

        // Clear Slider
        NewsSlider.NewsSlide.find('.sib-news-list__slide').remove();
    },
    appendSlide: (slide) => {
        NewsSlider.NewsSlide.append($(slide));
    }
};

module.exports = NewsSlider;
