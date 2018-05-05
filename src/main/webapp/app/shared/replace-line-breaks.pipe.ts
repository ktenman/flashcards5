import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'replaceLineBreaksAndAsterisks'
})
export class JhiReplaceLineBreaksAndAsterisksPipe implements PipeTransform {
    transform(value: string): string {
        const newValue = value
            .replace(/\*/g, '•')
            .replace(/\n/g, '<br/>')
        return `${newValue}`
    }
}
