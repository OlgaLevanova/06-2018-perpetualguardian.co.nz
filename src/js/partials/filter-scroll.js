import $ from 'jquery';
import Helpers from "../modules/helpers";
import ScrollSmooth from "../modules/scrollSmooth";

const FilterScroll = {
    vars:{
        openClass: 'open-js'
    },
    init: () => {

        let filterContainer = document.querySelector('[data-filter="container"]');
        if( filterContainer ) {
            FilterScroll.initFilterAccordion(filterContainer);
        }

        let items = document.querySelectorAll('[data-scroll-button]');
        if( items.length > 0 ) {
            FilterScroll.initFilterScroll(items);
        }
    },
    initFilterScroll: (items) => {

        for(let i = 0; i < items.length; i++){
            // Click on element in filter
            items[i].addEventListener('click', (e) => {

                e.preventDefault();

                let dataId = items[i].dataset.scrollButton;

                // Find related block
                let destination = document.querySelector("[data-scroll-block='" + dataId + "']");

                // Scroll to this block
                ScrollSmooth.initScroll(destination, 4);
            });
        }
    },
    // This is only for mobile/tablet when elements are in dropdown list
    initFilterAccordion: (filterContainer) => {

        let filterOpen = filterContainer.querySelectorAll('[data-filter="open"]');
        let filterTrigger = document.querySelector('[data-filter="trigger"]');

        // Click on open/close button
        filterTrigger.addEventListener('click', (e) => {

            e.stopPropagation();

            // Close list
            if (filterOpen[0].classList.contains(FilterScroll.vars.openClass)) {

                filterTrigger.classList.remove(FilterScroll.vars.openClass);

                for(let i = 0; i < filterOpen.length; i++){
                    // Close all filter's elements but first
                    if(i != 0) Helpers.closeBlock(filterOpen[i], FilterScroll.vars.openClass);
                    filterOpen[i].classList.remove(FilterScroll.vars.openClass);

                    // Remove styles so on resize we won't lose elements in filter
                    setTimeout(function(){
                        filterOpen[i].removeAttribute("style");
                    }, 500);
                }
            // Open list
            } else {
                for(let i = 0; i < filterOpen.length; i++){

                    filterTrigger.classList.add(FilterScroll.vars.openClass);

                    // Close all filter's elements but first
                    if(i != 0) Helpers.openBlock(filterOpen[i], FilterScroll.vars.openClass);
                    filterOpen[i].classList.add(FilterScroll.vars.openClass);
                }
            }
        });
    }
};

module.exports = FilterScroll;
