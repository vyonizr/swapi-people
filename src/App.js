import React from 'react';
import './App.css';
import "@qlue-ui/react-component/dist/styles.css";
import {
  Container
} from 'semantic-ui-react'
import SwapiData from './components/SwapiData.Hooks'
import Loading from './components/Loading'
import SwapiTable from './components/SwapiTable'
import SwapiGraph from './components/SwapiGraph'

function App() {
  return (
    <div className="App">
      <Container>
        <SwapiData
          render={({ loading, people, page, nextPage, previousPage }) => loading ? <Loading vizType={'table'}/> : <SwapiTable people={ people } page={ page } nextPage={ nextPage } previousPage={ previousPage } />}
        />

        <SwapiData
          render={({ loading, people, page, nextPage, previousPage }) => loading ? <Loading vizType={'graph'} /> : <SwapiGraph people={ people } page={ page } nextPage={ nextPage } previousPage={ previousPage } />}
        />
      </Container>
    </div>
  );
}

export default App;
