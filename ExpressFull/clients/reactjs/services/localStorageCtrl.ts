interface IAppSettings {
  keepSession: boolean;
}

interface IUserState {
  isLoggedIn: boolean;
  token: string | null;
  region: string | null;
  id: string | null;
  contactInfo: {
    active_date: string | null;
    address: string | null;
    city: string | null;
    company: string | null;
    country: string | null;
    email: string | null;
    insert_date: string | null;
    lang: string | null;
    name: string | null;
    nif: string | null;
    phone: string | null;
    state: string | null;
  };
}

const initialAppSettings = {
  keepSession: false,
};

const initialUserState = {
  isLoggedIn: false,
  token: null,
  region: "",
  id: null,
  contactInfo: {
    active_date: "",
    address: "",
    city: "",
    company: "",
    country: "",
    email: "",
    insert_date: "",
    lang: "",
    name: "",
    nif: "",
    phone: "",
    state: "",
  },
};

class LocalStorageCtrl {
  PREFIX_KEY: string | undefined;
  APP_SETTINGS_KEY: string;
  USER_STATE_KEY: string;
  appSettings: IAppSettings;
  userState: IUserState;
  constructor() {
    this.PREFIX_KEY = process.env.REACT_APP_PREFIX_KEY;
    this.APP_SETTINGS_KEY = `${this.PREFIX_KEY}_APP_SETTINGS`;
    this.USER_STATE_KEY = `${this.PREFIX_KEY}_USER_STATE`;

    const appSettings = window.localStorage.getItem(this.APP_SETTINGS_KEY);
    if (!appSettings) {
      window.localStorage.setItem(
        this.APP_SETTINGS_KEY,
        JSON.stringify(initialAppSettings)
      );
    }
    this.appSettings = appSettings
      ? JSON.parse(appSettings)
      : initialAppSettings;

    const userState = window.localStorage.getItem(this.USER_STATE_KEY);
    if (!userState) {
      window.localStorage.setItem(
        this.USER_STATE_KEY,
        JSON.stringify(initialUserState)
      );
    }
    this.userState = userState ? JSON.parse(userState) : initialUserState;
  }
  getAppSettings() {
    const settings = window.localStorage.getItem(this.APP_SETTINGS_KEY);
    if (!settings) {
      return initialAppSettings;
    }
    return JSON.parse(settings);
  }
  setAppSettings(settings: IAppSettings) {
    window.localStorage.setItem(
      this.APP_SETTINGS_KEY,
      JSON.stringify(settings)
    );
  }
  getUserState() {
    const userState = window.localStorage.getItem(this.USER_STATE_KEY);
    if (!userState) {
      return initialUserState;
    }
    return JSON.parse(userState);
  }
  setUserState(userState: IUserState) {
    window.localStorage.setItem(this.USER_STATE_KEY, JSON.stringify(userState));
  }
  resetUserState() {
    window.localStorage.setItem(
      this.USER_STATE_KEY,
      JSON.stringify(initialUserState)
    );
  }
}

const localStorageCtrl = new LocalStorageCtrl();

export type { IAppSettings, IUserState };
export { localStorageCtrl };
