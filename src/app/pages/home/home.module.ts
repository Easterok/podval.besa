import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HoveredModule} from '../../directives/hovered/hovered.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HoveredModule],
    exports: [HomeComponent],
})
export class HomeModule {}
