import $ from 'jquery';
import Helpers from "../modules/helpers";
import Accordion from "../modules/accordion";

const Anchor = {
    vars: {
        openClass: 'open-js',
        BottomMenuLevel1: null
    },
    bindEvents: () => {

        // Set all variables
        BottomMenu.setVars();

        // Init bottom menu
        if ( BottomMenu.BottomMenuLevel1 ) {
            BottomMenu.initBottomMenu();
        }
    },
    setVars: () => {
        BottomMenu.BottomMenuLevel1 = document.getElementsByClassName('sib-menu-footer-level-1__li');
    },
    initBottomMenu: () => {
        // Init accordion menu
        Accordion.initAccordion(BottomMenu.BottomMenuLevel1, false);
    }
};

module.exports = Anchor;
