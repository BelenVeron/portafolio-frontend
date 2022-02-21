import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { IndexComponent } from './pages/index/index.component';
import { EditComponent } from './pages/edit/edit.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageComponent } from './components/image/image.component';
import { ResponsiveDirective } from './directives/responsive.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ButtonComponent } from './components/button/button.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { InputComponent } from './components/input/input.component';
import { interceptorProvider } from './interceptors/edit/edit.interceptor';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillComponent } from './components/skill/skill.component';
import { ModalComponent } from './components/modal/modal.component';
import { DatePipe } from '@angular/common';
import { EducationComponent } from './components/education/education.component';
import { DividerComponent } from './components/divider/divider.component';
import { TitleComponent } from './components/title/title.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    EditComponent,
    NavComponent,
    ImageComponent,
    ResponsiveDirective,
    HeroComponent,
    AboutComponent,
    ButtonComponent,
    ExperienceComponent,
    InputComponent,
    TextareaComponent,
    ImageUploadComponent,
    SkillComponent,
    ModalComponent,
    EducationComponent,
    DividerComponent,
    TitleComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    interceptorProvider,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
