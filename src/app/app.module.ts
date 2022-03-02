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
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { ProjectComponent } from './components/project/project.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const DATE_FORMAT = {
  parse: {
      dateInput: 'DD-MM-YYYY',
  },
  display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
    FooterComponent,
    SocialMediaComponent,
    ProjectComponent
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
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  providers: [
    interceptorProvider,
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
