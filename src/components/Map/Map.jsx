import ReactMapGL, { Marker } from 'react-map-gl';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
// import sampleData from './sampleData';
// import addresses from './rippedWithCoords';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './Map.css';

function Map() {
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState({
    latitude: 33.6,
    longitude: -81,
    width: "100vw",
    height: "80vh",
    zoom: 7.0
  });
  const sites = useSelector(store => store.viewReducer.sitesReducer);

  const [darkMode, setDarkMode] = useState(true);
  const toggleDark = () => { setDarkMode(!darkMode) };

  useEffect(()=>{
    dispatch({type:'FETCH_ALL'});
  },[])

  const assignClasses = (site) => {
    switch(site.category){
      case 'Native American':
        return "dot lang-native-american";
        break;
      case 'Vernacular English':
        return "dot lang-vernacular-english";
        break;
      default:
        console.log('language category not found');
        return "dot lang-none";
    }
    return;
  }

  return (
    <div className="App">

      <header className="App-header">
        <button onClick={toggleDark}>{darkMode ? 'Light' : 'Dark'}</button>
        <ReactMapGL
          {...viewport}
          mapStyle={`mapbox://styles/mapbox/${darkMode ? 'light' : 'dark'}-v10`}
          // mapStyle={'mapbox://styles/blingusblongus/ckx3xmvv8172m14mzjaoz7yqp'}
          onViewportChange={setViewport}
          mapboxApiAccessToken={"pk.eyJ1IjoiYmxpbmd1c2Jsb25ndXMiLCJhIjoiY2t4MGt6Y3F5MGFrcDJzczZ0YjZnNXJlbCJ9.6EvtO1ovuEE8tBAePGwAag"}
        >
          {sites && sites.map(site => {
            return (
              <Marker
                key={site.id}
                latitude={Number(site.latitude)}
                longitude={Number(site.longitude)}
              >
                <div className="dot"
                ></div>
              </Marker>
            )
          })}
        </ReactMapGL>
      </header>
    </div>
  );
}

export default Map;