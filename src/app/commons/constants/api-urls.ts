const BASE_URL = "http://localhost:3000";

export class API_URLS_CONSTANTS {
  static API_URLS = {
    LOGIN_SCREEN: {
      SIGN_UP: "https://visakharoyalinteriors.herokuapp.com/auth/signup",
      SIGN_IN: "https://visakharoyalinteriors.herokuapp.com/auth/login",
    },
    ORGANIZATION: {
      DASHBOARD: {
        URL: "/organization-dashboard",
      },
      MANAGE_EVENTS: {
        // GET_EVENTS: "https://visakharoyalinteriors.herokuapp.com/auth/event",
        // CREATE_EVENTS:
        //   "https://visakharoyalinteriors.herokuapp.com/auth/create-event",
        // DELETE_EVENTS: "https://visakharoyalinteriors.herokuapp.com/auth/event",
        GET_EVENTS: `${BASE_URL}/events`,
        CREATE_EVENTS: `${BASE_URL}/events`,
        UPDATE_EVENTS: `${BASE_URL}/events`,
        DELETE_EVENT: `${BASE_URL}/events`,
      },
      MANAGE_CANDIDATES: {
        GET_CANDIDATES: `${BASE_URL}/candidates`,
        ADD_CANDIDATE: `${BASE_URL}/candidates`,
        UPDATE_CANDIDATE: `${BASE_URL}/candidates`,
        DELETE_CANDIDATE: `${BASE_URL}/candidates`,
      },
    },
    INDIVIDUAL: { DASHBOARD: { URL: "/individual-dashboard" } },
  };
}
