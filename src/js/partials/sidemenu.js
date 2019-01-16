import $ from 'jquery';
import Helpers from '../modules/helpers';
import Accordion from "../modules/accordion";

const SideMenu = {
    vars: {
        openClass: 'open-js',
        openSideMenuClass: 'side-menu-opened',
        overflowHiddenClass: 'overflowHidden'
    },
    SideMenuLevel1: null,
    SideMenuTrigger: null,
    mainWrapper: null,
    body: null,
    bindEvents: () => {

        // Set all variables
        SideMenu.setVars();

        // Init side menu
        if ( SideMenu.SideMenuLevel1 ) {
            SideMenu.initSideMenu();
            SideMenu.accordionSideMenu();
        }
    },
    setVars: () => {
        SideMenu.SideMenuLevel1 = document.getElementsByClassName('sib-aside-menu-level-1__li');
        SideMenu.SideMenuTrigger = document.getElementsByClassName('side-menu-trigger');
        SideMenu.mainWrapper = document.getElementById('main-wrapper');
        SideMenu.body = $('body, html');
    },
    initSideMenu: () => {
        for (let i = 0; i < SideMenu.SideMenuTrigger.length; i++) {
            SideMenu.SideMenuTrigger[i].addEventListener('click', (e) => {

                if(SideMenu.mainWrapper.classList.contains(SideMenu.vars.openSideMenuClass)) {
                    SideMenu.closeSideMenu();
                } else {
                    SideMenu.mainWrapper.classList.add(SideMenu.vars.openSideMenuClass);
                    SideMenu.body.addClass(SideMenu.vars.overflowHiddenClass);
                }
            });
        }
    },
    accordionSideMenu: () => {
        // Init accordion menu
        Accordion.initAccordion(SideMenu.SideMenuLevel1, false);
    },
    closeSideMenu: () => {
        SideMenu.mainWrapper.classList.remove(SideMenu.vars.openSideMenuClass);
        SideMenu.body.removeClass(SideMenu.vars.overflowHiddenClass);
    },
    elasticbackground: () => {

    }
};

module.exports = SideMenu;
