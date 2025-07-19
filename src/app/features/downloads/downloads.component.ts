import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import { HttpClientModule } from '@angular/common/http';

// Define the type for download formats, similar to the original shared type
type DownloadFormat = 'jks' | 'pkcs12' | 'pem';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HttpClientModule],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {
  selectedFormat = signal<DownloadFormat>('jks');
  isDownloading = signal(false);
  today = new Date();

  formats = [
    {
      id: 'jks' as DownloadFormat,
      name: 'Java KeyStore (JKS)',
      description: 'Standard Java keystore format for Java applications',
      icon: 'package',
      extension: '.jks',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      id: 'pkcs12' as DownloadFormat,
      name: 'PKCS#12',
      description: 'Industry standard format supported by most applications',
      icon: 'lock',
      extension: '.p12',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'pem' as DownloadFormat,
      name: 'PEM Bundle',
      description: 'Text-based format with concatenated certificates',
      icon: 'file-text',
      extension: '.pem',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  setSelectedFormat(format: DownloadFormat) {
    this.selectedFormat.set(format);
  }
  getSelectedFormatName(): string | undefined {
    return this.formats.find(f => f.id === this.selectedFormat())?.name;
  }


  async handleDownload() {
    this.isDownloading.set(true);

    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real application, this would trigger the actual file download
    const timestamp = new Date().toISOString().split('T')[0];
    const extension = this.formats.find(f => f.id === this.selectedFormat())?.extension;
    const filename = `truststore-${timestamp}${extension}`;

    // Create a mock download link
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Mock ${this.selectedFormat().toUpperCase()} truststore file`));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    this.isDownloading.set(false);
  }
}
