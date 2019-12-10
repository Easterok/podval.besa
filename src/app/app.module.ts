import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {HomeModule} from './pages/home/home.module';
import {AppRouterModule} from './app-router.module';
import {MenuModule} from './modules/menu/menu.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRouterModule,
        HomeModule,
        MenuModule,
        HttpClientModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
