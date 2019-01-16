
import AlgoliaSearch from './partials/search';
import Anchor from './partials/anchor';
import BottomMenu from './partials/bottommenu';
import Branch from './partials/branch';
import DatePicker from './partials/datepicker';
import Faq from './partials/faq';
import FilterItems from './partials/filter-items';
import FilterScroll from './partials/filter-scroll';
import FormValidate from './partials/validate';
import HomeSlider from './partials/home-slider';
import LoadMoreText from './partials/load-more-text';
import Map from './partials/map';
import ModalVideo from './partials/modal-video';
import NewsSlider from './partials/news-slider';
import PGGrid from './partials/pgGrid';
import SibOverlay from './partials/overlay';
import SideBar from './partials/sidebar';
import SideMenu from './partials/sidemenu';
import TopMenu from './partials/topmenu';
import TrustQuestions from './partials/trust-questions';

/* Global variables */
const appVars = {
    timer: 5000
};

document.addEventListener('DOMContentLoaded', function init() {
    // window.appVars = appVars;
    //

    AlgoliaSearch.bindEvents();
    Branch.bindEvents();
    BottomMenu.bindEvents();
    DatePicker.bindEvents();
    Faq.bindEvents();
    FilterItems.init();
    FilterScroll.init();
    FormValidate.bindEvents();
    HomeSlider.init();
    LoadMoreText.init();
    Map.initMap();
    ModalVideo.init();
    NewsSlider.init();
    PGGrid.bindEvents();
    SibOverlay.bindEvents();
    SideBar.bindEvents();
    SideMenu.bindEvents();
    TopMenu.bindEvents();
    TrustQuestions.init();

});

