import {
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SolarDirectory } from 'src/app/entitties/SolarDirectory';
import { fileListToStringFileArrayMapMapper } from 'src/app/mappers/fileListToStringArrayFileArrayMapMapper';
import { stringFileArrayMapToSolarDirectoryMapper } from 'src/app/mappers/stringFileArrayMapToSolarDirectoryMapper';
import { TreeNodeModule } from 'src/app/shared/tree-node/tree-node.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  @ViewChild('fileSelector') fileSelector!: ElementRef<HTMLInputElement>;
  selectedFileDataRaw$!: Observable<FileList|null>;
  selectedFileData$: Subject<SolarDirectory> = new Subject();
  emptyListFiles = false;
  suportedExtensions!: string[];
  constructor(fileInput: ElementRef) {
    this.fileSelector = fileInput;
  }

  ngOnInit(): void {
    this.suportedExtensions = environment.suportedExtensions;
    this.fileSelector.nativeElement.onchange = (e) => {
      const fileList = this.fileSelector.nativeElement?.files;
      if(!fileList || fileList.length === 0) {
        this.emptyListFiles = true;
        return;
      }
      const fileMap = fileListToStringFileArrayMapMapper(fileList as FileList);
      const rootDirectory = stringFileArrayMapToSolarDirectoryMapper(fileMap, '/root/');
      this.selectedFileData$.next(rootDirectory);
    };
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    TreeNodeModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: LandingPageComponent }]),
  ],
  exports: [],
  declarations: [LandingPageComponent],
  providers: [],
})
export class LandingPageModule {}
