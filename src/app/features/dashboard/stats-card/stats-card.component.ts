import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NgClass],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() change?: string;
  @Input() changeType: 'positive' | 'negative' | 'neutral' = 'neutral';
  @Input() iconName: string = ''; // We pass the icon name as a string
  @Input() iconColor: string = 'text-gray-600';


  ngOnInit(): void {
    console.log('StatsCardComponent  is initializing...');
    console.log('change:', this.change);
    console.log('changeType:', this.changeType);
    console.log('value:', this.value);
    console.log('title:', this.title);
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
