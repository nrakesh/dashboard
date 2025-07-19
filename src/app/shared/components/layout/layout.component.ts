import { Component, Input, Output, EventEmitter } from '@angular/core';
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() activeTab!: string;
  @Output() tabChange = new EventEmitter<string>();

  onTabChange(tab: string): void {
    console.log('Layout Component received tab from header:', tab);
    this.tabChange.emit(tab);
  }
  ngOnInit(): void {
    console.log('Layout Component is initializing...');
  }

}
