import ReactMapGL, { Marker, FlyToInterpolator, LinearInterpolator, WebMercatorViewport } from 'react-map-gl';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector, useDispatch } from 'react-redux';
import { easeCubic } from 'd3-ease';
import './Map.css';

function Map() {
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState({
    latitude: 33.6,
    longitude: -81,
    width: "fit",
    height: "100vh",
    zoom: 7.0
  });
  const sites = useSelector(store => store.viewReducer.sitesReducer);
  const categories = useSelector(store => store.adminReducer.adminCategoriesReducer);

  const [darkMode, setDarkMode] = useState(true);
  const toggleDark = () => { setDarkMode(!darkMode) };

  const goToNYC = () => {
    setViewport({
      ...viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new LinearInterpolator(),
      transitionEasing: easeCubic
    });
  };

  const resetView = () => {
    const bounds = getSiteBounds(sites);
    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
      .fitBounds([bounds[0], bounds[1]], {
        padding: 20,
        offset: [0, 100]
      });
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 5000,
      transitionInterpolator: new LinearInterpolator(),
      transitionEasing: easeCubic
    });
  };

  const getSiteBounds = (sitesArr) => {
    //set minimum length of boundary box;
    const minBounds = .2;

    //get arrays of all the lats and longs of selected sites
    let longs = sites.map(site => site.longitude);
    let lats = sites.map(site => site.latitude);

    //get the bounds of both lat and long
    let [latMin, longMin] = [Math.min(...lats), Math.min(...longs)];
    let [latMax, longMax] = [Math.max(...lats), Math.max(...longs)];
    
    //if the bounds are a single point, expand them
    if(latMax - latMin < minBounds * 2 ||
      longMax - longMin < minBounds * 2){
      latMin -= minBounds;
      longMin -= minBounds;
      latMax += minBounds;
      latMax += minBounds;
    }
    return [[longMin, latMin], [longMax, latMax]];
  }

  // On Load, fetch necessary sites and categories
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, []);

  // when the sites state changes, resize map view
  useEffect(() => {
    if (sites.length > 0) {
      resetView();
    }
  }, [sites]);

  //Assign css classes to color the map icons
  const assignClasses = (site) => {
    for (let category of categories) {
      if (Number(site.category_id) == category.id) {
        let colorClass = 'lang-' + category.name.toLowerCase().replace(/\s/g, '-');
        return colorClass;
      }
    }
  }

  return (
    <div className="App">

      <header className="App-header">
        {/* <button onClick={toggleDark}>{darkMode ? 'Light' : 'Dark'}</button> */}
        <ReactMapGL
          {...viewport}
          mapStyle={`mapbox://styles/mapbox/${darkMode ? 'light' : 'dark'}-v10`}
          // mapStyle={'mapbox://styles/blingusblongus/ckx3xmvv8172m14mzjaoz7yqp'}
          onViewportChange={setViewport}
          mapboxApiAccessToken={"pk.eyJ1IjoiYmxpbmd1c2Jsb25ndXMiLCJhIjoiY2t4MGt6Y3F5MGFrcDJzczZ0YjZnNXJlbCJ9.6EvtO1ovuEE8tBAePGwAag"}
        >

          <button onClick={resetView}>Click me</button>
          {sites && sites.map(site => {
            return (
              <Marker
                key={site.id}
                latitude={Number(site.latitude)}
                longitude={Number(site.longitude)}
              >
                <div className={"dot" + ' ' + assignClasses(site)}
                >
                  <div className="dot-info">{site.language}</div>
                </div>
              </Marker>
            )
          })}
        </ReactMapGL>
      </header>
    </div>
  );
}

export default Map;