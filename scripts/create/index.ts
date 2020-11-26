/// <reference path="./create.d.ts" />

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const PATHS = {
  packages: path.join(process.cwd(), 'packages'),
  templates: path.join(__dirname, 'templates')
};

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'Select package template:',
    choices: fs.readdirSync(PATHS.templates)
  },
  {
    name: 'packageName',
    type: 'input',
    message: 'Package name:',
    validate: (input: string) => {
      if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
      return 'Package name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'devDependency',
    type: 'confirm',
    message: 'Is it a devDependency?'
  }
];

// Create package directory
const createPackageDirectory = ({ packagePath }: CreatePackageDirectory) => {
  if (fs.existsSync(packagePath)) {
    console.log(`Directory ${packagePath} exists. Delete or use another name.`);
    return false;
  }

  fs.mkdirSync(packagePath, { recursive: true });
  return true;
};

// Get file contents
const getFileContents = ({
  filePath,
  packageName,
  devDependency
}: GetFileContents) => {
  let readFile = fs.readFileSync(filePath, 'utf8');
  const variablesToReplace: VariablesToReplace[] = [
    {
      regexp: '{{package-name}}',
      replacement: packageName
    },
    {
      regexp: '{{package-dev}}',
      replacement: devDependency ? ' -D' : ''
    },
    {
      regexp: '../../../../',
      replacement: '../../'
    }
  ];

  // Loop through variables replace them
  variablesToReplace.forEach(({ regexp, replacement, flags = 'g' }) => {
    readFile = readFile.replace(new RegExp(regexp, flags), replacement);
  });

  return readFile;
};

// Create directory contents
const createDirectoryContents = ({
  templatePath,
  packagePath,
  packageName,
  devDependency
}: CreateDirectoryContents) => {
  const filesToCreate = fs.readdirSync(templatePath);

  // Loop through template files
  filesToCreate.forEach((file: string) => {
    const filePath = path.join(templatePath, file);
    const fileStats = fs.statSync(filePath);

    // Write file
    if (fileStats.isFile()) {
      const contents = getFileContents({
        filePath,
        packageName,
        devDependency
      });
      const writePath = path.join(packagePath, file);
      fs.writeFileSync(writePath, contents, 'utf8');
      return;
    }

    // Read directory
    if (fileStats.isDirectory()) {
      const directoryPath = path.join(packagePath, file);
      fs.mkdirSync(directoryPath, { recursive: true });

      // Create directory contents
      createDirectoryContents({
        templatePath: path.join(templatePath, file),
        packagePath: directoryPath,
        packageName,
        devDependency
      });
    }
  });
};

// Ask questions
inquirer
  .prompt(QUESTIONS)
  .then(({ packageName, template, devDependency }: Questions) => {
    const packagePath = path.join(PATHS.packages, packageName);
    const templatePath = path.join(PATHS.templates, template);

    // Return if the directory exists
    if (!createPackageDirectory({ packagePath })) {
      return;
    }

    // Create contents inside the directory
    createDirectoryContents({
      templatePath,
      packagePath,
      packageName,
      devDependency
    });
  });

// Because '--isolatedModules' flag is provided
export {};
