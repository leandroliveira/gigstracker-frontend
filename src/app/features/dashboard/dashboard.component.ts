import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
    <h1 class="text-2xl font-semibold text-gray-900">Gigs Tracker Dashboard</h1>
    <div class="py-4">
      <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
        <p class="text-gray-500">Dashboard content goes here</p>
      </div>
    </div>
  `
})
export class DashboardComponent { }
