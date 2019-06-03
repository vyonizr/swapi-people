import React from "react";
import { Graph } from "@qlue-ui/react-component/dist/Graph";
import {
  Grid,
  Button,
  Icon
} from 'semantic-ui-react'

const SwapiGraph = props => {
  const { people, page, nextPage, previousPage } = props
  const data = props.people.results.map(person => ({
      name: person.name,
      height: person.height,
      mass: person.mass
  }));

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
        {...props}
      />

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            {
              page > 1 &&
              <Button icon labelPosition='left' primary onClick={ previousPage }>
                Previous
                <Icon name='left arrow' />
              </Button>
            }
          </Grid.Column>
          <Grid.Column>
            <p>Page { page } of { -~(people.count / 10) }</p>
          </Grid.Column>
          <Grid.Column>
            {
              page < -~(people.count / 10) &&
              <Button icon labelPosition='right' primary onClick={nextPage}>
                Next
                <Icon name='right arrow' />
              </Button>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default SwapiGraph