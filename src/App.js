import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core'
import './App.css';
import Infobox from './InfoBox'
import Map from './Map'
import { sortData } from './util'
import Table from './Table'

 // https://disease.sh/v3/covid-19/all
 // https://disease.sh/v3/covid-19/countries
 // https://disease.sh/v3/covid-19/countries/[Country_code]

function App() {  
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[])

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) =>({
          name:country.country,
          value:country.countryInfo.iso2,
        }))
        const sortedData = sortData(data)
        setTableData(sortedata)
        setCountries(countries)
      })
    }
    getCountries()
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
    const url = countryCode === 'worldwide' ? 
      'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(res => res.json())
    .then((data) => {
      setCountry(countryCode)
      setCountryInfo(data)
    })

  }

  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>Covid-19 Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => ( 
                <MenuItem value={country.value}>{country.name}</MenuItem>                              
                ))}                       
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <Infobox title='Covid-19 cases' numCases={countryInfo.todayCases} totalCases={countryInfo.cases} />              
          <Infobox title='Recovered' numCases={countryInfo.todayRecovered} totalCases={countryInfo.recovered} />              
          <Infobox title='Deaths' numCases={countryInfo.todayDeaths} totalCases={countryInfo.deaths} />              
        </div>
        {/* <Map /> */}
      </div>
        
      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>World wide new cases</h3>
        </CardContent>
    
      </Card>
    </div>
  );
}

export default App;
