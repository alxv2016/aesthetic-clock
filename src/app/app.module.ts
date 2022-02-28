import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LayoutModule} from '@angular/cdk/layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LayoutModule, AppRoutingModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
