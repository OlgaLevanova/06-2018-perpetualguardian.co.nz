import $ from 'jquery';

const SibOverlay = {
    body: null,
    overflowHiddenClass: 'overflowHidden',
    hideDetailsClass: 'sib-overlay-team--hide',
    overlay: null,
    setVars: () => {
        SibOverlay.body = $('body, html');
        SibOverlay.overlay = $('#sib-overlay--contact-team');
    },
    bindEvents: () => {

        SibOverlay.setVars();

        const sibOverlays = document.getElementsByClassName('sib-overlay__toggle');

        if (sibOverlays.length) {
            SibOverlay.init(sibOverlays);
        }

    },

    init: (overlays) => {

        for (let i = 0; i < overlays.length; i++) {
            overlays[i].addEventListener('click', (e) => {
                e.preventDefault();

                // If user clicked on black background
                if ($(overlays[i]).hasClass('sib-overlay')) {
                    e.stopPropagation();

                    // Check target element so we don't close popup when user click on image or text in popup
                    if ($(e.target).hasClass('sib-overlay') ||
                        $(e.target).hasClass('sib-modal__person') ||
                        $(e.target).hasClass('sib-modal__col')) {
                        SibOverlay.overlayToggle(e, overlays[i]);
                    }
                }
                // If user clicked on Read More or Close button
                if (overlays[i].hasAttribute('data-target') || $(overlays[i]).hasClass('sib-modal__close')) {
                    SibOverlay.overlayToggle(e, overlays[i]);
                }

            });
        }

        // auto-open toggles
        setTimeout(function () {
            let autoLoadElement = document.getElementsByClassName('sib-overlay__toggle auto-load');
            if (autoLoadElement.length) {
                autoLoadElement[0].click();
            }
        }, 1000);
    },

    /**
     * this method will toggle classes to let body and html
     * keep track of overlay states.
     * this will also keep track of previous scroll-position
     */
    updateOverlayStatus: () => {
        let overlay = document.getElementsByClassName('sib-overlay active');

        if (overlay.length) {
            SibOverlay.body.addClass(SibOverlay.overflowHiddenClass);

        } else {

            SibOverlay.body.removeClass(SibOverlay.overflowHiddenClass);

            let body = document.getElementsByTagName('body')[0];

            if (body) {
                if (body.hasAttribute('data-y')) {
                    let scrollY = parseInt(body.getAttribute('data-y'));
                    window.scrollTo(0, scrollY);
                }
            }
        }
    },
    overlayToggle: (e, overlayItem) => {
        let overlayContentType = overlayItem.hasAttribute('data-type') ? overlayItem.getAttribute('data-type') : '';
        // track current scroll position when loading overlay
        if (!document.getElementsByClassName('sib-overlay active')[0]) {
            document.getElementsByTagName('body')[0].setAttribute('data-y', window.pageYOffset);
        }

        if (overlayItem.hasAttribute('data-target')) {
            let overlayModal = document.getElementById(overlayItem.getAttribute('data-target'));
            if (overlayModal) {
                // hook before displaying the overlay
                if (overlayContentType === 'contact-team') {
                    SibOverlay.loadContactTeam(e);
                }
                overlayModal.classList.toggle('active');
                SibOverlay.updateOverlayStatus();
            }
        } else {
            let overlay = document.getElementsByClassName('sib-overlay')[0];
            overlay.classList.remove('active');
            SibOverlay.updateOverlayStatus();
        }

        if (overlayItem.hasAttribute('data-focus')) {
            let focusElement = document.getElementById(overlayItem.getAttribute('data-focus'));
            if (focusElement) {
                focusElement.focus();
            }
        }
    },
    /**
     * this will load contact-sales-team info to the overlay
     */
    loadContactTeam: (e) => {
        let $elm = $(e.currentTarget);

        // Vcard
        let vcardText = $elm.find('.sib-team__vcard').text();
        let vcardElement = SibOverlay.overlay.find('.sib-overlay-team__vcard');
        if (vcardText === '') {
            vcardElement.addClass(SibOverlay.hideDetailsClass);
        } else {
            vcardElement.removeClass(SibOverlay.hideDetailsClass);
            vcardElement.attr('href', vcardText);
        }

        // email address
        let emailText = $elm.find('.sib-team__email').html();
        let emailElement = SibOverlay.overlay.find('.sib-overlay-team__email');
        if (emailText === '') {
            emailElement.addClass(SibOverlay.hideDetailsClass);
        } else {
            emailElement.removeClass(SibOverlay.hideDetailsClass);
            emailElement.html(emailText);
        }

        // Linkedin
        let linkedinText = $elm.find('.sib-team__linkedin').text();
        let linkedinElement = SibOverlay.overlay.find('.sib-overlay-team__linkedin');
        if (linkedinText === '') {
            linkedinElement.addClass(SibOverlay.hideDetailsClass);
        } else {
            linkedinElement.removeClass(SibOverlay.hideDetailsClass);
            linkedinElement.attr('href', linkedinText);
        }

        // Phone number and text
        let phoneNumber = $elm.find('.sib-team__number').text();
        let phoneNumberElement = SibOverlay.overlay.find('.sib-overlay-team__number');
        if (phoneNumber === '') {
            phoneNumberElement.addClass(SibOverlay.hideDetailsClass);
        } else {
            phoneNumberElement.removeClass(SibOverlay.hideDetailsClass);
            phoneNumberElement.attr('href', `tel: ${phoneNumber}`);
            SibOverlay.overlay.find('.sib-overlay-team__number--text').html($elm.find('.sib-team__number').text());
        }

        // update name
        SibOverlay.overlay.find('.sib-modal__person__title').html(`${$elm.find('.sib-team__title').html()} <span>${$elm.find('.sib-team__position').html()}</span>`);
        // location
        SibOverlay.overlay.find('.sib-overlay-team__location').html($elm.find('.sib-team__location').html());
        // staff text
        SibOverlay.overlay.find('.sib-modal__person__content').html($elm.find('.sib-team__content').html());
        // update image
        SibOverlay.overlay.find('.sib-modal__person__img').css('background-image', `url('${$elm.find('.sib-team__image').text()}')`);

    }
};

module.exports = SibOverlay;
