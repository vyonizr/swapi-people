import React, { useContext } from "react";
import { Graph } from "@qlue-ui/react-component/dist/Graph";
import { Store } from '../Store'

const SwapiGraph = () => {
  const { state } = useContext(Store)

  const data = state.people.results

  const lineChart = {
    LINE: [
      { dataKey: "height" },
      { dataKey: "mass" }
    ]
  };

  return (
    <>
      <Graph
        className="default-font"
        width={"100%"}
        height={300}
        data={data}
        chart={lineChart}
      />
    </>
  );
};

export default SwapiGraph