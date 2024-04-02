import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./post/post.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: HomeComponent},
      { path: 'post/:id', component: PostComponent},
      { path: '', redirectTo: '/', pathMatch: "full"},
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
