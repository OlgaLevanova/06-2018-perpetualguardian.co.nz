import $ from 'jquery';
import Accordion from "../modules/accordion";

const Branch = {
    BranchList: null,
    BranchLevel1: null,
    BranchOpenMoreButtons: null,
    vars: {
        BranchListClass: 'sib-branch__list',
        BranchClass: 'sib-branch__list__single',
        BranchVisibleClass: 'sib-branch__list__single--visible',
        BranchMoreClass: 'sib-branch__more',
        BranchMoreHiddenClass: 'sib-branch__more--hidden',
        BranchAllBranchClass: 'sib-branch__list--all-branch',
        NumberOfVisibleBranch: 5
    },
    bindEvents: () => {

        // Set all variables
        Branch.setVars();

        // Init branch accordion
        if ( Branch.BranchLevel1.length > 0 ) {
            Branch.initBranch();

            Branch.initAccordionBranch();

            Branch.openMoreBranch();
        }
    },
    setVars: () => {
        Branch.BranchList = document.getElementsByClassName(Branch.vars.BranchListClass);
        Branch.BranchLevel1 = document.getElementsByClassName(Branch.vars.BranchClass);
        Branch.BranchOpenMoreButtons = document.querySelectorAll('[data-branch-button]');
    },
    initBranch: () => {
        // Go through each list
        for(let i = 0; i < Branch.BranchList.length; i++){

            let branchLevel1 = Branch.BranchList[i].getElementsByClassName(Branch.vars.BranchClass);
            let branchAllBranch = Branch.BranchList[i].classList.contains(Branch.vars.BranchAllBranchClass);
            let numberOfVisibleBranch = branchLevel1.length;

            if ( !branchAllBranch && branchLevel1.length > Branch.vars.NumberOfVisibleBranch ) {
                numberOfVisibleBranch = Branch.vars.NumberOfVisibleBranch;
            }

            for(let j = 0; j < numberOfVisibleBranch; j++){
                branchLevel1[j].classList.add(Branch.vars.BranchVisibleClass);
            }
        }
    },
    initAccordionBranch: () => {
        Accordion.initAccordion(Branch.BranchLevel1, false);
    },
    openMoreBranch: () => {

        for(let i = 0; i < Branch.BranchOpenMoreButtons.length; i++){

            // Show all FAQ in selected list
            Branch.BranchOpenMoreButtons[i].addEventListener('click', (e) => {
                var elem = Branch.BranchOpenMoreButtons[i];
                let MoreButtonsId = elem.dataset.branchButton;

                let branchToShow = document.querySelectorAll("[data-branch='" + MoreButtonsId + "']")[0].getElementsByClassName(Branch.vars.BranchClass);

                for (let i = 5; i < branchToShow.length; i++) {
                    branchToShow[i].classList.add(Branch.vars.BranchVisibleClass);
                }

                // Hide row with selected More button
                var els = [];
                do {
                    els.unshift(elem);
                    elem = elem.parentNode;
                } while ( !elem.classList.contains(Branch.vars.BranchMoreClass) );

                elem.classList.add(Branch.vars.BranchMoreHiddenClass);
            });
        }
    }
};

module.exports = Branch;
