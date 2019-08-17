import React from "react";
import FindTrain from "./components/FindTrain/FindTrain";
import DataHandler from "./components/DataHandler/DataHandler";
import "./App.css";
import Route from "./components/route/Route";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataHandler>
          {({ stops, loading, fetchRoute, error }) => (
            <>
              <FindTrain onSubmit={fetchRoute} loading={loading} />
              {error ? <p>{error}</p> : null}
              {stops.length ? (
                <>
                  <span>
                    {stops[0].name} to {stops[stops.length - 1].name}
                  </span>
                  <Route stops={stops} />{" "}
                </>
              ) : null}
            </>
          )}
        </DataHandler>
      </header>
    </div>
  );
}

export default App;
