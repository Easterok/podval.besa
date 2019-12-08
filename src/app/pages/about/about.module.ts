import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {AboutRouterModule} from './about-router.module';

@NgModule({
    declarations: [AboutComponent],
    imports: [CommonModule, AboutRouterModule],
})
export class AboutModule {}
