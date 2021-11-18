import {createRef} from 'react';

export const routeNameRef = createRef();
export const navigationRef = createRef();

export function getActiveRouteName(state) {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
}

export function onStateChange(state) {
  const previousRouteName = routeNameRef.current;
  const currentRouteName = getActiveRouteName(state);
  if (previousRouteName !== currentRouteName) {
    // can do screen tracking here if desired
    // console.log(previousRouteName, currentRouteName);
    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  }
}

export function isActiveRoute(routeName) {
  return routeNameRef.current === routeName;
}
