export interface  PackageInfo {
  name?: string;
  version?: string;
  [v: string]: string | undefined | Dependency;
}

export interface Dependency{
  name: string;
  version: string;
  dependencies ?:  PackageInfo | string;
}