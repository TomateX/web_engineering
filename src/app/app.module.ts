import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/sections/search/search.component';
import { SectionsComponent } from './components/sections/sections.component';
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PlaylistsComponent } from './components/sections/playlists/playlists.component';
import { SearchCardComponent } from './components/sections/search-card-box/search-card/search-card.component';
import { SearchCardBoxComponent } from './components/sections/search-card-box/search-card-box.component';
import { EmptyComponent } from './components/empty/empty.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    SectionsComponent,
    PlaylistsComponent,
    SearchCardComponent,
    SearchCardBoxComponent,
    EmptyComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
