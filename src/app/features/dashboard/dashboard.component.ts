import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { StatsCardComponent } from './stats-card/stats-card.component';
import {PieChartComponent} from '../../shared/components/pie-chart/pie-chart.component';
import {ChartData, DashboardStats} from '../../shared/models/certificate.model';
import {mockDashboardStats, mockExpiryData, mockIssuerData} from '../../shared/data/mockData';
import {TRUSTSTORE_SERVICE_TOKEN} from '../../shared/services/service-factory';
import {TruststoreServiceInterface} from '../../shared/services/trustsore-service-interface';
import {NGXLogger} from 'ngx-logger';

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


  constructor(
    @Inject(TRUSTSTORE_SERVICE_TOKEN) private truststoreService:TruststoreServiceInterface,
    private logger: NGXLogger
  ) {
  }

  ngOnInit(): void {
    this.logger.info('DashboardComponent is initializing...');
    this.logger.debug('Data is available:', this.stats);
    let ack = this.truststoreService.ping()
    this.logger.debug("ping-->" + ack);
  }
}
