import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HoveredModule} from '../../directives/hovered/hovered.module';
import {MatIconModule} from '@angular/material';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HoveredModule, MatIconModule],
    exports: [HomeComponent],
})
export class HomeModule {}
