import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Card } from './card.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Card>;

@Injectable()
export class CardService {

    private resourceUrl =  SERVER_API_URL + 'api/cards';

    constructor(private http: HttpClient) { }

    create(card: Card): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.post<Card>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(card: Card): Observable<EntityResponseType> {
        const copy = this.convert(card);
        return this.http.put<Card>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Card>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Card[]>> {
        const options = createRequestOption(req);
        return this.http.get<Card[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Card[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Card = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Card[]>): HttpResponse<Card[]> {
        const jsonResponse: Card[] = res.body;
        const body: Card[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Card.
     */
    private convertItemFromServer(card: Card): Card {
        const copy: Card = Object.assign({}, card);
        return copy;
    }

    /**
     * Convert a Card to a JSON which can be sent to the server.
     */
    private convert(card: Card): Card {
        const copy: Card = Object.assign({}, card);
        return copy;
    }
}
