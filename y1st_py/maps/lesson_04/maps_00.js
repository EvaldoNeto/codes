function initMap()
{
    var markers = [];
    var map;
    
    map = new google.maps.Map(document.getElementById('map'), {
	center: {lat:40.7413549, lng: -73.9980244},
	zoom: 13
    }); 

    var locations = [
	{title: "Park Ave Penthouse", location: {lat: 40.7713, lng: -73.9632}},
	{title: "Chelsea Loft", location: {lat: 40.7444, lng: -73.9499}},
	{title: "Union Square Open Floor Plan", location: {lat: 40.7347, lng: -73.9895}},
	{title: "East Village Hip Studio", location: {lat: 40.7281, lng: -73.9843}},
	{title: "TriBeCa Artsy Bachelor Pad", location: {lat: 40.7195, lng: -74.009}},
	{title: "Chinatown Homey Space", location: {lat: 40.7180, lng: -73.9961}}
    ];

    var largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i < locations.length; i++)
    {
	var position = locations[i].location;
	var title = locations[i].title;
	var marker = new google.maps.Marker({
	    position: position,
	    title: title,
	    animation: google.maps.Animation.DROP,
	    id: i
	});
	
	markers.push(marker);
	
	marker.addListener('click', function(){
	    populateInfoWindow(this, largeInfoWindow);
	});
    }
    map.fitBounds(bounds);

    document.getElementById('#show-listings').addEventListener('click', showListings(markers, map));
    document.getElementById('#hide-listings').addEventListener('click', hideListings(markers));
}

function populateInfoWindow(marker, infowindow)
{
    if(infowindow.marker != marker)
    {
	infowindow.marker = marker;
	infowindow.setContent('<div>' + marker.title + '</div>');
	infowindow.open(map, marker);
	infowindow.addListener('closeclick', function(){
	    infowindow.setMarker(null);
	});
    }
}

function showListings(markers, map)
{
    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i < markers.length; i++)
    {
	markers[i].setMap(map);
	bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

function hideListings(markers)
{
    for(var i = 0; i < markers.length; i++)
	markers[i].setMap(null);
}
