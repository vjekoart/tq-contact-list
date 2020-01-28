import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Views
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ListViewComponent } from './views/list-view/list-view.component';
import { FavoritesViewComponent } from './views/favorites-view/favorites-view.component';
import { CreateViewComponent } from './views/create-view/create-view.component';
import { DetailsViewComponent } from './views/details-view/details-view.component';
import { EditViewComponent } from './views/edit-view/edit-view.component';

// Shared
import { ContactBoxComponent } from './shared/contact-box/contact-box.component';
import { ContactImageComponent } from './shared/contact-image/contact-image.component';
import { ContactAddBoxComponent } from './shared/contact-add-box/contact-add-box.component';
import { SearchFieldComponent } from './shared/search-field/search-field.component';
import { ContactListComponent } from './shared/contact-list/contact-list.component';
import { ContactFormComponent } from './shared/contact-form/contact-form.component';
import { LoadingMessageComponent } from './shared/loading-message/loading-message.component';
import { FatalMessageComponent } from './shared/fatal-message/fatal-message.component';
import { ButtonComponent } from './shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    ListViewComponent,
    FavoritesViewComponent,
    CreateViewComponent,
    DetailsViewComponent,
    EditViewComponent,
    ContactBoxComponent,
    ContactImageComponent,
    ContactAddBoxComponent,
    SearchFieldComponent,
    ContactListComponent,
    ContactFormComponent,
    LoadingMessageComponent,
    FatalMessageComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
