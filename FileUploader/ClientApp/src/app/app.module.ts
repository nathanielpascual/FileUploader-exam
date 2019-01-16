import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { DndDirective } from './upload/upload.directive';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    NavMenuComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
