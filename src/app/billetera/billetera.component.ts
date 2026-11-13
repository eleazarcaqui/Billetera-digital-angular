import { Component, signal } from '@angular/core';
import { Movimiento } from '../movimiento';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';

@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.component.html',
})
export class BilleteraComponent {
  protected readonly saldo = signal(250);
  protected readonly movimientos = signal<Movimiento[]>([]);

  protected registrar(movimiento: Movimiento): void {
    const variacion = movimiento.tipo === 'Recarga' ? movimiento.monto : -movimiento.monto;
    this.saldo.update((actual) => Math.round((actual + variacion) * 100) / 100);
    this.movimientos.update((lista) => [movimiento, ...lista]);
  }
}
