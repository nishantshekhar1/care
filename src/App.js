import './App.css';
import CardList from "./components/CardList/CardList";
import Graph from "./components/Graph/Graph";
import { getData } from "./actions/DataAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import e from 'cors';

const App = () => {

  const dispatch = useDispatch();

  let selectedState = "overall";

  const stateData = useSelector((state) => {
    const { data } = state;
    console.log(data);
    if (data && data.hasOwnProperty(selectedState))
      return data[selectedState];
    else
      return false;
  });

  useEffect(() => {
    console.log("useEffect");
    dispatch(getData());
  }, [dispatch]);

  console.log(stateData);
  if (!stateData) {
    return <div></div>
  } else {
    return (
      <div className="App">
        <CardList total={stateData["total"]} />
        <Graph weekData={stateData} />
      </div>
    );
  }

}

export default App;
