import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabelComponent } from './components/label/label.component';
import { AnnotateComponent } from './components/annotate/annotate.component';
import { ImageListComponent } from './components/image-list/image-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    AnnotateComponent,
    ImageListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
