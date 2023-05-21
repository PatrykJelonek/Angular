import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RepositoriesComponent} from './Components/repositories/repositories.component';
import {HttpClientModule} from "@angular/common/http";
import {GithubAPIService} from "./Services/github-api.service";
import {FormsModule} from "@angular/forms";
import {SearchComponent} from "./Components/search/search.component";
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import {RepositoryDetailsComponent} from "./Components/repository-details/repository-details.component";
import { RepositoryComponent } from './Components/repository/repository.component';
import {BytesPipe} from "./Pipes/bytes.pipe";

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    SearchComponent,
    UserProfileComponent,
    RepositoryDetailsComponent,
    RepositoryComponent,
    BytesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [GithubAPIService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
