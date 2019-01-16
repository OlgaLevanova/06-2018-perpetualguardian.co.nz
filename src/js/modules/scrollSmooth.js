const ScrollSmooth = {
    destinationOffsetToScroll: 100,
    start: 0,
    startTime: 0,
    duration: 0,
    menuHeight: 100,
    setVars: (destination, speed = 4) => {
        ScrollSmooth.start = window.pageYOffset;
        ScrollSmooth.startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        ScrollSmooth.destination = destination;
        ScrollSmooth.destinationOffsetToScroll = Math.round(ScrollSmooth.offset(destination));
        ScrollSmooth.duration = Math.round(Math.round(ScrollSmooth.getRectTop(destination)/speed));
    },
    initScroll: (destination, duration) => {

        ScrollSmooth.setVars(destination, duration);

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, ScrollSmooth.destinationOffsetToScroll);
        }

        ScrollSmooth.scroll();
    },
    scroll: () => {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - ScrollSmooth.startTime) / ScrollSmooth.duration));
        window.scroll(0, Math.ceil((time * (ScrollSmooth.destinationOffsetToScroll - ScrollSmooth.start)) + ScrollSmooth.start));

        if (
            (window.pageYOffset + window.innerHeight) < document.documentElement.scrollHeight &&
            Math.ceil(window.pageYOffset) < ScrollSmooth.destinationOffsetToScroll
        ) {
            requestAnimationFrame(ScrollSmooth.scroll);
        }

    },
    offset: (el) => {
        let rectTop = ScrollSmooth.getRectTop(el);

        return rectTop + (window.pageYOffset || document.documentElement.scrollTop) - ScrollSmooth.menuHeight
    },
    getRectTop: (el) => {
        return el.getBoundingClientRect().top;
    }
};

module.exports = ScrollSmooth;