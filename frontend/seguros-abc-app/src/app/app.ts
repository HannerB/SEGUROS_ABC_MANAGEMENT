import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaAsegurados } from './components/lista-asegurados/lista-asegurados';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaAsegurados],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Sistema de Gestión de Asegurados - SEGUROS ABC';
}
