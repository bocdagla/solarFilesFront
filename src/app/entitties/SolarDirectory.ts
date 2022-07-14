import { SolarFile } from './SolarFile';

export class SolarDirectory {
  name: string;
  directoryChildren: SolarDirectory[];
  fileChildren: SolarFile[];

  constructor(name: string) {
    this.name = name;
    this.directoryChildren = [];
    this.fileChildren = [];
  }

  getDirectory(directory: string): SolarDirectory | undefined {
    return this.directoryChildren?.find((d) => d.name === directory);
  }

  containsDirectory(directory: string): boolean {
    return this.directoryChildren?.find((d) => d.name === directory)
      ? true
      : false;
  }

  countChildren(): number {
    return this.fileChildren.length + this.directoryChildren.length;
  }
}
