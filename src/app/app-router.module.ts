import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
    {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
    },
    {
        path: 'history',
        loadChildren: () =>
            import('./pages/history/history.module').then(m => m.HistoryModule),
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouterModule {}
