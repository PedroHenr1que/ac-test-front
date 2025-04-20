import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { CommonsService } from "./commons.service";

@Injectable({ providedIn: 'root' })
export class EmpresaFornecedorService extends CommonsService<any>{

    empresaFornecedorUpdateSource = new Subject<Boolean>();
    empresaFornecedorUpdated$ = this.empresaFornecedorUpdateSource.asObservable();

    constructor(http: HttpClient) {
        super(http, 'empresa-fornecedor')
    }

    save(empresaId:number, fornecedorId:number): Observable<any> {
        return this.http.post(`${this.path}/create?empresaId=${empresaId}&fornecedorId=${fornecedorId}`, null);
    }
}