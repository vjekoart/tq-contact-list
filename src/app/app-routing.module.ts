import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeViewComponent } from './views/home-view/home-view.component';
import { ListViewComponent } from './views/list-view/list-view.component';
import { FavoritesViewComponent } from './views/favorites-view/favorites-view.component';
import { CreateViewComponent } from './views/create-view/create-view.component';
import { DetailsViewComponent } from './views/details-view/details-view.component';
import { EditViewComponent } from './views/edit-view/edit-view.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateViewComponent
  }, {
    path: 'edit/:id',
    component: EditViewComponent
  }, {
    path: 'details/:id',
    component: DetailsViewComponent
  }, {
    path: '',
    component: HomeViewComponent,
    children: [
      {
        path: '',
        component: ListViewComponent
      }, {
        path: 'favorites',
        component: FavoritesViewComponent
      }
    ]
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
