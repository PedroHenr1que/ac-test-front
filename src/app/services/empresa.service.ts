import { Injectable } from "@angular/core";
import { CommonsService } from "./commons.service";
import { HttpClient } from "@angular/common/http";
import { Empresa } from "../models/empresa";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmpresaService extends CommonsService<Empresa> {

  empresaUpdateSource = new Subject<Boolean>();
  empresaUpdated$ = this.empresaUpdateSource.asObservable();

  constructor(http: HttpClient) {
    super(http, 'empresa');
  }
}