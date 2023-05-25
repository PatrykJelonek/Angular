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
import {UsersComponent} from "./Components/users/users.component";
import { RepositoriesListComponent } from './Components/Assets/repositories-list/repositories-list.component';
import { PaginationComponent } from './Components/Assets/pagination/pagination.component';
import {SinceDatePipes} from "./Pipes/sinceDate.pipes";
import {FormattedDatePipe} from "./Pipes/formatedDate.pipes";
import { BranchesListComponent } from './Components/Assets/branches-list/branches-list.component';
import { ContributorsListComponent } from './Components/Assets/contributors-list/contributors-list.component';
import { IssuesListComponent } from './Components/Assets/issues-list/issues-list.component';
import { CommitsListComponent } from './Components/Assets/commits-list/commits-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositoriesComponent,
    SearchComponent,
    UserProfileComponent,
    RepositoryDetailsComponent,
    RepositoryComponent,
    BytesPipe,
    UsersComponent,
    RepositoriesListComponent,
    PaginationComponent,
    SinceDatePipes,
    FormattedDatePipe,
    BranchesListComponent,
    ContributorsListComponent,
    IssuesListComponent,
    CommitsListComponent
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
