import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[upload]',
})
export class UploadDirective {
  @Output() onHover: EventEmitter<boolean> = new EventEmitter();
  @Output() onFileDropped: EventEmitter<File> = new EventEmitter();
  // 3 eventos
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    this.onHover.emit(true);
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    event.preventDefault();
    this.onHover.emit(false);
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    this.onHover.emit(false);
    // suelta el archivo
    const files = event.dataTransfer.files;
    const fileSelected: File = files[0];
    this.onFileDropped.emit(fileSelected);
  }
}
