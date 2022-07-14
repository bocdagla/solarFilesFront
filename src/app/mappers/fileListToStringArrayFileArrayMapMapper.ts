export function fileListToStringFileArrayMapMapper(
  fileList: FileList
): Map<string, File[]> {
  const fileMap = new Map<string, File[]>();
  for (let i = 0; i < fileList.length; i++) {
    let file = fileList[i];
    if (!fileMap.has(file.webkitRelativePath)) {
      fileMap.set(file.webkitRelativePath, [file]);
    } else {
      fileMap.get(file.webkitRelativePath)?.push(file);
    }
  }
  return fileMap;
}
