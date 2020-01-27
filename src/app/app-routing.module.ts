import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllContactsComponent } from './views/all-contacts/all-contacts.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { CreateContactComponent } from './views/create-contact/create-contact.component';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: ContactDetailsComponent
  }, {
    path: 'create',
    component: CreateContactComponent
  }, {
    path: 'edit/:id',
    component: EditContactComponent
  }, {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AllContactsComponent
      }, {
        path: 'favorites',
        component: FavoritesComponent
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
