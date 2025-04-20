import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor';
import { FornecedorService } from '../../../services/fornecedor.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FornecedorFormComponent } from '../fornecedor-form/fornecedor-form.component';
import { DeleteButtonRendererComponent } from '../../shared/delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FornecedorFormComponent],
  templateUrl: "./fornecedor-list.component.html",
  styleUrl: './fornecedor-list.component.css'
})
export class FornecedorListComponent implements OnInit {

  columnDefs: any[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'nome', headerName: 'Nome' },
    { field: 'email', headerName: 'Email' },
    { field: 'cep', headerName: 'CEP', hide: false },
    {
      field: 'tipo',
      headerName: 'Tipo',
      valueFormatter: (params: any) => {
        return params.value === 'FISICA' ? 'Pessoa Física' : 'Pessoa Jurídica';
      }
    },
    {
      field: 'documento',
      headerName: 'CPF/CNPJ',
    },
    {
      field: 'rg',
      headerName: 'RG',
    },
    {
      field: 'dataNascimento',
      headerName: 'Data de Nascimento',
      valueFormatter: (params: any) => {
        return params.value ? new Date(params.value).toLocaleDateString('pt-BR') : '-';
      }
    },
    {
      headerName: "Ações",
      cellRenderer: DeleteButtonRendererComponent,
      cellRendererParams: {
        delete: (data: any) => this.deleteFornecedor(data)
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

  fornecedores: Fornecedor[] = [];

  constructor(private fornecedorService: FornecedorService) {
    fornecedorService.fornecedorUpdated$.subscribe(_ => this.loadFornecedores());
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores() {
    this.fornecedorService.getAll().subscribe({
      next: (res) => this.fornecedores = res,
      error: (err) => console.error('Erro ao carregar fornecedores:', err)
    });
  }

  deleteFornecedor(fornecedor: any) {
    this.fornecedorService.delete(fornecedor.id).subscribe({
      next: () => {
        this.loadFornecedores();
      },
      error: err => {
        console.error('Erro ao deletar fornecedor:', err);
        alert('Erro ao deletar fornecedor!');
      }
    });
  }

  onCellValueChanged(event: any) {
    const updatedData = event.data;

    this.fornecedorService.update(updatedData).subscribe({
      next: () => {
        console.log('Fornecedor atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar Fornecedor:', err);
        alert('Erro ao atualizar Fornecedor!');
      }
    });
  }

}
