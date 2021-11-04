import React from "react";
import { Route } from "wouter";
import StaticRoutes from "./routes";

function StaticNavigator() {
  return (
    <React.Fragment>
      <Route path="/" component={StaticRoutes.Main} />
      <Route path="/currency/:name" component={StaticRoutes.CurrencyPage} />
    </React.Fragment>
  );
}

export default StaticNavigator;
