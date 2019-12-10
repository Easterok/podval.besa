import {ChangeDetectionStrategy, Component} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {takeUntil, takeWhile} from 'rxjs/operators';

const audio = new Audio('/assets/sound.mp3');

audio.volume = 0;

@Component({
    selector: 'pb-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    private readonly audio = audio;
    private readonly hoveredChange$ = new Subject<void>();

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
        interval(50)
            .pipe(
                takeWhile(() => this.audio.volume !== 0),
                takeUntil(this.hoveredChange$),
            )
            .subscribe(() => {
                const volume = Math.max(this.audio.volume - 0.01, 0);

                if (volume === 0) {
                    this.audio.pause();
                }

                this.audio.volume = volume;
            });
    }
}
