import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistsComponent} from "./components/sections/playlists/playlists.component";
import {EmptyComponent} from "./components/empty/empty.component";
import {SearchCardBoxComponent} from "./components/sections/search-card-box/search-card-box.component";

const routes: Routes = [
  {path:'album/:name', component:PlaylistsComponent},
  {path:'playlist/:name', component: PlaylistsComponent},
  {path:'search/:type/:name', component: SearchCardBoxComponent},
  {path:'', component: EmptyComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
