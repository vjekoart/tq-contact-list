import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Views
import { HomeComponent } from './views/home/home.component';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { AllContactsComponent } from './views/all-contacts/all-contacts.component';
import { CreateContactComponent } from './views/create-contact/create-contact.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';

// Shared
import { ContactBoxComponent } from './shared/contact-box/contact-box.component';
import { ContactImageComponent } from './shared/contact-image/contact-image.component';
import { ContactAddBoxComponent } from './shared/contact-add-box/contact-add-box.component';
import { SearchFieldComponent } from './shared/search-field/search-field.component';
import { ContactListComponent } from './shared/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    AllContactsComponent,
    CreateContactComponent,
    ContactDetailsComponent,
    EditContactComponent,
    ContactBoxComponent,
    ContactImageComponent,
    ContactAddBoxComponent,
    SearchFieldComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
