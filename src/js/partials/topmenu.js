import $ from 'jquery';
import Helpers from '../modules/helpers';

const TopMenu = {
    vars: {
        openUlClass: 'open-js',
        openLiClass: 'open-li-js',
        navBarScrolledClass: 'scrolled',
        topMenuLevel1: null,
        switchLocale: null
    },
    sibNavBar: null,
    bindEvents: () => {

        // Set all variables
        TopMenu.setVars();

        // Init top menu
        if ( TopMenu.topMenuLevel1 ) {
            TopMenu.initTopMenu();
        }

        // Init locale switcher
       /* if ( TopMenu.topMenuLevel1 ) {
            TopMenu.initSwitchLocale();
        }*/

        // Init scroll event to switch class on header
        TopMenu.initSwitchHeader();
    },
    setVars: () => {
        TopMenu.topMenuLevel1 = document.getElementsByClassName('sib-menu-top-level-1__li');
        TopMenu.switchLocale = document.getElementsByClassName('switch-locale')[0];
        TopMenu.sibNavBar = document.getElementsByClassName('sib-nav-bar')[0];
    },
    initTopMenu: () => {
        // Init drop down menu
        for (let i = 0; i < TopMenu.topMenuLevel1.length; i++) {

            if(!TopMenu.topMenuLevel1[i].classList.contains('switch-locale')) {
                TopMenu.topMenuLevel1[i].addEventListener('mouseenter', (e) => {

                    let subMenu = TopMenu.topMenuLevel1[i].getElementsByTagName('ul')[0];

                    if (subMenu) {
                        //TopMenu.openSubMenu(subMenu);
                        Helpers.openSubMenu(subMenu, TopMenu.vars.openUlClass);
                    }
                });
                TopMenu.topMenuLevel1[i].addEventListener('mouseleave', (e) => {

                    let subMenu = TopMenu.topMenuLevel1[i].getElementsByTagName('ul')[0];

                    if (subMenu) {
                        //TopMenu.closeSubMenu(subMenu);
                        Helpers.closeSubMenu(subMenu, TopMenu.vars.openUlClass);
                    }
                });
            }
        }
    },
    initSwitchLocale: () => {
        TopMenu.switchLocale.addEventListener('click', (e) => {
            let subMenu = TopMenu.switchLocale.getElementsByTagName('ul')[0];

            if(subMenu.classList.contains(TopMenu.vars.openUlClass)) {
                //TopMenu.closeSubMenu(subMenu);
                Helpers.closeSubMenu(subMenu, TopMenu.vars.openUlClass);
                TopMenu.switchLocale.classList.remove(TopMenu.vars.openLiClass);
            } else {
                //TopMenu.openSubMenu(subMenu);
                Helpers.openSubMenu(subMenu, TopMenu.vars.openUlClass);
                TopMenu.switchLocale.classList.add(TopMenu.vars.openLiClass);
            }
        });
    },
    initSwitchHeader: () => {
        window.addEventListener('scroll', function(e) {
            let scrollY = window.pageYOffset;

            if( !TopMenu.sibNavBar.classList.contains(TopMenu.vars.navBarScrolledClass) && scrollY >= 20 ) {
                TopMenu.sibNavBar.classList.add(TopMenu.vars.navBarScrolledClass);
            }
            if( TopMenu.sibNavBar.classList.contains(TopMenu.vars.navBarScrolledClass) && scrollY < 20 ) {
                TopMenu.sibNavBar.classList.remove(TopMenu.vars.navBarScrolledClass);
            }
        });
    }
};

module.exports = TopMenu;
