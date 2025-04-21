import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../models/empresa';
import { EmpresaFormComponent } from '../empresa-form/empresa-form.component';
import { DeleteButtonRendererComponent } from '../../shared/delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, EmpresaFormComponent],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css'
})
export class EmpresaListComponent implements OnInit {

  columnDefs: any[] = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'nomeFantasia', headerName: 'Nome Fantasia', filter: true },
    { field: 'cnpj', headerName: 'CNPJ', filter: true },
    { field: 'cep', headerName: 'CEP', filter: true },
    { headerName: "Ações", 
      cellRenderer: DeleteButtonRendererComponent, 
      cellRendererParams: {
        delete: (data: any) => this.deleteEmpresa(data)
      }
    }
  ];

  defaultColDef = {
    resizable: true,
    filter: true,
    sortable: true,
    flex: 1,
    minWidth: 120,
    editable: true
  };

  empresas: Empresa[] = [];

  constructor(private empresaService: EmpresaService) {
    this.empresaService.empresaUpdated$.subscribe(_ => this.loadEmpresas());
  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresaService.getAll().subscribe({
      next: (res) => this.empresas = res,
      error: err => alert(err.error)
    });
  }

  onCellValueChanged(event: any) {
    const updatedData = event.data;
  
    this.empresaService.update(updatedData).subscribe({
      next: () => {},
      error: err => alert(err.error)
    });
  }
  
  deleteEmpresa(empresa: any) {
    this.empresaService.delete(empresa.id).subscribe({
      next: () => this.loadEmpresas(),
      error: err => alert(err.error)
    });
  }
}
