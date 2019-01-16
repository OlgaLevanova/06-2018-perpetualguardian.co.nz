import $ from 'jquery';

const Helpers = {
    // get height of element
    getHeight: (elem) => {
        return Math.max(elem.scrollHeight, elem.offsetHeight, elem.clientHeight);
    },

    // get window size
    getWindowSize: () => {
        let winH;
        let winW;
        if (window.innerWidth) {
            winW = window.innerWidth;
            winH = window.innerHeight;
        } else if (document.body && document.body.offsetWidth) {
            winW = document.body.offsetWidth;
            winH = document.body.offsetHeight;
        }
        return {height: winH, width: winW};
    },

    equalHeight: (container, equal) => {
        const self = this;
        const containerEl = Array.from(document.querySelectorAll(container));

        if (containerEl.length) {
            containerEl.forEach(
              (el) => {
                  const equalelements = el.querySelectorAll(equal);
                  let highest = 0;
                  equalelements.forEach(
                    (elem) => {
                        if (self.getHeight(elem) > highest) {
                            highest = self.getHeight(elem);
                        }
                        elem.style.height = highest + 'px';
                    }
                  );
              }
            );
        }
    },

    openSubMenu: (subMenu, openClass) => {
        // Get Auto Height
        let autoHeight = $(subMenu).css('height', 'auto').height();
        $(subMenu).height(0);

        // Set submenu's height and open it
        $(subMenu).stop().animate({
            'height': autoHeight
        }, 100, function () {
            $(subMenu).height('auto')
                .css('overflow', 'visible')
                .addClass(openClass);
            $(subMenu).parent('li').addClass(openClass + '__parent');
        })
    },
    closeSubMenu: (subMenu, openClass) => {
        // Set submenu's height back to 0 and close it
        $(subMenu).stop().animate({
            'height': 0
        }, 100, function () {
            $(subMenu).css('overflow', 'hidden')
                .removeClass(openClass);
            $(subMenu).parent('li').removeClass(openClass + '__parent');
        });
    },
    openBlock: (subMenu, openClass) => {
        // Get Auto Height
        let autoHeight = $(subMenu).css('height', 'auto').height();
        $(subMenu).height(0);

        // Set submenu's height and open it
        $(subMenu).stop().animate({
            'height': autoHeight
        }, 100, function () {
            $(subMenu).height('auto')
                .css('overflow', 'visible')
                .addClass(openClass);
            $(subMenu).parent('li').addClass(openClass + '__parent');
        })
    },
    closeBlock: (subMenu, openClass) => {
        // Set submenu's height back to 0 and close it
        $(subMenu).stop().animate({
            'height': 0
        }, 100, function () {
            $(subMenu).css('overflow', 'hidden')
                .removeClass(openClass);
            $(subMenu).parent('li').removeClass(openClass + '__parent');
        });
    }
};

module.exports = Helpers;

