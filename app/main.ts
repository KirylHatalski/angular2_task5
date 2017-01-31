import 'zone.js';
import 'reflect-metadata';
import './styles.styl';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IndexModule }            from './modules/index.module';

platformBrowserDynamic().bootstrapModule(IndexModule);
