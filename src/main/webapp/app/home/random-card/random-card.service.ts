import {Injectable} from '@angular/core'
import {HttpClient, HttpResponse} from '@angular/common/http'
import {SERVER_API_URL} from '../../app.constants'
import {Card, CardService, EntityResponseType} from '../../entities/card'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class RandomCardService {

    private resourceUrl = SERVER_API_URL + 'api'

    constructor(private http: HttpClient, private cardService: CardService) {
    }

    get(): Observable<EntityResponseType> {
        return this.http.get<Card>(`${this.resourceUrl}/get-random-card`, {observe: 'response'})
            .map((res: EntityResponseType) => this.cardService.convertResponse(res))
    }

    getAll(): Observable<EntityResponseType> {
        return this.http.get<Card>(`${this.resourceUrl}/get-all-cards`, {observe: 'response'})
            .map((res: EntityResponseType) => this.cardService.convertResponse(res))
    }

    markAsKnown(id: number): Observable<EntityResponseType> {
        return this.http.get<Card>(`${this.resourceUrl}/mark-as-known/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.cardService.convertResponse(res))
    }

    markAllAsUnknown(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/mark-all-unknown`, {observe: 'response'})
    }
}
