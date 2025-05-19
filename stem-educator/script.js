// Script provided by AI

// const fs = require('fs').promises;
// const path = require('path');

import { promises as fs } from 'fs';
import path from 'path';

async function renameFilesInCurrentDirectory() {
    try {
        // Get the current directory
        const currentDirectory = process.cwd();
        
        // Read the contents of the current directory
        const files = await fs.readdir(currentDirectory);
        
        // Loop through the files to rename them
        await Promise.all(files.map(async (file) => {
            const newFileName = file.replace(/\s+/g, '_'); // Replace whitespace with underscore
            // Only rename if the new filename is different
            if (newFileName !== file) {
                const oldFilePath = path.join(currentDirectory, file);
                const newFilePath = path.join(currentDirectory, newFileName);
                await fs.rename(oldFilePath, newFilePath); // Rename the file
                console.log(`Renamed: "${file}" to "${newFileName}"`);
            }
        }));
    } catch (err) {
        console.error('Error renaming files:', err);
    }
}

// Call the function
renameFilesInCurrentDirectory();


