import $ from 'jquery';
import NewsSlider from './news-slider';

const FilterItems = {
    itemsContainer: null,
    items: null,
    itemsFeatured: null,
    loadMoreSection: null,
    loadMoreButton: null,
    itemsFeaturedCloned: [],
    vars:{
        openClass: 'open-js',
        activeCategories: [], // Indexes of active categories
        activeFeaturedItems: [], // Indexes of shown featured items
        moreItems: 2, // Every time user click Load more button, we show next <moreItems> items
        startItem: 0,
        endItem: 0,
        classShow: 'show', // This class for showing items on Load more event
        classActive: 'active', // This class show items on filter event
        classHide: 'hide', // This class hide items on filter event
        classFeaturedActive: 'featured-active', // This class show items on filter event
        classFeaturedHide: 'featured-hide' // This class hide items on filter event
    },
    init: () => {

        FilterItems.setVars();

        // If there is container with items we need to filter or show more items
        if( FilterItems.itemsContainer ) {
            // Find filter's buttons
            let itemsNews = document.querySelectorAll('[data-news-button]');
            // If we have filter
            if( itemsNews.length > 0 ) {
                // Init filter
                FilterItems.initFilterItems(itemsNews);
            }

            if( FilterItems.loadMoreButton ) {
                // Show first <moreItems> items
                FilterItems.showItems();

                // Init event on Load more button
                FilterItems.loadMore();
            }
        }
    },
    setVars: () => {
        // Find container of all items
        FilterItems.itemsContainer = document.querySelectorAll('[data-list-items-container]')[0];

        if( FilterItems.itemsContainer ) {
            // Find how many items show on load
            FilterItems.vars.moreItems = parseInt(FilterItems.itemsContainer.dataset.listItemsContainer);
            // Find all items
            FilterItems.items = FilterItems.itemsContainer.getElementsByClassName('sib-list-item');
            // Find all featured items we need to filter
            FilterItems.itemsFeatured = document.getElementsByClassName('sib-news-list__slide');

            // Clone and save featured items as we need to rebuild slider with these elements
            for(let i = 0; i < FilterItems.itemsFeatured.length; i++){
                FilterItems.itemsFeaturedCloned[i] = FilterItems.itemsFeatured[i].cloneNode(true);
            }

            console.log(FilterItems.itemsFeaturedCloned);

            // Find Load more button's container
            FilterItems.loadMoreSection = document.getElementsByClassName('sib-load-more')[0];
            // Find Load more button
            FilterItems.loadMoreButton = document.getElementById('sib-load-more__button');
        }
    },
    showItems: () => {
        // Set which items to show
        FilterItems.setShowItems();

        // Show items
        for(let i = FilterItems.vars.startItem; i < FilterItems.vars.endItem; i++){
            FilterItems.items[i].classList.add( FilterItems.vars.classShow );
        }

        // Check if we need to show Load more button
        FilterItems.checkLoadMore();
    },
    setShowItems: () => {

        // Change <startItem> if it's not first iteration
        if( FilterItems.vars.endItem != 0 ){
            FilterItems.vars.startItem = FilterItems.vars.endItem;
        }

        // Calculate <startItem> and <endItem> for loading next items
        if( FilterItems.vars.endItem + FilterItems.vars.moreItems < FilterItems.items.length ){
            // Show next <moreItems> items
            FilterItems.vars.endItem += FilterItems.vars.moreItems;
        } else {
            // Show last items
            FilterItems.vars.endItem = FilterItems.items.length
        }

    },
    initFilterItems: (items) => {

        for(let i = 0; i < items.length; i++){
            // Click on button in filter
            items[i].addEventListener('click', (e) => {

                e.preventDefault();
                console.log('clicked')
                FilterItems.showItems();
                // Toggle buttons in filter
                if( items[i].classList.contains(FilterItems.vars.classActive) ) {
                    items[i].classList.remove(FilterItems.vars.classActive);
                    FilterItems.vars.activeCategories.splice(
                        FilterItems.vars.activeCategories.indexOf(items[i].dataset.newsButton),
                        1
                    );
                } else {
                    items[i].classList.add(FilterItems.vars.classActive);
                    FilterItems.vars.activeCategories.push(items[i].dataset.newsButton);
                }

                // Clear selection in items list.
                // Check only shown items with class 'show'
                for(let k = 0; k < FilterItems.items.length; k++){
                    if(FilterItems.items[k].classList.contains(FilterItems.vars.classShow)){
                        FilterItems.items[k].classList.remove(FilterItems.vars.classHide, FilterItems.vars.classActive);
                    }
                }

                // Activate items with selected categories.
                // Check only shown items with class 'show'
                for(let j = 0; j < FilterItems.vars.activeCategories.length; j++){
                    for(let k = 0; k < FilterItems.items.length; k++){
                        if(FilterItems.items[k].classList.contains(FilterItems.vars.classShow)) {
                            let itemCategories = FilterItems.items[k].dataset.categories;

                            if (itemCategories.search('_' + FilterItems.vars.activeCategories[j] + '_') == -1 && !FilterItems.items[k].classList.contains(FilterItems.vars.classActive)) {
                                FilterItems.items[k].classList.add(FilterItems.vars.classHide);
                            } else {
                                FilterItems.items[k].classList.remove(FilterItems.vars.classHide);
                                FilterItems.items[k].classList.add(FilterItems.vars.classActive);
                            }
                        }
                    }
                }

                FilterItems.initFeaturedItemsFilter();

            });
        }
    },
    initFeaturedItemsFilter: () => {

        // Destroy Slider and clear Slider's container
        NewsSlider.clearSlick();

        // Get active slides
        if(FilterItems.vars.activeCategories.length > 0) {
            for (let j = 0; j < FilterItems.vars.activeCategories.length; j++) {
                for (let k = 0; k < FilterItems.itemsFeaturedCloned.length; k++) {
                    // Check if slide has current category and it's still not added to slider
                    if (FilterItems.itemsFeaturedCloned[k].dataset.categories.search('_' + FilterItems.vars.activeCategories[j] + '_') != -1 && FilterItems.vars.activeFeaturedItems.indexOf(k) == -1) {

                        NewsSlider.appendSlide(FilterItems.itemsFeaturedCloned[k]);

                        // Add index of added slide to array
                        FilterItems.vars.activeFeaturedItems.push(k);

                        console.log(FilterItems.itemsFeaturedCloned[k]);
                    }
                }
            }
        } else {
            // Add all slides if there is no selected categories
            for (let k = 0; k < FilterItems.itemsFeaturedCloned.length; k++) {
                NewsSlider.appendSlide(FilterItems.itemsFeaturedCloned[k]);
            }
        }

        // Clear array of active slides
        FilterItems.vars.activeFeaturedItems = [];

        // Recreate Slider
        NewsSlider.initSlick();
    },
    loadMore: () => {
        FilterItems.loadMoreButton.addEventListener('click', FilterItems.showItems);
    },
    checkLoadMore: () => {
        if( FilterItems.vars.endItem == FilterItems.items.length ) {
            // Hide section
            FilterItems.loadMoreSection.classList.add('hide-js');

            // Unbind click
            FilterItems.loadMoreButton.removeEventListener('click', FilterItems.showItems);
        }
    }
};

module.exports = FilterItems;
