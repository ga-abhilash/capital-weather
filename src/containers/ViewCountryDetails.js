import React, {useContext, useState} from "react";
import {Container} from "@material-ui/core";
import {CountryContext} from "../contexts/CountryContext";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import config from "../config";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// - capital
// - population
// - latlng
// - flag (render the image from the URL provided in the response)

// - temperature
// - weather_icons (render the image from the URL provided in the response)
// - wind_speed
// - precip

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
  },
}));

const ViewCountryDetails = () => {
  const {country, setCountry} = useContext(CountryContext);
  const [capital, setCapital] = useState(null);
  const classes = useStyles();

  const getCapitalWeather = () => {
    fetch(`${config.WEATHER_STOCK.api}&query=${country.capital}`)
        .then(res => res.json())
        .then(res => {
          setCapital(prevState => {
            return {...prevState, ...res};
          });
        })
        .catch(err => console.error(err))

  };

  return (
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom>
          <img width={'100px'} src={country?.flag} alt={country?.name}/>
          {country?.name}
        </Typography>
        <Typography variant="h3" gutterBottom>
          Capital: {country?.capital}
        </Typography>
        <Typography variant="h3" gutterBottom>
          Population: {country?.population}
        </Typography>
        <Typography variant="h3" gutterBottom>
          latlng: {country?.latlng.map(x => <span>{x}, </span>)}
        </Typography>
        <hr />
        <Typography variant="h4" gutterBottom>
          Weather in: {country?.capital} <img width={'75px'} src={capital && capital.weather_icons && capital?.weather_icons[0]}/>
        </Typography>
        <Button variant="contained" color="secondary" onClick={getCapitalWeather}>
          Capital Weather
        </Button>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Temperature {capital?.current?.temperature}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Wind Speed {capital?.current?.wind_speed} m/h in {capital?.current?.wind_dir} direction
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Precip {capital?.current?.precip}
              </Typography>
            </Grid>
          </Grid>
        </div>

      </Container>
  )
};

export default ViewCountryDetails;
