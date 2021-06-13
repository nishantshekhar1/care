import './App.css';
import CardList from "./components/CardList/CardList";
import Graph from "./components/Graph/Graph";
import Dropdown from "react-dropdown";
import Select from "react-select";
import { getData } from "./actions/DataAction";
import { locations } from "./actions/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

const App = () => {

  const [location, setLocation] = useState({value:"overall", label:"Overall"});
  const dispatch = useDispatch();

  // let selectedState = "overall";

  const stateData = useSelector((state) => {
    const { data } = state;
    // console.log(data);
    console.log("location", location.value)
    if (data && data.hasOwnProperty(location.value))
      return data[location.value];
    else
      return false;
  });

  useEffect(() => {
    console.log("useEffect", location);
    dispatch(getData());
  }, [dispatch]);

  // console.log(stateData);
  if (!stateData)
    return <div></div>

  return (
    <div className="App">
      <Select
        className="location"
        value={location}
        onChange={setLocation}
        options={locations} 
        />
      <CardList total={stateData["total"]} />
      <Graph weekData={stateData} />
    </div>
  );

}

export default App;
