import React, { useEffect, useContext } from 'react';
import axios from 'axios'
import {
  Container,
  Header
} from 'semantic-ui-react'
import './App.css';
import "@qlue-ui/react-component/dist/styles.css";
import Loading from './components/Loading'
import SwapiTable from './components/SwapiTable'
import SwapiGraph from './components/SwapiGraph'

import { Store } from './Store'

function App() {
  const { state, dispatch } = useContext(Store)
  const baseURL = 'https://swapi.co/api/people'

  const getCache = page => {
    return JSON.parse(localStorage.getItem(`data-${baseURL}?page=${page}`))
  }

  const setCache = (page, data) => {
    localStorage.setItem(`data-${baseURL}?page=${page}`, JSON.stringify(data))
  }

  const nextPage = () => {
    dispatch({
      type: 'LOADING'
    })

    const nextPage = state.page + 1
    getCache(nextPage) ?
      dispatch({
        type: 'FETCH_NEXT_PAGE',
        payload: {
          loading: false,
          people: getCache(nextPage),
          page: nextPage
        }
      }) :

    axios.get(state.people.next)
    .then(({ data }) => {
      setCache(nextPage, data)
      dispatch({
        type: 'FETCH_NEXT_PAGE',
        payload: {
          loading: false,
          people: data,
          page: nextPage
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const previousPage = () => {
    dispatch({
      type: 'LOADING'
    })

    const previousPage = state.page - 1
    getCache(previousPage) ?
      dispatch({
        type: 'FETCH_PREVIOUS_PAGE',
        payload: {
          loading: false,
          people: getCache(previousPage),
          page: previousPage
        }
      }) :
    axios.get(state.people.previous)
    .then(({ data }) => {
      setCache(previousPage, data)
      dispatch({
        type: 'FETCH_PREVIOUS_PAGE',
        payload: {
          loading: false,
          people: data,
          page: previousPage
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    const fetchFirstPage = () => {
      getCache(1) ?
        dispatch({
          type: 'FETCH_FIRST_PAGE',
          payload: {
            loading: false,
            people: getCache(1),
            page: 1
          }
        }) :

      axios.get(`${baseURL}?page=1`)
      .then(({ data }) => {
        setCache(1, data)
        dispatch({
          type: 'FETCH_FIRST_PAGE',
          payload: {
            loading: false,
            people: data,
            page: 1
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
    }

    fetchFirstPage();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Header as='h1'>SWAPI - People</Header>
        {
          state.loading ? <Loading /> :
          <>
            <SwapiTable nextPage={ nextPage } previousPage = { previousPage } />
            <SwapiGraph />
          </>
        }
      </Container>
    </div>
  );
}

export default App;
