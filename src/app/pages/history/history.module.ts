import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history.component';
import {HistoryRouterModule} from './history-router.module';

@NgModule({
    declarations: [HistoryComponent],
    imports: [CommonModule, HistoryRouterModule],
})
export class HistoryModule {}
