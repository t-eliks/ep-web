import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { WEB_ROUTES, GetRoute } from "core/web";
import { connect } from "react-redux";
import { AppState } from "index";
import IndexPageContainer from "features/index/indexPageContainer";
import DashboardContainer from "features/dashboard/dashboardContainer";
import mainscreenContainer from "features/mainscreen/mainscreenContainer";
import history from "core/history";
import invitationPageContainer from "features/invitation/invitationPageContainer";
import ProfileContainer from "features/profile/profileContainer";

interface Props {
  isAuthenticated: boolean;
}

const AppRoutes: React.FunctionComponent<Props> = (props: Props) => {
  const { isAuthenticated } = props;
  return (
    <Router history={history}>
      <Switch>
        {isAuthenticated && (
          <>
            <Route
              path={GetRoute(WEB_ROUTES.MAIN_SCREEN_PATTERN)}
              component={mainscreenContainer}
            />
            <Route
              exact
              path={GetRoute(WEB_ROUTES.DASHBOARD)}
              component={DashboardContainer}
            />
            <Route
              exact
              path={GetRoute(WEB_ROUTES.PROFILE)}
              component={ProfileContainer}
            />
            <Route
              path={GetRoute(WEB_ROUTES.INVITATION_PATTERN)}
              component={invitationPageContainer}
            />
            <Route
              render={(routerProps) => {
                var regex = /app\/[1-9]+/;
                if (regex.test(routerProps.location.pathname)) {
                  return null;
                }

                return <Redirect to={WEB_ROUTES.DASHBOARD} />;
              }}
            />
          </>
        )}
        {!isAuthenticated && (
          <>
            <Route
              exact
              path={GetRoute(WEB_ROUTES.INDEX)}
              component={IndexPageContainer}
            />
            <Route
              path={GetRoute(WEB_ROUTES.INVITATION_PATTERN)}
              component={invitationPageContainer}
            />
            <Route
              render={(routerProps) => {
                var regex = /invitation/;
                if (regex.test(routerProps.location.pathname)) {
                  return null;
                }

                return <Redirect to={WEB_ROUTES.INDEX} />;
              }}
            />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default connect((state: AppState) => ({
  isAuthenticated: state.user.isAuthenticated,
}))(AppRoutes);
