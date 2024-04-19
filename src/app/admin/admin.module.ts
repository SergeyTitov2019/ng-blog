import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateComponent} from './create/create.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {SharedModule} from "../shared/shared/shared.module";
import {AuthGuard} from "../shared/services/auth.guard";


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: 'admin/login', pathMatch: "full"},
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    CreateComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AdminModule {
}
