import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepositoriesComponent} from "./Components/repositories/repositories.component";
import {SearchComponent} from "./Components/search/search.component";
import {UserProfileComponent} from "./Components/user-profile/user-profile.component";
import {RepositoryDetailsComponent} from "./Components/repository-details/repository-details.component";
import {RepositoryComponent} from "./Components/repository/repository.component";

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'repositories', component: RepositoriesComponent},
  {path: 'users/:username', component: UserProfileComponent},
  {path: 'repositories/:query', component: RepositoryDetailsComponent},
  {path: 'repositories/:user/:repo', component: RepositoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
