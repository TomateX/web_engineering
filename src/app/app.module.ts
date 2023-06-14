import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/sections/search/search.component';
import { TracksComponent } from './components/sections/tracks/tracks.component';
import { SectionsComponent } from './components/sections/sections.component';
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AlbumsComponent } from './components/sections/albums/albums.component';
import { ArtistsComponent } from './components/sections/artists/artists.component';
import { PlaylistsComponent } from './components/sections/playlists/playlists.component';
import { SearchCardComponent } from './components/sections/search/search-card/search-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    TracksComponent,
    SectionsComponent,
    AlbumsComponent,
    ArtistsComponent,
    PlaylistsComponent,
    SearchCardComponent
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
