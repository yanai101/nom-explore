import React from "react";
import { ExploreInput } from "./component/exploreInputs";
import "./App.scss";
import DependencyList from "./component/dependencyList";

function App() {
  const [dependenciesList, setDependenciesList] = React.useState();
  const lastUpdate = React.useRef(null);

  const buildDependenciesList = (data: any) => {
    let newList: any = lastUpdate.current;
    if (newList && data !== null) {
      Object.keys(newList?.dependencies).forEach((key) => {
        if (key === data.name) {
          newList.dependencies[key] = data;
        }
      });
    } else {
      newList = data;
      lastUpdate.current = data;
    }
    const newState = data ? { dependenciesList, ...newList } : data;

    setDependenciesList(newState);
  };

  return (
    <div className="App">
      <div>
        <header className="App-header">Npm explore</header>
        <ExploreInput setList={buildDependenciesList} />
      </div>
      <div className="dependencies">
        <DependencyList list={dependenciesList} setList={buildDependenciesList} />
      </div>
    </div>
  );
}

export default App;
