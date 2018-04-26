import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {KatexOptions} from 'ng-katex'

@Component({
    selector: 'jhi-latex',
    templateUrl: './latex.component.html',
    styles: []
})
export class JhiLatexComponent implements OnInit {

    private readonly DISPLAY_MODE: number = 1;
    private readonly INLINE_MODE: number = 2;


    private readonly splitRe = /(\$(?:\\\$|[^\$])+\$)|(\$\$(?:\\\$|[^\$])+\$\$)/g;

    private readonly matchDisplayRe = /(?:\$\$((?:\\\$|[^\$])+)\$\$)/;
    private readonly matchInlineRe = /(?:\$((?:\\\$|[^\$])+)\$)/;

    private readonly cleanRe = /(\${1,2})((?:\\\$|[^\$])+)\1/


    private readonly options: KatexOptions = {
        displayMode: true
    };

    @Input() paragraph: string;
    @Output() onError = new EventEmitter<any>();

    hasError(error) {
        this.onError.emit(error);
    }

    splitParagraph(paragraph: string): Array<string> {
        return paragraph.split(this.splitRe).filter(x => x)
    }

    private classify(s: string): number {
        if (s.match(this.matchDisplayRe)) {
            return 1;
        } else if (s.match(this.matchInlineRe)) {
            return 2;
        } else {
            return 0;
        }
    }

    private clean(s: string): string {
        return s.match(this.cleanRe)[2];
    }

    ngOnInit(): void {}

}
