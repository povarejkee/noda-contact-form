export interface IEnvironment {
  production: boolean;
  APP_ENV?: string;
  APP_HOST?: string;
  APP_IMG?: string;
  APP_WS_HOST?: string;
  APP_AZURE_B2C_REDIRECT_URI?: string;
  APP_AZURE_B2C_CLIENT_ID?: string;
  APP_AZURE_B2C_AUTHORITY?: string;
  APP_AZURE_B2C_KNOW_AUTHORITIES?: string;
  APP_AZURE_B2C_READ_SCOPE?: string;
  APP_AZURE_B2C_WRITE_SCOPE?: string;
  APP_GTM?: string;
  APP_GBP_API_KEY?: string;
  APP_EUR_API_KEY?: string;
}
