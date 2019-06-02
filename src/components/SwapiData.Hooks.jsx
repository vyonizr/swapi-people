import { useState, useEffect } from 'react'
import axios from 'axios'

const SwapiData = props => {
  const baseURL = 'https://swapi.co/api/people'
  const [state, setState] = useState({
    loading: true,
    people: {},
    page: 0
  })

  const getCache = page => {
    return JSON.parse(localStorage.getItem(`data-${baseURL}?page=${page}`))
  }

  const setCache = (page, data) => {
    localStorage.setItem(`data-${baseURL}?page=${page}`, JSON.stringify(data))
  }

  useEffect(() => {
    localStorage.getItem(`data-${baseURL}?page=1`) ? (
      setState({
        loading: false,
        people: JSON.parse(localStorage.getItem(`data-${baseURL}?page=1`)),
        page: 1
      })
    ) :

    axios.get(`${baseURL}?page=1`)
    .then(({ data }) => {
      console.log('mounting')
      localStorage.setItem(`data-${baseURL}?page=1`, JSON.stringify(data))
      setState({
        loading: false,
        people: data,
        page: 1
      })
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  const nextPage = () => {
    setState({
      loading: true
    })

    const nextPage = state.page + 1
    getCache(nextPage) ? (
      setState({
        loading: false,
        people: getCache(nextPage),
        page: nextPage
      })
    ) :
    axios.get(state.people.next)
    .then(({ data }) => {
      setCache(nextPage, data)
      setState({
        loading: false,
        people: data,
        page: nextPage
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const previousPage = () => {
    setState({
      loading: true
    })
    const previousPage = state.page - 1
    localStorage.getItem(`data-${baseURL}?page=${previousPage}`) ? (
      setState({
        loading: false,
        people: JSON.parse(localStorage.getItem(`data-${baseURL}?page=${previousPage}`)),
        page: previousPage
      })
    ) :
    axios.get(state.people.previous)
    .then(({ data }) => {
      localStorage.setItem((`data-${baseURL}?page=${previousPage}`), JSON.stringify(data))
      setState({
        loading: false,
        people: data,
        page: state.page - 1
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  return props.render({
    ...state,
    nextPage,
    previousPage
  })
}

export default SwapiData