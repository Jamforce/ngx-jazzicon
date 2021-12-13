import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JazziconModule } from 'ngx-jazzicon';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ngx-jazzicon' }),
    FormsModule, 
    JazziconModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
