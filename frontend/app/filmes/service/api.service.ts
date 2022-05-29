
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map ,first, delay } from 'rxjs/operators'
import { Filmes } from '../model/Filmes';
 
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly apiUrl = 'http://localhost:8080/api/filmes';

    constructor(private httpClient: HttpClient) { }
      list() 
      {
          return this.httpClient.get<Filmes[]>(this.apiUrl+'/listar').pipe(
          first(),
          tap(filmes => console.log(filmes))
      );
      }

     save(record: Filmes) {
    return this.httpClient.post<Filmes>(this.apiUrl+'/incluir', record).pipe(first(),tap(record => console.log(record)));
    }

    delete(vId : Number ) {
      return this.httpClient.delete(this.apiUrl+'/deletar/'+vId).pipe(first(),tap(record => console.log(record)));
    }

    put(vId : Number,record: Filmes ) {
      return this.httpClient.put(this.apiUrl+'/alterar/'+vId,record).pipe(first(),tap(record => console.log(record)));
    }

    buscar(vId: String) {
      return this.httpClient.get<Filmes[]>(this.apiUrl+'/procurarid/'+vId).pipe(
      first(),
      tap(filmes => console.log('buscar++++++++++++++++++++'+filmes))
    );
  }
}


