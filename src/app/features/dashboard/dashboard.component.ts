import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { StatsCardComponent } from './stats-card/stats-card.component';
import {PieChartComponent} from '../../shared/components/pie-chart/pie-chart.component';
import {ChartData, DashboardStats} from '../../shared/models/certificate.model';
import {mockDashboardStats, mockExpiryData, mockIssuerData} from '../../shared/data/mockData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
    StatsCardComponent, // This import now correctly points to the child component
    LucideAngularModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public issuerData: ChartData[] = mockIssuerData;
  public expiryData: ChartData[] = mockExpiryData;
  public stats: DashboardStats = mockDashboardStats;

  ngOnInit(): void {
    console.log('DashboardComponent is initializing...');
    console.log('Data is available:', this.stats);
  }
}
