import $ from 'jquery';

const PGGrid = {
    PGGridContentElements: null,
    scrollWidth: null,
    // Max width of container in bootstrap grid
    containerMaxWidths: '1470px',
    bindEvents: () => {

        // Set all variables
        PGGrid.setVars();

        // Init grid
        PGGrid.initPGGrid();
    },
    setVars: () => {
        // Find all elements with .col-pg-content
        PGGrid.PGGridContentElements = document.getElementsByClassName('col-pg-content');
        PGGrid.scrollWidth = PGGrid.getScrollWidth();
    },
    initPGGrid: () => {
        if( PGGrid.PGGridContentElements.length > 0 ) {
            for (let i = 0; i < PGGrid.PGGridContentElements.length; i++) {

                // Set margin-left for each .col-pg-content.col-pg-left element
                if( PGGrid.PGGridContentElements[i].classList.contains('col-pg-left') ) {
                    PGGrid.setMargin(PGGrid.PGGridContentElements[i], 'Left');
                }
                // Set margin-right for each .col-pg-content.col-pg-right element
                if( PGGrid.PGGridContentElements[i].classList.contains('col-pg-right') ) {
                    PGGrid.setMargin(PGGrid.PGGridContentElements[i], 'Right');
                }
            }
        }
    },
    // Get scroll bar width
    getScrollWidth: () => {
        return window.innerWidth - document.documentElement.clientWidth;
    },
    setMargin: (element, side) => {
        /*element.getElementsByClassName('col-pg-shift')[0].setAttribute(
            'style',
            'margin-' + side + ':calc((' + PGGrid.containerMaxWidths + ' - (100vw - ' + PGGrid.scrollWidth + 'px)) / 2)'
        );*/
        element.getElementsByClassName('col-pg-shift')[0].style['margin' + side] =
            'calc((' + PGGrid.containerMaxWidths + ' - (100vw - ' + PGGrid.scrollWidth + 'px)) / 2)';
    }
};

module.exports = PGGrid;
