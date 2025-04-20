import { Routes } from '@angular/router';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { EmpresaListComponent } from './components/empresa/empresa-list/empresa-list.component';
import { EmpresaFornecedorListComponent } from './components/empresa-fornecedor/empresa-fornecedor-list/empresa-fornecedor-list.component';


export const routes: Routes = [
  { path: 'fornecedores', component: FornecedorListComponent },
  { path: 'empresas', component: EmpresaListComponent },
  { path: 'relacao', component: EmpresaFornecedorListComponent},
  { path: '', redirectTo: 'fornecedores', pathMatch: 'full' }
];
