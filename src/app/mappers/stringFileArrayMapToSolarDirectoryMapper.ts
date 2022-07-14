import { SolarDirectory } from '../entitties/SolarDirectory';
import { SolarFile } from '../entitties/SolarFile';

export function stringFileArrayMapToSolarDirectoryMapper(
  fileMap: Map<string, File[]>,
  rootDirectoryName: string
): SolarDirectory {
  let rootDirectory = new SolarDirectory(rootDirectoryName);
  let auxDirectory: SolarDirectory;
  fileMap.forEach((files, path) => {
    let currentDirectory = rootDirectory;
    path
      .split('/')
      .slice(0, -1)
      .forEach((directory) => {
        if (currentDirectory.containsDirectory(directory)) {
          auxDirectory =
            currentDirectory.getDirectory(directory) ?? rootDirectory;
        } else {
          auxDirectory = new SolarDirectory(directory);
          currentDirectory.directoryChildren.push(auxDirectory);
        }
        currentDirectory = auxDirectory;
      });
    files.forEach((f) => currentDirectory.fileChildren.push(new SolarFile(f)));
  });
  return rootDirectory;
}
