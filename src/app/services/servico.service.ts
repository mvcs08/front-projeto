import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Servico } from '../Models/Servico';
import { Observable } from 'rxjs';
import { Response } from '../Models/Response';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private apiUrl = `${environment.endPoint}servico`

  constructor( private http: HttpClient ) { }

  CadastrarServico(objeto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, objeto);
  }

  GetServicos() : Observable<Servico[]> {
   return this.http.get<Servico[]>(this.apiUrl);
  }

  GetServico(id:number) : Observable<Servico> {
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }

  ExcluirServico(id:number) : Observable<Servico[]> {
    return this.http.delete<Servico[]>(`${this.apiUrl}/${id}`);
  }

}
