import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {SERVER_API_URL} from '../../app.constants'
import {Card, CardService, EntityResponseType} from '../../entities/card'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class RandomCardService {

    private resourceUrl = SERVER_API_URL + 'api/get-random-card'

    constructor(private http: HttpClient, private cardService: CardService) {
    }

    get(): Observable<EntityResponseType> {
        return this.http.get<Card>(this.resourceUrl, {observe: 'response'})
            .map((res: EntityResponseType) => this.cardService.convertResponse(res))
    }

}
