type PackageName = string;
type DevDependency = boolean;
type PackagePath = string;
type Templates = 'javascript' | 'typescript' | 'react';

declare type CreatePackageDirectory = { packagePath: PackagePath };

declare type GetFileContents = {
  filePath: string;
  packageName: PackageName;
  devDependency: DevDependency;
};

declare type CreateDirectoryContents = {
  templatePath: string;
  packagePath: PackagePath;
  packageName: PackageName;
  devDependency: DevDependency;
};

declare type Questions = {
  packageName: PackageName;
  template: Templates;
  devDependency: DevDependency;
};

declare type VariablesToReplace = {
  regexp: RegExp | string;
  flags?: string;
  replacement: string;
};
