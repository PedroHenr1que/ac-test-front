import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor';
import { EmpresaFornecedorService } from '../../../services/empresa-fornecedor.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { EmpresaFornecedorFormComponent } from "../empresa-fornecedor-form/empresa-fornecedor-form.component";
import { FormsModule } from '@angular/forms';
import { DeleteButtonRendererComponent } from '../../shared/delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-empresa-fornecedor-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, EmpresaFornecedorFormComponent],
  templateUrl: './empresa-fornecedor-list.component.html',
  styleUrl: './empresa-fornecedor-list.component.css'
})
export class EmpresaFornecedorListComponent implements OnInit {

  columnDefs: any[] = [
    { field: 'empresa.nomeFantasia', headerName: 'Empresa' },
    { field: 'empresa.cnpj', headerName: 'CNPJ Empresa' },
    { field: 'fornecedor.nome', headerName: 'Fornecedor' },
    { field: 'fornecedor.documento', headerName: 'Documento Fornecedor' },
    {
      headerName: "Ações",
      cellRenderer: DeleteButtonRendererComponent,
      cellRendererParams: {
        delete: (data: any) => this.deleteEmpresaFornecedor(data)
      }
    }
  ];

  defaultColDef = {
    resizable: true,
    filter: true,
    sortable: true,
    flex: 1,
    minWidth: 120,
  };

  empresasFornecedores: Fornecedor[] = [];

  constructor(
    private empresaFornecedorService: EmpresaFornecedorService) {
    this.empresaFornecedorService.empresaFornecedorUpdated$.subscribe(_ => this.loadEmpresaFornecedor())
  }

  ngOnInit(): void {
    this.loadEmpresaFornecedor();
    
  }

  loadEmpresaFornecedor() {
    this.empresaFornecedorService.getAll().subscribe({
      next: (res) => this.empresasFornecedores = res,
      error: err => alert(err.error)
    });
  }

  deleteEmpresaFornecedor(fornecedor: any) {
    this.empresaFornecedorService.delete(fornecedor.id).subscribe({
      next: () => {
        this.loadEmpresaFornecedor();
      },
      error: err => alert(err.error)
    });
  }
}
