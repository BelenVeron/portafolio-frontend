import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LoginGuard } from './guards/login/login.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { EditComponent } from './pages/edit/edit.component';
import { PersonalInformationGuard } from './guards/crud/personal-information/personal-information.guard';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'edit', component: EditComponent, canActivate: [PersonalInformationGuard], data: {expectedRole: ['user', 'admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
