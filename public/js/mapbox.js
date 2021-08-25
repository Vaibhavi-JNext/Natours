export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidmFpYmhhdmktMTIzIiwiYSI6ImNrc2lzOWkwbDA2ZGkyenFvZ2xsZ3pkNjkifQ.bCdjXFPWXRY09QEJ4x4e3g';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vaibhavi-123/cksisphwx7hpw17uqzwz5c1ij',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
