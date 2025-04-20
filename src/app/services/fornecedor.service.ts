import { Injectable } from "@angular/core";
import { CommonsService } from "./commons.service";
import { HttpClient } from "@angular/common/http";
import { Fornecedor } from "../models/fornecedor";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FornecedorService extends CommonsService<Fornecedor> {
  
  fornecedorUpdateSource = new Subject<Boolean>();
  fornecedorUpdated$ = this.fornecedorUpdateSource.asObservable();
  
  
  constructor(http: HttpClient) {
    super(http, 'fornecedor');
  }
}