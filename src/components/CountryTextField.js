import React from 'react';
import TextField from "@material-ui/core/TextField";

const CountryTextField = ({onSelect}) => {
  const [country, setCountry] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
    if (country && country.length > 3) {
      onSelect(country);
    }
  };

  return (
      <TextField
          id="standard-full-width"
          label="Country"
          minLength={'3'}
          error={country.length < 3}
          value={country}
          onChange={handleChange}
          placeholder="Enter Country"
          helperText={country.length < 3 && "Input atleast 3 characters to start finding"}
          fullWidth
          margin="normal"
      />
  )
};

export default CountryTextField;
