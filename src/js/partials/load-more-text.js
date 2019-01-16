import $ from 'jquery';

const LoadMoreText = {
    buttons: null,
    init: () => {

        // Set all variables
        LoadMoreText.setVars();

        // Bind events
        LoadMoreText.bindEvents();
    },
    setVars: () => {
        LoadMoreText.buttons = $('.sib-text-block__read-more');
    },
    bindEvents: () => {

        LoadMoreText.buttons.on( "click", function() {
            $(this).animate({
                width:0,
                height:0
            }, 200);

            $(this).parents('.sib-text-block').find('.sib-text-block__inner').removeClass('hide-mobile');
        });
    }
};

module.exports = LoadMoreText;
