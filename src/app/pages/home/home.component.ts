import * as lamp from '!!raw-loader!./lamp.svg';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, interval, Subject} from 'rxjs';
import {takeUntil, takeWhile} from 'rxjs/operators';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {animate, style, transition, trigger} from '@angular/animations';

const audio = new Audio('/assets/sound.mp3');

audio.volume = 0;

const animationsTokens = {
    show: {opacity: 1},
    hide: {opacity: 0},
    timings: '5s ease',
};

@Component({
    selector: 'pb-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('showIcon', [
            transition(':enter', [
                style(animationsTokens.hide),
                animate(animationsTokens.timings, style(animationsTokens.show)),
            ]),
            transition(':leave', [
                style(animationsTokens.show),
                animate(animationsTokens.timings, style(animationsTokens.hide)),
            ]),
        ]),
    ],
})
export class HomeComponent {
    readonly showIcon$ = new BehaviorSubject<boolean>(false);
    private showIconTimeout: number | null = null;
    private readonly audio = audio;
    private readonly hoveredChange$ = new Subject<void>();

    constructor(
        private readonly matIconRegistry: MatIconRegistry,
        private readonly domSanitizer: DomSanitizer,
    ) {
        this.matIconRegistry.addSvgIconLiteral(
            'lamp',
            this.domSanitizer.bypassSecurityTrustHtml(lamp),
        );
    }

    hoveredChange(hovered: boolean) {
        this.hoveredChange$.next();

        if (hovered) {
            this.play();
        } else {
            this.pause();
        }
    }

    private play() {
        if (this.audio.paused) {
            this.audio.play();
        }

        this.showIconTimeout = setTimeout(() => this.showIcon$.next(true), 30000);

        interval(50)
            .pipe(
                takeWhile(() => this.audio.volume !== 1),
                takeUntil(this.hoveredChange$),
            )
            .subscribe(() => {
                this.audio.volume = Math.min(this.audio.volume + 0.01, 1);
            });
    }

    private pause() {
        clearTimeout(this.showIconTimeout);

        interval(50)
            .pipe(
                takeWhile(() => this.audio.volume !== 0),
                takeUntil(this.hoveredChange$),
            )
            .subscribe(() => {
                const volume = Math.max(this.audio.volume - 0.01, 0);

                if (volume === 0) {
                    this.audio.pause();
                    this.showIcon$.next(false);
                }

                this.audio.volume = volume;
            });
    }
}
