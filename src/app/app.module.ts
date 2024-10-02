import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DxHttpModule } from 'devextreme-angular/http';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import {
  AppFooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './components';

import { AuthService, ScreenService, AppInfoService } from './services';
import { UnauthenticatedContentModule } from './layouts/unauthenticated-content/unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ThemeService } from './services';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { MailComponent } from './components/library/mail/mail.component';
import { NotificationsComponent } from './components/library/notifications/notifications.component';
import { DxLoadPanelModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    DxLoadPanelModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    AppFooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    ToastrModule.forRoot({
    enableHtml:true,
    timeOut:10000,
    positionClass:'toast-top-right',
    preventDuplicates:false
    })
  ],
  providers: [AuthService, ScreenService, AppInfoService, ThemeService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi: true
  }, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
