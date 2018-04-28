import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {SERVER_API_URL} from '../../app.constants'
import {Card} from '../../entities/card/card.model'
import {Observable} from 'rxjs/Observable'
import {EntityResponseType} from '../../entities/card/card.service'

@Injectable()
export class RandomCardService {

    private resourceUrl = SERVER_API_URL + 'api/get-random-card'

    constructor(private http: HttpClient) {
    }

    get(): Observable<EntityResponseType> {
        return this.http.get<Card>(this.resourceUrl, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res))
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Card = this.convertItemFromServer(res.body)
        return res.clone({body})
    }

    private convertItemFromServer(card: Card): Card {
        const copy: Card = Object.assign({}, card)
        return copy
    }

}
