import { Route } from '@angular/router';

import { DemoComponent } from './demo.component';
import { AppComponent } from './app.component';
import { DemoRootComponent } from './demo-root.component';

export const routes: Route[] = [
  { path: '', component: AppComponent },
  { path: 'demo', component: DemoComponent },
  { path: '**', component: AppComponent }
];
