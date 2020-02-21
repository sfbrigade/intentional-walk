import React, {createRef} from 'react';

export const routeNameRef = createRef();
export const navigationRef = createRef();

export function getActiveRouteName(state) {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export function isActiveRoute(routeName) {
  return routeNameRef.current == routeName;
}

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
