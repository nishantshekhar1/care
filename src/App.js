import './App.css';
import CardList from "./components/CardList/CardList";
import Graph from "./components/Graph/Graph";
import { getData } from "./actions/DataAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const App = () => {
  
  const dispatch = useDispatch();

  let selectedState = "overall";

  const stateData = useSelector((state) => {
    const { data } = state;
    // console.log("state", data[selectedState]);
    return data[selectedState];
  });

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  console.log(stateData);
  return (
    <div className="App">
      <CardList total={stateData["total"]} />
      <Graph weekData={stateData} />
    </div>

  );
}

export default App;
