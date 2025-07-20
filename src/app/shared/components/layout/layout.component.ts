import {Component, Input, Output, EventEmitter, Inject, OnInit, inject} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {TRUSTSTORE_SERVICE_TOKEN} from "../../services/service-factory";
import {TruststoreServiceInterface} from "../../services/trustsore-service-interface";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() activeTab!: string;
  @Output() tabChange = new EventEmitter<string>();

  private logger = inject(NGXLogger);
  private truststoreService: TruststoreServiceInterface = inject(TRUSTSTORE_SERVICE_TOKEN);

  constructor() {}

  onTabChange(tab: string): void {
    this.logger.debug('Layout Component received tab from header:', tab);
    this.tabChange.emit(tab);
  }
  ngOnInit(): void {
    this.logger.debug('Layout Component is initializing...');
  }

}
