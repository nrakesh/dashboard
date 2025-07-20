import {Component, inject, Inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {NGXLogger} from 'ngx-logger';
import {TruststoreServiceInterface} from '../../../shared/services/trustsore-service-interface';
import {TRUSTSTORE_SERVICE_TOKEN} from '../../../shared/services/service-factory';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NgClass],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent implements  OnInit {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() change?: string;
  @Input() changeType: 'positive' | 'negative' | 'neutral' = 'neutral';
  @Input() iconName: string = ''; // We pass the icon name as a string
  @Input() iconColor: string = 'text-gray-600';

  private logger = inject(NGXLogger);
  private truststoreService: TruststoreServiceInterface = inject(TRUSTSTORE_SERVICE_TOKEN);

  constructor() {
  }

  ngOnInit(): void {
    this.logger.debug('StatsCardComponent  is initializing...');
    this.logger.debug('change:', this.change);
    this.logger.debug('changeType:', this.changeType);
    this.logger.debug('value:', this.value);
    this.logger.debug('title:', this.title);
  }

  public get changeColor(): string {
    console.log("Called change color")
    switch (this.changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
}
