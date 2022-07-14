import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  directoryReader: FileSystemDirectoryEntry;
  constructor() {
    this.directoryReader = new FileSystemDirectoryEntry();
   }

  getDirectory(file: File): void {
    this.directoryReader.getDirectory(file.webkitRelativePath);
  }
}
