import React, { useContext } from "react";
import {
  Grid,
  Table,
  Button,
  Icon
} from 'semantic-ui-react'
import { Store } from '../Store'

const SwapiTable = ({ nextPage, previousPage }) => {
  const { state } = useContext(Store)
  return (
    <>
      <Table celled striped compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Height</Table.HeaderCell>
            <Table.HeaderCell>Mass</Table.HeaderCell>
            <Table.HeaderCell>Hair Color</Table.HeaderCell>
            <Table.HeaderCell>Skin Color</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            state.people.results.map((person, i) => (
            <Table.Row key={person.name}>
              <Table.Cell>{ (state.page - 1) * 10 + (i + 1) }</Table.Cell>
              <Table.Cell>{ person.name }</Table.Cell>
              <Table.Cell>{ person.height }</Table.Cell>
              <Table.Cell>{ person.mass }</Table.Cell>
              <Table.Cell>{ person.hair_color }</Table.Cell>
              <Table.Cell>{ person.skin_color }</Table.Cell>
            </Table.Row>
            ))
          }
        </Table.Body>
      </Table>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            {
              state.page > 1 &&
              <Button icon labelPosition='left' primary onClick={ previousPage }>
                Previous
                <Icon name='left arrow' />
              </Button>
            }
          </Grid.Column>
            <Grid.Column>
              <p>Page { state.page } of { -~(state.people.count / 10) }</p>
            </Grid.Column>
          <Grid.Column>
            {
              state.page < -~(state.people.count / 10) &&
              <Button icon labelPosition='right' primary onClick={ nextPage }>
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

export default SwapiTable