import {AfterContentChecked, Directive, ElementRef, HostListener} from '@angular/core'

@Directive({
    selector: 'textarea[jhiAutosize]'
})
export class JhiAutosizeDirective implements AfterContentChecked {

    constructor(public element: ElementRef) {
    }

    @HostListener('input', ['$event.target'])
    public onInput() {
        this.resize()
    }

    public ngAfterContentChecked() {
        this.resize()
    }

    public resize() {
        const height = this.element.nativeElement.scrollHeight
        const style = this.element.nativeElement.style
        style.height = 'auto'
        style.height = `${height}px`
        style.overflow = 'hidden'
    }

}
