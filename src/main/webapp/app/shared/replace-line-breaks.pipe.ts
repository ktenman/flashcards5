import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'replaceLineBreaks'
})
export class JhiReplaceLineBreaksPipe implements PipeTransform {
    transform(value: string): string {
        const newValue = value.replace(/\n/g, '<br/>')
        return `${newValue}`
    }
}
