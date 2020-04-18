import React, {useMemo, useState} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";

import CountrySelector from "./containers/CountrySelector";
import ViewCountryDetails from "./containers/ViewCountryDetails";

import {CountryContext} from './contexts/CountryContext';

const App = () => {
  const [country, setCountry] = useState();
  const valueProvider = useMemo(() => ({country, setCountry}), [country, setCountry]);

  return (
      <Switch>
        <CountryContext.Provider value={valueProvider}>
          <Route exact={true} path={'/'} component={CountrySelector}/>
          <Route exact={true} path={'/view/:country'} component={ViewCountryDetails}/>
        </CountryContext.Provider>
      </Switch>
  );
};

export default withRouter(App);
