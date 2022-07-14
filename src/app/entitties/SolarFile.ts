export class SolarFile {
  name?: string;
  extension?: string;
  data?: File;

  constructor(file: File) {
    this.setNameAndExtensionFromFullFileName(file.name);
    this.data = file;
  }

  private setNameAndExtensionFromFullFileName(fullName: string): void {
    const splitName = fullName.split('.');
    this.name = splitName.splice(0, splitName.length - 1).join('.');
    this.extension = splitName[splitName.length - 1];
  }
}
