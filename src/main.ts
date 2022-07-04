import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




/**********************THEME HANDLERS**********************/
function toggleTheme(theme: string) {
  const html = document.getElementsByTagName('html')[0];
  html.dataset['theme'] = theme;
}

function toggleDarkMode(enable: boolean) {
  toggleTheme(enable ? 'dark' : 'light');
}

window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
  if (!('theme' in localStorage)) {
    toggleDarkMode(e.matches);
  }
});

if ('theme' in localStorage) {
  const theme: string = localStorage.getItem('theme') || 'light';
  toggleTheme(theme);
} else {
  toggleDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
}
/**********************THEME HANDLERS**********************/
