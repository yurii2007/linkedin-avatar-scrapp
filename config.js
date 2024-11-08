export const LINKEDIN_LOGIN_URL = 'https://www.linkedin.com/login';

export const selectors = {
  SIGNIN_BTN: '.nav__button-secondary',
  REMEMBER_ME_CHECKBOX: '#rememberMeOptIn-checkbox',
  EMAIL_INPUT: '#username',
  PASSWORD_INPUT: '#password',
  SIGNIN_FORM_BTN: '.btn__primary--large',
  AVATAR: '.profile-card-profile-picture',
};

export const environment = {
  LINKEDIN_EMAIL: process.env.LINKEDIN_EMAIL,
  LINKEDIN_PASSWORD: process.env.LINKEDIN_PASSWORD,
  dev: process.env.NODE_ENV === 'development',
};
