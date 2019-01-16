import $ from 'jquery';
import Helpers from "./helpers";
import ScrollSmooth from "./scrollSmooth";

const Accordion = {
    vars: {
        openClass: 'open-js'
    },
    initAccordion: (accordionContainers, scroll) => {
        // Go through each accordion's container
        for (let i = 0; i < accordionContainers.length; i++) {

            // Trigger - button user has to click to open/close accordion's block
            let accordionTrigger = accordionContainers[i].querySelectorAll('[data-accordion="trigger"]')[0];

            if (accordionTrigger) {
                accordionTrigger.addEventListener('click', (e) => {

                    // If trigger is inside link we have to stop default action
                    e.stopPropagation();
                    e.preventDefault();

                    // Find accordions block to open/close
                    let accordionBlock = accordionContainers[i].querySelectorAll('[data-accordion="open"]')[0];

                    if (accordionBlock) {
                        // Close if it's opened
                        if (accordionBlock.classList.contains(Accordion.vars.openClass)) {
                            Helpers.closeBlock(accordionBlock, Accordion.vars.openClass);
                        // Open if it's closed
                        } else {

                            // Close opened accordion's block
                            for (let j = 0; j < accordionContainers.length; j++) {
                                if (accordionTrigger) {
                                    let accordionBlockOpened = accordionContainers[j].querySelectorAll('[data-accordion="open"]')[0];

                                    Helpers.closeBlock(accordionBlockOpened, Accordion.vars.openClass);
                                }
                            }

                            // open active accordion's block
                            Helpers.openBlock(accordionBlock, Accordion.vars.openClass);

                            // Scroll to active accordion's block
                            if(scroll) ScrollSmooth.initScroll(accordionBlock.closest('li'), 1);
                        }
                    }
                });
            }
        }
    }
};

module.exports = Accordion;

