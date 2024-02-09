import type { FileEntry } from "fortigate-web-sslvpn";

export interface SerializedFileEntry {
  name: string;
  size: number;
  fullPath: string;
  isDirectory: boolean;
  lastModified: number;
}

export const serializeFiles = (files: FileEntry[]): SerializedFileEntry[] => {
  return files.map((file) => ({
    name: file.name,
    size: file.size,
    fullPath: file.path,
    isDirectory: file.type === 5,
    lastModified: file.lastModified.getTime()
  })).sort((a, b) => a.isDirectory === b.isDirectory ? a.name.localeCompare(b.name) : a.isDirectory ? -1 : 1);
};
