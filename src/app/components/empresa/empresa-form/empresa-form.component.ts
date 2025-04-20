import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../services/empresa.service';
import { cepValidator } from '../../shared/cep-validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css'
})
export class EmpresaFormComponent {
  empresaForm: FormGroup;
  isFormVisible: boolean = false;

  constructor(private fb: FormBuilder, private empresaService: EmpresaService, private http: HttpClient) {
    this.empresaForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      cep: ['', {
        validators: [Validators.required],
        asyncValidators: [cepValidator(this.http)],
        updateOn: 'blur'
      }],
      nomeFantasia: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.empresaForm.valid) {
      console.log('Empresa:', this.empresaForm.value);
      this.empresaService.create(this.empresaForm.value).subscribe({
        next: (res) => this.empresaService.empresaUpdateSource.next(true),

      });
    } else {
      this.empresaForm.markAllAsTouched();
    }
  }

  openCloseForm() {
    this.isFormVisible = !this.isFormVisible;
  }
}
