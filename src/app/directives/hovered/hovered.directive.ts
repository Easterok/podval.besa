import {Directive, HostListener, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({
    selector: '[pbHovered]',
})
export class HoveredDirective {
    @Output('pbHovered') readonly hovered$ = new Subject<boolean>();

    @HostListener('mouseenter')
    onHover() {
        this.hovered$.next(true);
    }

    @HostListener('mouseleave')
    onLeave() {
        this.hovered$.next(false);
    }
}
