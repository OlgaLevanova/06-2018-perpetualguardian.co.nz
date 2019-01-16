import Helpers from '../modules/helpers';
import ScrollSmooth from "../modules/scrollSmooth";

const SideBar = {
    SideBar: null,
    BlockLoop: null,
    SideMenu: null,
    Testimonial: null,
    Headings: null,
    TotalAnchors : null,
    PageFooter: null,
    bindEvents: () => {

        // Set all variables
        SideBar.setVars();
        SideBar.changeSideBarGradient();
        // Init side menu
        if (SideBar.SideBar) {
            if (SideBar.Headings) {
                SideBar.initHeadingsAsAnchors();
            }
            
            if(SideBar.TotalAnchors.length > 0) {
                SideBar.initDataAnchors();
                SideBar.initTestimonial();
                SideBar.initSideBar();
            } else {
                SideBar.SideBar.classList.add('hidden');
            }
        }
    },
    setVars: () => {
        SideBar.SideBar = document.getElementsByClassName('sib-sidebar')[0];
        SideBar.BlockLoop = document.getElementsByClassName('sib-block-loop')[0];
        SideBar.SideMenu = document.getElementById('sidemenu-list');
        SideBar.Testimonial = document.getElementsByClassName('sib-testimonial')[0];
        SideBar.Headings = document.querySelectorAll("[data-anchor=TextHeading]");
        SideBar.TotalAnchors = document.querySelectorAll("[data-anchor]");
        SideBar.PageFooter = document.querySelector(".sib-footer");
        SideBar.Sections = document.querySelector("section");
    },
    changeSideBarGradient: () => {
        const is_iPad = navigator.userAgent.match(/iPad/i) != null;
        const ViewPort = Helpers.getWindowSize().height;
        const marginLeft = (ViewPort - 1470 ) / 2;

        console.log(marginLeft);
        for (let i = 0; i < SideBar.Sections.length; i++) {


                SideBar.Sections[i].classList.add();




        }
    },
    initSideBar: () => {
        document.addEventListener('scroll', () => {

            if (Helpers.getWindowSize().width > 768) {
                if (SideBar.BlockLoop.getBoundingClientRect().top <= 100) {
                    SideBar.SideBar.classList.add('fixed');
                } else {
                    SideBar.SideBar.classList.remove('fixed');
                }
            }


        });

        SideBar.PageFooter.classList.add('sidebar-active');
    },
    initTestimonial: () => {
        let sideBarSelector = document.querySelector('.sib-sidebar');

        // Hide Testimonial for screens with less height than 768px
        if (Helpers.getWindowSize().height < 769) {
              SideBar.Testimonial.classList.add('hide');
              } else {
              SideBar.Testimonial.classList.remove('hide');
        }

        // Check if the first block loop height is greater than sidebar height
        if (sideBarSelector.getBoundingClientRect().height < SideBar.TotalAnchors[0].getBoundingClientRect().height ) {
          SideBar.Testimonial.classList.add('hide');
         } else {
              SideBar.Testimonial.classList.remove('hide');
         }
    },
    initHeadingsAsAnchors: () => {
        for (let i = 0; i < SideBar.Headings.length; i++) {
              const html = SideBar.Headings[i].innerHTML;

              SideBar.Headings[i].setAttribute("data-anchor", html);
        }
    },
    initDataAnchors: () => {
        for (let i = 0; i < SideBar.TotalAnchors.length; i++) {
                let listItem = document.createElement("LI");
                let textnode = document.createTextNode(SideBar.TotalAnchors[i].getAttribute('data-anchor'));

                listItem.appendChild(textnode);
                listItem.setAttribute("data-origin", SideBar.TotalAnchors[i].getAttribute('data-anchor'));
                listItem.classList.add('sidemenu-item');
                SideBar.SideMenu.appendChild(listItem);

                listItem.addEventListener('click', (e) => {
                    e.preventDefault();

                    SideBar.ListItems = document.getElementsByClassName("sidemenu-item");

                    for (let k = 0; k < SideBar.ListItems.length; k++) {
                         SideBar.ListItems[k].classList.remove('active');
                     }

                    listItem.classList.add('active');

                    let dataId = listItem.getAttribute('data-origin');

                    let destination = document.querySelector("[data-anchor='" + dataId + "']");

                    // Scroll to this block

                    ScrollSmooth.initScroll(destination, 4);

                });

        }

        window.addEventListener('scroll', (e) => {
          let sideBarSelector = document.querySelector('.sib-sidebar');
            for (let k = 0; k < SideBar.TotalAnchors.length; k++) {
                SideBar.TotalAnchors[k].classList.remove('active');


                 let listItem = document.querySelector("[data-origin='" + SideBar.TotalAnchors[k].getAttribute('data-anchor')+"']");

                 if (SideBar.TotalAnchors[k].getAttribute('data-anchor') == 'FAQ' ) {
                   if (SideBar.TotalAnchors[k].getBoundingClientRect().top < 0 && SideBar.TotalAnchors[k].getBoundingClientRect().bottom > 0) {
                       listItem.classList.add('active');

                       if (sideBarSelector.getBoundingClientRect().height < SideBar.TotalAnchors[k].getBoundingClientRect().height) {
                            SideBar.Testimonial.classList.add('hide');
                       } else {
                            SideBar.Testimonial.classList.remove('hide');
                       }
                   } else {
                       listItem.classList.remove('active');
                   }
                 } else {
                   if (SideBar.TotalAnchors[k].parentNode.getBoundingClientRect().top < 0 && SideBar.TotalAnchors[k].parentNode.getBoundingClientRect().bottom > 0) {
                       listItem.classList.add('active');

                       if (sideBarSelector.getBoundingClientRect().height < SideBar.TotalAnchors[k].getBoundingClientRect().height) {
                            SideBar.Testimonial.classList.add('hide');
                       } else {
                            SideBar.Testimonial.classList.remove('hide');
                       }
                   } else {
                       listItem.classList.remove('active');
                   }
                 }


             }
        });

    },
};

module.exports = SideBar;
