import $ from 'jquery';
import MagnificPopup from 'magnific-popup';

const ModalVideo = {
    videoAttr: 'data-video',
    openVideoButtons: null,
    init: () => {
        // Set all variables
        ModalVideo.setVars();

        // Bind events
        ModalVideo.bindEvents();

    },
    setVars: () => {
        // Find all elements with .col-pg-content
        ModalVideo.openVideoButtons = document.querySelectorAll('[' + ModalVideo.videoAttr + ']');
    },
    bindEvents: () => {
        for( let i = 0; i < ModalVideo.openVideoButtons.length; i++ ) {

            ModalVideo.openVideoButtons[i].addEventListener('click', (e) => {

                // Stop any action if video button is inside link
                e.preventDefault();
                e.stopPropagation();

                let videoId = e.target.getAttribute(ModalVideo.videoAttr);
                let videoTitle = e.target.getAttribute('title');

                $.magnificPopup.open({
                    items: {
                        src: `http://www.youtube.com/watch?v=${videoId}`
                    },
                    type: 'iframe',
                    iframe: {
                        markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '<div class="mfp-title">' + videoTitle + '</div>'+
                        '</div>'
                    },
                    removalDelay: 300,
                    mainClass: 'mfp-fade',
                    callbacks: {
                        open: function() {
                            if(videoTitle == '') $('.mfp-content').addClass('mfp-content--no-title');
                        }
                    }
                });
            });
        }
    }
};

module.exports = ModalVideo;
