import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {HoveredModule} from '../../directives/hovered/hovered.module';

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule, RouterModule, HoveredModule],
    exports: [MenuComponent],
})
export class MenuModule {}
