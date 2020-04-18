import React, {useContext, useEffect, useState} from "react";
import {first, isArray} from 'lodash';
import CountryTextField from "../components/CountryTextField";
import history from '../helpers/history';
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useFetch from "../hooks/useFetch";
import config from "../config";
import Button from "@material-ui/core/Button";
import {CountryContext} from "../contexts/CountryContext";
import Snackbar from "@material-ui/core/Snackbar";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


const CountrySelector = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [countryName, setCountryName] = useState('');
  const [error, setError] = useState(false);

  const {country, setCountry} = useContext(CountryContext);

  const {response, isLoading} = useFetch(`${config.country.api}/${countryName}`);

  function onCountrySelect(e) {
    setValue(e);
  }

  useEffect(() => {
    if (response && isArray(response)) {
      const data = first(response);
      setCountry(data);
      setTimeout(() => history.push(`/view/${encodeURI(data.name)}`), 1000);
    }
  }, [response]);

  function getCountryDetails() {
    setCountryName(value);
  }

  return (
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Typography variant="h2" gutterBottom>
            Capital Weather Finder
          </Typography>
          {
            isLoading && <Typography variant="h4" gutterBottom>
              Loading...
            </Typography>
          }
          <CountryTextField onSelect={onCountrySelect}/>
          <Button variant="contained" color="primary" onClick={getCountryDetails}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
          <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={error}
              autoHideDuration={6000}
              message={'Something went wrong or please check your selection'}
          />
        </div>
      </Container>
  )
};

export default CountrySelector;
