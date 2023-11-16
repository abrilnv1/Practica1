import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Cards } from "src/app/core/trello/entities/cards";
import { CardsRepository } from "src/app/core/trello/interfaces/cards.repository";

@Injectable({providedIn: 'root'})

export class CardsStorageService implements CardsRepository{

    urlTrello = "https://api.trello.com/1/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    };

    constructor(
        public http: HttpClient
    ){}
    
    createCard(cards: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("idList", cards.idList)
            .set("key", cards.key)
            .set("token", cards.token)
            .set("name", cards.name)
    
        return this.http.post(this.urlTrello + "cards", httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    async getCard(idList:string): Promise<Cards[]> {
        //const idBoard = await this.getCardsUseCase.execute()

        const httpParams = new HttpParams()
            .set("key", "acdbb5b3e20694e7757b59d1dc7afa4a")
            .set("token", "ATTA95e6fcf415d57af5a90ba9c11097323c4a4d24a4989f678b016fa11f131911cb5D32B9DD")
    
        return this.http.get<Cards[]>(this.urlTrello + "lists/" + idList + "/cards", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                //const listNames = response?.map((list) => list.name);
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error
            });
    }

    updateCard(updatedCards: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("key", updatedCards.key)
            .set("token", updatedCards.token)
            .set("name", updatedCards.name)
            .set("desc", updatedCards.desc)
    
        return this.http.put(this.urlTrello + "cards/" + updatedCards.id, httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    async deleteCard(card: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("key", card.key)
            .set("token", card.token)
    
        try {
            await this.http.delete(this.urlTrello + "cards/" + card.id, { params: httpParams, headers: { "Accept": "application/json" }})
                .toPromise();
            console.log("confirm");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}