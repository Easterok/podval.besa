import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {
    debounceTime,
    filter,
    map,
    mapTo,
    repeat,
    switchMap,
    take,
    tap,
} from 'rxjs/operators';

const animationsTokens = {
    show: {transform: 'translate(0%)', opacity: 1},
    hide: {transform: 'translate(100%)', opacity: 0},
    timings: '255ms ease',
};

const MOUSEMOVE_DEBOUNCE_TIME = 60 * 1000;

@Component({
    selector: 'pb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('menuOpened', [
            transition(':enter', [
                style(animationsTokens.hide),
                animate(animationsTokens.timings, style(animationsTokens.show)),
            ]),
            transition(':leave', [
                style(animationsTokens.show),
                animate(animationsTokens.timings, style(animationsTokens.hide)),
            ]),
        ]),
        trigger('opacity', [
            transition(':enter', [
                style({opacity: 0}),
                animate(animationsTokens.timings, style({opacity: 1})),
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate(animationsTokens.timings, style({opacity: 0})),
            ]),
        ]),
    ],
})
export class AppComponent {
    menuOpened$ = new BehaviorSubject<boolean>(false);
    showLine$ = new BehaviorSubject<boolean>(true);

    constructor(
        private readonly router: Router,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
        this.subscribeOnMouseMove();
    }

    get isRoot(): boolean {
        return this.router.isActive('/', true);
    }

    get isHistory(): boolean {
        return this.router.isActive('/history', true);
    }

    toggleMenu() {
        const opened = this.menuOpened$.value;

        this.menuOpened$.next(!opened);
    }

    private subscribeOnMouseMove() {
        fromEvent(this.document, 'mousemove')
            .pipe(
                filter(() => this.isHistory),
                debounceTime(MOUSEMOVE_DEBOUNCE_TIME),
                take(1),
                map(() => {
                    const menuWasOpened = this.menuOpened$.value;

                    this.menuOpened$.next(false);
                    this.showLine$.next(false);

                    return menuWasOpened;
                }),
                switchMap(menuWasOpened =>
                    fromEvent(this.document, 'mousemove').pipe(mapTo(menuWasOpened)),
                ),
                take(1),
                tap(menuWasOpened => {
                    this.menuOpened$.next(menuWasOpened);
                    this.showLine$.next(true);
                }),
                repeat(),
            )
            .subscribe();
    }
}
