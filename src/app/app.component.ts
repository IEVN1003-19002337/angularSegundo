import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZodiacoComponent } from './formularios/zodiaco/zodiaco.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZodiacoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
