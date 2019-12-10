import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {debounceTime, repeat, switchMap, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

class Link {
    constructor(public readonly url: string[], private readonly name: string) {}

    toString(): string {
        return this.name;
    }
}

const MOUSEMOVE_DEBOUNCE_TIME = 10 * 1000;

const animationsTokens = {
    show: {transform: 'translate(0%)', opacity: 1},
    hide: {transform: 'translate(100%)', opacity: 0},
    timings: '255ms ease',
};

@Component({
    selector: 'pb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('menuOpened', [
            state('open', style(animationsTokens.show)),
            state('closed', style(animationsTokens.hide)),
            transition('open => closed', [animate(animationsTokens.timings)]),
            transition('closed => open', [animate(animationsTokens.timings)]),
        ]),
    ],
})
export class MenuComponent {
    readonly links = [
        new Link(['/'], 'Главная'),
        new Link(['/history'], 'История'),
        new Link(['/about'], 'Обо мне'),
    ];

    opened$ = new BehaviorSubject<'open' | 'closed'>('open');

    constructor(
        private readonly router: Router,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
        this.subscribeOnMouseMove();
    }

    hoveredChange(hovered: boolean, {url}: Link) {
        if (hovered) {
            this.router.navigate(url);
        }
    }

    private subscribeOnMouseMove() {
        fromEvent(this.document, 'mousemove')
            .pipe(
                debounceTime(MOUSEMOVE_DEBOUNCE_TIME),
                take(1),
                tap(() => this.opened$.next('closed')),
                switchMap(() => fromEvent(this.document, 'mousemove')),
                take(1),
                tap(() => this.opened$.next('open')),
                repeat(),
            )
            .subscribe();
    }
}
