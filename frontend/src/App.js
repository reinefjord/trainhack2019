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
              <h1>
                <span role="img" aria-label="train">
                  🚂
                </span>
                <span role="img" aria-label="fire">
                  🔥
                </span>
                <span role="img" aria-label="thunder rain cloud">
                  ⛈
                </span>
              </h1>
              <FindTrain onSubmit={fetchRoute} loading={loading} />
              {error ? <p>{error}</p> : null}
              {stops.length ? (
                <>
                  <h2>
                    <b>{stops[0].name}</b> to{" "}
                    <b>{stops[stops.length - 1].name}</b>
                  </h2>
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
