import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Boards } from "src/app/core/trello/entities/boards";
import { BoardsRepository } from "src/app/core/trello/interfaces/boards.repository";

@Injectable({providedIn: 'root'})

export class BoardsStorageService implements BoardsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(public http: HttpClient){}

    createBoard(boards: Boards): Promise<boolean> {
        
        const httpParams = new HttpParams()
            .set("name", boards.name)
            .set("key", boards.key)
            .set("token", boards.token)
    
        return this.http.post(this.urlTrello, httpParams, this.httpHeader)
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

    getBoard(): Promise<string> {
        const httpParams = new HttpParams()
            .set("key", "acdbb5b3e20694e7757b59d1dc7afa4a")
            .set("token", "ATTA95e6fcf415d57af5a90ba9c11097323c4a4d24a4989f678b016fa11f131911cb5D32B9DD")
    
        return this.http.get<any>(this.urlTrello + "v3qb19tX", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const idBoard = response.id
                return idBoard
            })
            .catch((error) => {
                return error
            });
    }
    

    updateBoard(id: string, updatedBoards: Boards): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteBoard(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}