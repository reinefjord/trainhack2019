import React from "react";
import FindTrain from "./components/FindTrain/FindTrain";
import DataHandler from './components/DataHandler/DataHandler';
import "./App.css";
import Route from "./components/route/Route";

function App(){
    return (
      <div className="App">
        <header className="App-header">

          <DataHandler>
            {({train, stops}) => (
            <>
              <FindTrain />
              <span>{train.origin} to {train.destination}</span>

              <Route stops={stops}/>
              </>
            )}
          </DataHandler>
        </header>
      </div>
    );
  
}

export default App;
