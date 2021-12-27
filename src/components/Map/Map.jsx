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
    height: "98vh",
    zoom: 7.0
  });
  const sites = useSelector(store => store.viewReducer.sitesReducer);
  const categories = useSelector(store => store.adminReducer.adminCategoriesReducer);

  const [darkMode, setDarkMode] = useState(true);
  const toggleDark = () => { setDarkMode(!darkMode) };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [])

  const assignClasses = (site) => {

    for (let category of categories) {

      if (Number(site.category_id) == category.id) {
        let colorClass = 'lang-' + category.name.toLowerCase().replace(/\s/g, '-');
        return colorClass;
      }
    }
    //// JUST A TEMP SOLUTION TO COLOR DOTS
    //// WILL BE REPLACED WITH A REFERENCE TO CATEGORIES SAGA
    // const catEnum = {
    //   1: 'lang-native-american',
    //   2: 'lang-european',
    //   3: 'lang-asian',
    //   4: 'lang-middle-east',
    //   5: 'lang-latino',
    //   6: 'lang-varieties-of-english',
    //   7: 'lang-sign-language'
    // }
    // return catEnum[Number(site.category_id)];
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