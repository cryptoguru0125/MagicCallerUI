import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import reduce from "lodash/reduce";

import { getProfile as getProfileReducer } from "store/profile/reducer";
import { getSpinner } from "store/app/reducer";
import { UserRole } from "helpers/enum";
import ScrollToTop from "components/ScrollToTop";
import Spinner from "components/Spinner";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";
import guestRoutes from "./routes/guest";

interface Props {
  isLoading: boolean;
  user: User;
  dispatch(action: any): Promise<any>;
}

class App extends React.PureComponent<Props> {
  render() {
    const { user, isLoading } = this.props;

    let routes;
    if (!user) {
      routes = guestRoutes;
    } else if (user.role === UserRole.ADMIN) {
      routes = adminRoutes;
    } else {
      routes = authRoutes;
    }

    // extract children
    const spreadRoutes = reduce(
      routes,
      (result, value) => {
        if (value.children) {
          return [...result, ...value.children];
        } else {
          return [...result, value];
        }
      },
      []
    );

    return isLoading ? (
      <Spinner />
    ) : (
      <ScrollToTop>
        <Switch>
          {spreadRoutes.map((route, index) => {
            // if the route requires the auth, skip it
            if (
              route.auth &&
              (!user ||
                (route.auth.length && route.auth.indexOf(user.role) < 0))
            ) {
              return null;
            }

            return (
              <Route
                key={index}
                path={route.path}
                component={() => (
                  <route.component {...this.props} routes={routes} />
                )}
                exact={route.exact}
              />
            );
          })}

          {user ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Switch>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getSpinner(state, "PROFILE_INFO"),
  user: getProfileReducer(state)
});

export default withRouter(connect(mapStateToProps)(App));
