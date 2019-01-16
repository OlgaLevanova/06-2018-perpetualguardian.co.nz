import $ from 'jquery';
import Helpers from '../modules/helpers';
import ScrollSmooth from "../modules/scrollSmooth";
import SideMenu from "./sidemenu.js";

const AlgoliaSearch = {
    body: null,
    setVars: () => {
        AlgoliaSearch.body = $('body, html');
    },
    bindEvents: () => {
        AlgoliaSearch.setVars();

        if (window.algoliasearch) {
            AlgoliaSearch.init();
        }

    },

    init: () => {
        // show search results when search form submits or keyword changes

        const searchForm = document.getElementsByClassName('sib-search__border')[0];
        const client = algoliasearch('Y5S9IW87W7', 'bb27d29ab9dd87e79fdd27f3cf1c5efd');
        const searchKeyword = searchForm.getElementsByClassName('sib-search__input')[0];
        const searchOpen = document.getElementsByClassName('sib-nav-bar__search')[0];
        const searchContainer = document.getElementsByClassName('sib-search__container')[0];
        const navBar = document.getElementsByClassName('sib-nav-bar')[0];
        let searchResultsPage = document.getElementsByClassName('sib-search__results')[0];


        let indexName = 'dev_PG';
        let hotSearch = false;
        let autoSearch = false;
        let perPage = 5;
        searchOpen.addEventListener('click', (e) => {
            e.preventDefault();

            const resultsContainer = document.getElementsByClassName('sib-search__wrapper')[0];
            const bodyContainer = document.getElementById('content');

            const logoImg = document.getElementsByClassName('logo-line')[0];
            const logoBlock = document.getElementsByClassName('logo-block')[0];
            const headerContainer = document.getElementsByClassName('sib-header')[0];


            if(!document.body.classList.contains('page-homepage')){
                //const headerContainer = document.getElementsByClassName('sib-header')[0];
            }


            if(searchOpen.classList.contains('icon-search')){

                // Close side Menu if it's opened
                SideMenu.closeSideMenu();

                AlgoliaSearch.body.addClass(SideMenu.vars.overflowHiddenClass);

                navBar.classList.add('search');
                searchOpen.classList.remove('icon-search');
                searchOpen.classList.add('icon-close');

                logoImg.src = '/images/logo-line-white.png';
                logoBlock.src = '/images/logo-block-white.png';

                searchKeyword.focus();

            }else{

                AlgoliaSearch.body.removeClass(SideMenu.vars.overflowHiddenClass);
                searchOpen.classList.remove('icon-close');
                searchOpen.classList.add('icon-search');
                navBar.classList.remove('search');
                navBar.classList.remove('searched');
                searchContainer.classList.remove('searched');
                bodyContainer.classList.remove('hide-content');
                resultsContainer.classList.add('hide-content');

                if(!document.body.classList.contains('page-cms-homepage')){
                    headerContainer.classList.remove('hide-content');
                    logoImg.src = '/images/logo-line-colored.png';
                    logoBlock.src = '/images/logo-block-colored.png';
                }
                ScrollSmooth.initScroll(document.getElementById("content"), 4);


            }


        });

        if (searchForm) {
            // Configurable Options for search module.
            // Refer to right search index
            if (searchForm.hasAttribute('data-index')) {
                indexName = searchForm.getAttribute('data-index')
            }
            // determine how the search results should work
            if (searchForm.hasAttribute('data-hotsearch')) {
                hotSearch = searchForm.getAttribute('data-hotsearch') == 'true';
            }
            // determine
            if (searchForm.hasAttribute('data-autosearch')) {
                autoSearch = searchForm.getAttribute('data-autosearch') == 'true';
            }
            // total items per page
            if (searchForm.hasAttribute('data-perpage')) {
                perPage = parseInt(searchForm.getAttribute('data-perpage'));
            }
        }
        const index = client.initIndex(indexName);

        if (hotSearch) {
            searchKeyword.addEventListener('keyup', (e) => {
                AlgoliaSearch.buildResults(index, searchKeyword.value, perPage);
            });
        } else {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                AlgoliaSearch.buildResults(index, searchKeyword.value, perPage);
            });
        }

        if (autoSearch) {
            AlgoliaSearch.buildResults(index, searchKeyword.value, perPage);
        }

        // Bind event on load-more button
        const loadMoreButton = document.getElementsByClassName('sib-search__more')[0];
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', (e) => {
                e.preventDefault();
                let results = document.getElementsByClassName('sib-search__item');
                let showCounter = 0;
                let displayed = 0;
                for (let i = 0; i < results.length; i++) {
                    if (showCounter < perPage && results[i].classList.contains('inactive')) {
                        results[i].classList.remove('inactive');
                        showCounter++;
                    }
                    if (!results[i].classList.contains('inactive')) {
                        displayed++;
                    }
                }
                AlgoliaSearch.buildResultStats(displayed, results.length);
            });
        }
    },

    buildResults: (index, keyword, perPage) => {
        const searchResultsTitle = document.getElementsByClassName('sib-search__title')[0];
        const searchResults = document.getElementsByClassName('sib-search__results')[0];
        const resultsContainer = document.getElementsByClassName('sib-search__wrapper')[0];
        const searchContainer = document.getElementsByClassName('sib-search__container')[0];

        const bodyContainer = document.getElementById('content');
        const navBar = document.getElementsByClassName('sib-nav-bar')[0];

        searchContainer.classList.add('searched');
        navBar.classList.add('searched');
        bodyContainer.classList.add('hide-content');
        if(!document.body.classList.contains('page-cms-homepage')){
            const headerContainer = document.getElementsByClassName('sib-header')[0];
            headerContainer.classList.add('hide-content');
        }

        resultsContainer.classList.remove('hide-content');

        let totalResults = 0;
        index.search(keyword, function(err, content) {
            let result = '';
            let resultsIsAre = content.hits.length == 1 ? 'is' : 'are';
            searchResultsTitle.innerHTML = `Showing ${content.hits.length} result${content.hits.length === 1 ? '' : 's'} for <strong>${content.query}</strong>.`;
            for (let i = 0; i < content.hits.length; i++) {
                totalResults++;
                let row = content.hits[i];
                // console.log(content.hits[i]);
                let itemImage = (row.image && row.image !== '') ? `<div class="sib-search__item--image" style="background-image: url(${row.image})"></div>` : '';
                let resultClass = i < perPage ? '' : 'inactive';
                let descriptonLength = ''

                if(Helpers.getWindowSize().width < 768 ){
                    descriptonLength = `<p>${row._highlightResult.content ?  ( row._highlightResult.content.value.length > 65 ?   row._highlightResult.content.value.substring(0,65) + '...' : row._highlightResult.content.value) : ''}</p>`;
                }else{
                    descriptonLength =  `<p>${row._highlightResult.content ?  ( row._highlightResult.content.value.length > 168 ?   row._highlightResult.content.value.substring(0,168) + '...' : row._highlightResult.content.value) : ''}</p>`
                }

                result = `${result}<div  class="sib-search__item ${resultClass}">
                            ${itemImage}
                            <div class="sib-search__item--content">
                            <h4>${row.title}</h4>
                           
                            ${descriptonLength}
                          
                            <a href="${row.url}" >Read More</a>
                            </div>
                        </div>
                        </div>`;
            }
            searchResults.innerHTML = result;
            // build status & load-more button
            AlgoliaSearch.buildResultStats(perPage, content.hits.length);
        });
        if (totalResults <= 0) {
            // when search result is empty
            searchResultsTitle.innerHTML = `There are no results for '${keyword}'.`;
        }
    },

    buildResultStats: (perPage, totalRows) => {
       // const searchStats = document.getElementsByClassName('sib-search__stats')[0];
        const searchStats = document;
        let displayed = perPage > totalRows ? totalRows : perPage;
        let statMessage = displayed === 0 ? 'No results found' : `Showing ${displayed} of ${totalRows} result${displayed > 1 ? 's' : ''}`;
        //document.getElementsByClassName('sib-search__stats-total')[0].innerHTML = statMessage;
        if (perPage < totalRows) {
            searchStats.getElementsByClassName('sib-search__read-more')[0].classList.remove('hide-content');
        } else {
            searchStats.getElementsByClassName('sib-search__read-more')[0].classList.add('hide-content');
        }
    }
};

module.exports = AlgoliaSearch;