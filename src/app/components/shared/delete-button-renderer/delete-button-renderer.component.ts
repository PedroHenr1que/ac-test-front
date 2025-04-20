import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-renderer',
  standalone: true,
  template: `<button (click)="buttonClicked()">Excluir</button>`,
  styles: [`
    button {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #c0392b;
    }
  `]
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp{
  params: any;

  agInit(params: any): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  buttonClicked() {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.params.delete(this.params.data);
    }
  }
}
