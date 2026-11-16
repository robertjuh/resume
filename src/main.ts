import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App).catch((error: unknown) => console.error('Portfolio could not start:', error));

