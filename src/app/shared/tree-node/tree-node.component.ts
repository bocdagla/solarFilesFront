import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SolarDirectory } from 'src/app/entitties/SolarDirectory';
import { SolarFile } from 'src/app/entitties/SolarFile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent implements OnInit {
  @Input() nodeData!: SolarDirectory;
  suportedExtensions = environment.suportedExtensions;
  contentIsShown = false;

  constructor() {}

  ngOnInit(): void {}

  toogleContents(): void {
    this.contentIsShown = !this.contentIsShown;
  }

  previewFile(fileData: File | undefined): void {
    if (fileData) window.open(URL.createObjectURL(fileData as Blob));
  }

  hasPreviewSupport(fileData: SolarFile): boolean {
    if(!this.suportedExtensions) return false;
    return (this.suportedExtensions).includes(fileData.extension ?? '');

  }
}

@NgModule({
  imports: [CommonModule, MatIconModule],
  exports: [TreeNodeComponent],
  declarations: [TreeNodeComponent],
  providers: [],
})
export class TreeNodeModule {}
