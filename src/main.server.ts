import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export const createApplication = async () => {
  return await bootstrapApplication(AppComponent, config);
};

export default createApplication;
