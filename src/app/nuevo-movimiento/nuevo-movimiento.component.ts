import { Component, computed, input, output, signal } from '@angular/core';
import { Movimiento, TipoMovimiento } from '../movimiento';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
})
export class NuevoMovimientoComponent {
  readonly saldo = input.required<number>();
  readonly movimientoSolicitado = output<Movimiento>();

  protected readonly tipo = signal<TipoMovimiento>('Recarga');
  protected readonly montoTexto = signal('');

  private readonly monto = computed(() => {
    const texto = this.montoTexto().trim();
    if (texto === '') {
      return null;
    }
    const numero = Number(texto);
    return Number.isFinite(numero) ? Math.round(numero * 100) / 100 : NaN;
  });

  protected readonly error = computed(() => {
    const monto = this.monto();
    if (monto === null) {
      return null;
    }
    if (Number.isNaN(monto)) {
      return 'El monto debe ser un número válido.';
    }
    if (monto <= 0) {
      return 'El monto debe ser mayor a cero.';
    }
    if (this.tipo() === 'Gasto' && monto > this.saldo()) {
      return 'Saldo insuficiente para realizar el gasto.';
    }
    return null;
  });

  protected readonly formularioValido = computed(
    () => this.monto() !== null && this.error() === null,
  );

  protected actualizarTipo(valor: string): void {
    this.tipo.set(valor as TipoMovimiento);
  }

  protected actualizarMonto(valor: string): void {
    this.montoTexto.set(valor);
  }

  protected registrar(evento: Event): void {
    evento.preventDefault();
    const monto = this.monto();
    if (!this.formularioValido() || monto === null) {
      return;
    }
    this.movimientoSolicitado.emit({ tipo: this.tipo(), monto });
    this.montoTexto.set('');
  }
}
