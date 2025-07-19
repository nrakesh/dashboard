import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartData} from '../../models/certificate.model';

export interface PieSegment extends ChartData {
  pathData: string;
  percentage: string;
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnChanges {
  @Input() data: ChartData[] = [];
  @Input() size: number = 200;
  @Input() title?: string;

  public segments: PieSegment[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate the chart whenever the input data changes
    if (changes['data'] && this.data.length > 0) {
      this.calculateSegments();
    }
  }

  private calculateSegments(): void {
    const total = this.data.reduce((sum, item) => sum + item.value, 0);
    let cumulativeAngle = 0;
    const radius = this.size / 2 - 20;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    this.segments = this.data.map((item) => {
      const angle = (item.value / total) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      cumulativeAngle += angle;

      return {
        ...item,
        pathData,
        percentage: ((item.value / total) * 100).toFixed(1),
      };
    });
  }
}
