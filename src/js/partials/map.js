import InfoBubble from "js-info-bubble";


const Map = {
    maps: [],
    markers: [],
    mapWrappers: null,
    mapWrapperClass: 'map-wrapper',
    mapContainersClass: 'map-container',
    mapDataClass: 'map-data',
    mapIcon: '/images/icons/pointer.png',
    mapStyles: [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#523735"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9b2a6"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dcd2be"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ae9e90"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#93817c"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a5b076"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#447530"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fdfcf8"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f8c967"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e9bc62"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e98d58"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#db8555"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#806b63"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8f7d77"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b9d3c2"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#92998d"
                }
            ]
        }
    ],

    setVars: () => {
        Map.mapWrappers = document.getElementsByClassName(Map.mapWrapperClass);
    },
    initMap: () => {

        Map.setVars();

        if (Map.mapWrappers.length > 0) {

            for (let i = 0; i < Map.mapWrappers.length; i++) {
                let mapContainer = Map.mapWrappers[i].getElementsByClassName(Map.mapContainersClass)[0];
                // Take first marker as center of new map
                let coordinatesData = Map.mapWrappers[i].getElementsByClassName(Map.mapDataClass);

                Map.maps[i] = new google.maps.Map(mapContainer, {
                    center: {
                        lat: parseFloat(coordinatesData[0].dataset.lat),
                        lng: parseFloat(coordinatesData[0].dataset.lng)
                    },
                    zoom: 10,
                    styles: Map.mapStyles
                });

                Map.addMarkers(Map.mapWrappers[i], Map.maps[i]);
            }
        }
    },
    addMarkers: (mapWrapper, currentMap) => {
        let coordinatesData = mapWrapper.getElementsByClassName(Map.mapDataClass);

        // Set bounds
        const markers = []
        let bounds = new google.maps.LatLngBounds();
        for (let k = 0; k < coordinatesData.length; k++) {

            let longLat = {
                lat: parseFloat(coordinatesData[k].dataset.lat),
                lng: parseFloat(coordinatesData[k].dataset.lng)
            };

            // Add marker
            markers[k] = new google.maps.Marker({
                position: longLat,
                map: currentMap,
                icon: Map.mapIcon,
            });


            Map.setInfoBubble(currentMap, coordinatesData[k].dataset.address, markers[k]);
            // Extend bounds to new marker
            bounds.extend(longLat, currentMap);
        }

        // Change zoom and bounds to show all markers

        Map.fitMap(bounds, currentMap);
    },
    setInfoBubble: (currentMap, address, currentMarker) => {



        currentMarker.addListener('click', function () {

            let infoBubble =  new InfoBubble({
                map: currentMap,
                content: "<div class='map-bubble-address'>"+address+"</div>",
                backgroundColor: '#c56011',
                borderWidth: 0,
                hideCloseButton: true,
                shadowStyle: 0,
                borderRadius: 0,
                minWidth: 120,
                maxWidth: 120,
                minHeight: 72,
                padding:10,
                arrowSize: 0,
            });


            let bubbles =  document.getElementsByClassName('map-bubble-address');
            console.log(bubbles);
            for (let i = 0; i < bubbles.length; i++) {
                console.log(bubbles);
                bubbles[i].parentNode.parentNode.parentNode.parentNode.removeChild(bubbles[i].parentNode.parentNode.parentNode);
            }
            infoBubble.open(currentMap, currentMarker);
        });



    },
    fitMap: (bounds, currentMap) => {

        // Auto zoom to keep all markers
        currentMap.fitBounds(bounds);
        // Auto center to keep all markers
        currentMap.panToBounds(bounds);

        // Zoom is too big. Make it smaller a bit
        var listener = google.maps.event.addListener(currentMap, "idle", function () {
            //if (Map.map.getZoom() > 6) Map.map.setZoom(7);
            currentMap.setZoom(currentMap.getZoom() - 2);
            google.maps.event.removeListener(listener);
        });

    }
};

module.exports = Map;
