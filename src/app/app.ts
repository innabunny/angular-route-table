import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteTableComponent } from './route-table/route-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouteTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'route-table';
}
