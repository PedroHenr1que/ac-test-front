import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor';
import { Empresa } from '../../../models/empresa';
import { FornecedorService } from '../../../services/fornecedor.service';
import { EmpresaService } from '../../../services/empresa.service';
import { EmpresaFornecedorService } from '../../../services/empresa-fornecedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresa-fornecedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa-fornecedor-form.component.html',
  styleUrl: './empresa-fornecedor-form.component.css'
})
export class EmpresaFornecedorFormComponent implements OnInit{

  empresas: Empresa[] = [];
  fornecedores: Fornecedor[] = [];

  isFormVisible: Boolean = false;

  selectedEmpresaId!: number;
  selectedFornecedorId!: number;

  constructor(private fornecedorService: FornecedorService,
    private empresaService: EmpresaService,
    private empresaFornecedorService: EmpresaFornecedorService
  ) {}

  ngOnInit(): void {
    this.empresaService.getAll().subscribe({
      next: (res) => this.empresas = res,
      error: err => alert(err.error)
    });
    this.fornecedorService.getAll().subscribe({
      next: (res) => this.fornecedores = res,
      error: err => alert(err.error)
    });
  }

  openCloseForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit() {
    this.empresaFornecedorService.save(this.selectedEmpresaId, this.selectedFornecedorId).subscribe({
      next: (res) => this.empresaFornecedorService.empresaFornecedorUpdateSource.next(true),
      error: err => alert(err.error)
    })
  }
}
