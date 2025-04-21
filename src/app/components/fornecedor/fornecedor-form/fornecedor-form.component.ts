import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedorService } from '../../../services/fornecedor.service';
import { cepValidator } from '../../shared/cep-validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.css'
})
export class FornecedorFormComponent {
  fornecedorForm: FormGroup;
  isFormVisible: boolean = false;

  constructor(private fb: FormBuilder, private fornecedorService: FornecedorService, private http: HttpClient) {
    this.fornecedorForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', {
        validators: [Validators.required],
        asyncValidators: [cepValidator(this.http)],
        updateOn: 'blur'
      }],
      tipo: ['JURIDICA', Validators.required],
      documento: ['', [Validators.required, Validators.maxLength(14)]],
      rg: [''],
      dataNascimento: ['']
    });

    this.configureTipoWatcher();
  }

  openCloseForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit() {
    if (this.fornecedorForm.valid) {
      const fornecedorData = this.fornecedorForm.value;
      this.fornecedorService.create(fornecedorData).subscribe({
        next: (res) => this.fornecedorService.fornecedorUpdateSource.next(true),
        error: err => alert(err.error)
      })
    } else {
      this.fornecedorForm.markAllAsTouched();
    }
  }

  isPessoaFisica(): boolean {
    return this.fornecedorForm.get('tipo')?.value === 'FISICA';
  }

  private configureTipoWatcher() {
    this.fornecedorForm.get('tipo')?.valueChanges.subscribe(tipo => {
      const rgControl = this.fornecedorForm.get('rg');
      const dataNascimentoControl = this.fornecedorForm.get('dataNascimento');

      if (tipo === 'FISICA') {
        rgControl?.setValidators([Validators.maxLength(7)]);
        dataNascimentoControl?.setValidators([Validators.required]);
      } else {
        rgControl?.clearValidators();
        dataNascimentoControl?.clearValidators();
      }

      rgControl?.updateValueAndValidity();
      dataNascimentoControl?.updateValueAndValidity();
    });
  }
}
