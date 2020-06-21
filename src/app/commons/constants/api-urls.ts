const LOCAL_URL = "http://localhost:3000";
const BASE_URL = "https://visakharoyalinteriors.herokuapp.com";

export class API_URLS_CONSTANTS {
  static API_URLS = {
    LOGIN_SCREEN: {
      SIGN_IN: `${BASE_URL}/entervu/login`,
    },
    ORGANIZATION: {
      REGISTRATION: {
        HR: `${BASE_URL}/entervu/company/register`,
      },
      MANAGE_EVENTS: {
        GET_EVENTS: `${BASE_URL}​/entervu​/event`,
        CREATE_EVENTS: `${BASE_URL}/entervu​/event`,
        UPDATE_EVENTS: `${BASE_URL}/entervu​/event`,
        DELETE_EVENT: `${BASE_URL}/entervu​/event`,
      },
      MANAGE_CANDIDATES: {
        GET_CANDIDATES: `${LOCAL_URL}/candidates`,
        ADD_CANDIDATE: `${LOCAL_URL}/candidates`,
        UPDATE_CANDIDATE: `${LOCAL_URL}/candidates`,
        DELETE_CANDIDATE: `${LOCAL_URL}/candidates`,
      },
      MANAGE_HR_TEAM: {
        GET_TEAM_MEMBERS: `${LOCAL_URL}/teams`,
        ADD_TEAM_MEMBERS: `${LOCAL_URL}/teams`,
        UPDATE_TEAM_MEMBERS: `${LOCAL_URL}/teams`,
        DELETE_TEAM_MEMBERS: `${LOCAL_URL}/teams`,
      },
      PROFILE: {
        GET_PROFILE: `${LOCAL_URL}/profiles`,
        UPDATE_PROFILE: `${LOCAL_URL}/profiles`,
        DELETE_PROFILE: `${LOCAL_URL}/profiles`,
      },
    },
    INDIVIDUAL: {
      REGISTRATION: {
        CANDIDATE: `${BASE_URL}/entervu/candidate/register`,
      },
    },
    ADMIN: {
      SKILLS: {
        GET_SKILLS: `${BASE_URL}/entervu/skill`,
        FIND_SKILLS: `${BASE_URL}/entervu/skill/value`,
        CREATE_SKILLS: `${BASE_URL}/entervu/skill`,
        UPDATE_SKILLS: `${BASE_URL}/entervu/skill`,
        DELETE_SKILLS: `${BASE_URL}/entervu/skill`,
      },
    },
  };
}
