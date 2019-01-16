import $ from 'jquery';
import Accordion from "../modules/accordion";

const Faq = {
    FaqList: null,
    FaqLevel1: null,
    FaqOpenMoreButtons: null,
    vars: {
        FaqListClass: 'faq__list',
        FaqClass: 'faq__list__single',
        FaqVisibleClass: 'faq__list__single--visible',
        FaqMoreClass: 'faq__more',
        FaqMoreHiddenClass: 'faq__more--hidden',
        FaqAllFaqClass: 'faq__list--all-faq',
        NumberOfVisibleFaq: 5
    },
    bindEvents: () => {

        // Set all variables
        Faq.setVars();

        // Init faq accordion
        if ( Faq.FaqLevel1.length > 0 ) {
            Faq.initFaq();

            Faq.initAccordionFaq();

            Faq.openMoreFaq();
        }
    },
    setVars: () => {
        Faq.FaqList = document.getElementsByClassName(Faq.vars.FaqListClass);
        Faq.FaqLevel1 = document.getElementsByClassName(Faq.vars.FaqClass);
        Faq.FaqOpenMoreButtons = document.querySelectorAll('[data-faq-button]');
    },
    initFaq: () => {
        // Go through each list
        for(let i = 0; i < Faq.FaqList.length; i++){

            let faqLevel1 = Faq.FaqList[i].getElementsByClassName(Faq.vars.FaqClass);
            let faqAllFaq = Faq.FaqList[i].classList.contains(Faq.vars.FaqAllFaqClass);
            let numberOfVisibleFaq = faqLevel1.length;

            if ( !faqAllFaq && faqLevel1.length > Faq.vars.NumberOfVisibleFaq ) {
                numberOfVisibleFaq = Faq.vars.NumberOfVisibleFaq;
            }

            for(let j = 0; j < numberOfVisibleFaq; j++){
                faqLevel1[j].classList.add(Faq.vars.FaqVisibleClass);
            }
        }
    },
    initAccordionFaq: () => {
        Accordion.initAccordion(Faq.FaqLevel1, true);
    },
    openMoreFaq: () => {

        for(let i = 0; i < Faq.FaqOpenMoreButtons.length; i++){

            // Show all FAQ in selected list
            Faq.FaqOpenMoreButtons[i].addEventListener('click', (e) => {
                var elem = Faq.FaqOpenMoreButtons[i];
                let MoreButtonsId = elem.dataset.faqButton;

                let faqToShow = document.querySelectorAll("[data-faq='" + MoreButtonsId + "']")[0].getElementsByClassName(Faq.vars.FaqClass);

                for (let i = 5; i < faqToShow.length; i++) {
                    faqToShow[i].classList.add(Faq.vars.FaqVisibleClass);
                }

                // Hide row with selected More button
                var els = [];
                do {
                    els.unshift(elem);
                    elem = elem.parentNode;
                } while ( !elem.classList.contains(Faq.vars.FaqMoreClass) );

                elem.classList.add(Faq.vars.FaqMoreHiddenClass);
            });
        }
    }
};

module.exports = Faq;
