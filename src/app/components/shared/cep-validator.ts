import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function cepValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const cep = control.value?.replace(/\D/g, '');

    if (!cep || cep.length !== 8) {
      return of({ cepInvalido: true });
    }

    return http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      map((res: any) => {
        return res.erro ? { cepNaoEncontrado: true } : null;
      }),
      catchError(() => of({ erroApi: true }))
    );
  };
}
