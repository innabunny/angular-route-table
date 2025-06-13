import { Component, OnInit } from '@angular/core';
import { Route } from './route.model';
import { CommonModule } from '@angular/common';
import { delay, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-table.component.html',
  styleUrls: ['../app.css'],
})
export class RouteTableComponent implements OnInit {
 routes: Route[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  currentSort = {
    column: 'address' as keyof Route,
    direction: 'asc' as 'asc' | 'desc'
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.errorMessage = null;

    this.getRoutes().subscribe({
      next: (routes) => {
        this.routes = this.sortRoutes(routes);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Ошибка загрузки данных';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  private getRoutes(): Observable<Route[]> {
    const mockData: Route[] = [
      {
      uuid: '1',
      address: '192.168.1.0',
      mask: '24',
      gateway: '192.168.1.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '2',
      address: '10.0.0.0',
      mask: '8',
      gateway: '10.0.0.1',
      interface: 'Гостевая сеть',
    },
    {
      uuid: '3',
      address: '172.16.0.0',
      mask: '16',
      gateway: '172.16.0.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '4',
      address: '192.168.2.0',
      mask: '24',
      gateway: '192.168.2.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '5',
      address: '10.1.0.0',
      mask: '16',
      gateway: '10.1.0.1',
      interface: 'Домашняя сеть',
    },
    {
      uuid: '6',
      address: '172.17.0.0',
      mask: '16',
      gateway: '172.17.0.1',
      interface: 'Домашняя сеть',
    },
    {
      uuid: '7',
      address: '192.168.3.0',
      mask: '24',
      gateway: '192.168.3.1',
      interface: 'Гостевая сеть',
    },
    {
      uuid: '8',
      address: '10.2.0.0',
      mask: '16',
      gateway: '10.2.0.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '9',
      address: '172.18.0.0',
      mask: '16',
      gateway: '172.18.0.1',
      interface: 'Подключение Ethernet',
    },
    ]

    return of(mockData).pipe(
      delay(800),
      tap(() => console.log('Данные загружены'))
    );
  }

sortData(column: keyof Route) {
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { column, direction: 'asc' };
    }
    this.routes = this.sortRoutes(this.routes);
  }

  private sortRoutes(routes: Route[]): Route[] {
    return [...routes].sort((a, b) => {
      const valA = a[this.currentSort.column];
      const valB = b[this.currentSort.column];

      if (this.currentSort.column === 'address' || this.currentSort.column === 'gateway') {
        return this.compareIPs(valA, valB) * (this.currentSort.direction === 'asc' ? 1 : -1);
      }

      return String(valA).localeCompare(String(valB)) * (this.currentSort.direction === 'asc' ? 1 : -1);
    });
  }

  private compareIPs(ip1: string, ip2: string): number {
    const num1 = ip1.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
    const num2 = ip2.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
    return num1 - num2;
  }

  getSortIcon(column: keyof Route): string {
    if (this.currentSort.column !== column) return '';
    return this.currentSort.direction === 'asc' ? '↑' : '↓';
  }
}
