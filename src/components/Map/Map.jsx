import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Map.css';

import { Fab, Tooltip, Zoom } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

// Mapbox resources
import ReactMapGL, {
  Marker,
  LinearInterpolator,
  WebMercatorViewport
} from 'react-map-gl';
import { easeCubic, easeSinOut } from 'd3-ease';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map({flyDuration, zoomDuration}) {
  const dispatch = useDispatch();
  const MAPBOX_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 
    'pk.eyJ1Ijoic2MtbGFuZ3VhZ2UtbWFwIiwiYSI6ImNreWFpa3Y2dDA1eWszMW1yM2ZpaDJ4dWEifQ.tSM8PZfF3O-6YqvWTuNGhQ';

  // set map height
  const windowSmall = window.innerWidth < 600;
  const mapWidth = windowSmall ? 
    window.innerWidth : window.innerWidth * 2 / 3;
  const mapHeight = windowSmall ? window.innerHeight / 2 : window.innerHeight;
  
  //set initial viewport
  const [viewport, setViewport] = useState({
    latitude: 33.6,
    longitude: -81,
    width: mapWidth,
    height: mapHeight,
    zoom: 6.0,
    transitionDuration: flyDuration,
    transitionInterpolator: new LinearInterpolator(),
    transitionEasing: easeCubic
  });

  //get lists of (un)filtered sites and all categories in db
  const sites = useSelector(store => store.viewReducer.sitesReducer);
  const categories = useSelector(store => store.adminReducer.adminCategoriesReducer);

  //state to track mapStyle
  // const [mapStyle, setMapStyle] = useState(true);
  const mapStyles = [
    `mapbox://styles/blingusblongus/cky527chq3w1g14qj7ucfaq82`,
    `mapbox://styles/mapbox/light-v10`,
    `mapbox://styles/mapbox/dark-v10`,
  ]

  const resetView = () => {
    const bounds = getSiteBounds(sites);

    // WebmercatoreViewport requires number width 
    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
      .fitBounds([bounds[0], bounds[1]], {
        padding: 50,
        // offset: [0, 100]
      });
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: flyDuration,
      transitionInterpolator: new LinearInterpolator(),
      transitionEasing: easeCubic
    });
  };

  const adjustZoom = (direction) => {
    const adjustment = direction === 'in' ? 1 : -1;
    let newZoom = viewport.zoom + adjustment;
    if (newZoom > 24) {
      newZoom = 24;
    } else if (newZoom < 0) {
      newZoom = 0;
    }
    setViewport({
      ...viewport,
      transitionEasing: easeSinOut,
      zoom: newZoom,
      transitionDuration: zoomDuration,
    });
  }

  const getSiteBounds = (sitesArr) => {
    //set minimum length of boundary box;
    const minBounds = .2;

    //get arrays of all the lats and longs of selected sites
    let longs = sites.map(site => site.longitude);
    let lats = sites.map(site => site.latitude);

    //get the bounds of both lat and long
    let [latMin, longMin] = [Math.min(...lats), Math.min(...longs)];
    let [latMax, longMax] = [Math.max(...lats), Math.max(...longs)];

    //if the bounds are a single point (or close together), expand them
    if (latMax - latMin < minBounds * 2 ||
      longMax - longMin < minBounds * 2) {
      latMin = latMin - minBounds;
      longMin = longMin - minBounds;
      latMax += minBounds;
      longMax += minBounds;
    }

    return [[longMin, latMin], [longMax, latMax]];
  }

  //Assign css classes to color the map icons
  const assignClasses = (site) => {
    for (let category of categories) {
      if (Number(site.category_id) == category.id) {
        let colorClass = 'lang-' + category.name.toLowerCase().replace(/\s/g, '-');
        return colorClass;
      }
    }
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

  // attach event listener to handle window resize, then clean it up
  useEffect(() => {
    const handleResize = () => {
      setViewport({ ...viewport, height: '100vh', width: '100%' });
    }
    window.addEventListener('resize', handleResize);
    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        {/* Configure and mount map canvas */}
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyles[0]}
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_KEY}
        >

          {/* Render each site as a mapbox marker consisting of a rounded div */}
          {sites && sites.map(site => {
            return (
              <Marker
                key={site.id}
                latitude={Number(site.latitude)}
                longitude={Number(site.longitude)}>
                <Tooltip
                  title={site.language}
                  TransitionComponent={Zoom}
                  placement="top"
                  arrow>
                  <div
                    className={"dot" + ' ' + assignClasses(site)}
                  // onClick={selectSite}
                  ></div>
                </Tooltip>
              </Marker>
            )
          })}
        </ReactMapGL>

        {/* Render Map Zoom Buttons */}
        <div className='bottom-right'>
          <Fab color="primary" aria-label="zoom in"
            onClick={() => adjustZoom('in')}>
            <ZoomInIcon />
          </Fab>
          <br />
          <Fab color="primary" aria-label="zoom out"
            onClick={() => adjustZoom('out')}>
            <ZoomOutIcon />
          </Fab>
        </div>
      </header>
    </div>
  );
}

export default Map;