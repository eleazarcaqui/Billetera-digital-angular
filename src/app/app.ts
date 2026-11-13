import { Component } from '@angular/core';
import { BilleteraComponent } from './billetera/billetera.component';

@Component({
  selector: 'app-root',
  imports: [BilleteraComponent],
  template: `
    <header class="bg-dark text-white py-3 mb-4">
      <div class="container">
        <h1 class="h5 mb-0 fw-semibold">Mi Billetera Digital</h1>
      </div>
    </header>
    <main class="container pb-5">
      <app-billetera />
    </main>
  `,
})
export class App {}
