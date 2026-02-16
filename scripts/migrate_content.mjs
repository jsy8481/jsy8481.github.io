
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

function migrateFiles(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        // Skip hidden files like .DS_Store
        if (file.startsWith('.')) return;

        const filePath = path.join(dir, file);

        try {
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                migrateFiles(filePath);
            } else if (file.endsWith('.md')) {
                const content = fs.readFileSync(filePath, 'utf8');
                const lines = content.split('\n');

                let title = 'Untitled';
                let description = 'Guide documentation';
                const date = new Date().toISOString().split('T')[0];

                // Extract title from H1
                if (lines[0].startsWith('# ')) {
                    title = lines[0].replace('# ', '').trim();
                    lines.shift(); // Remove H1 line
                }

                // Try to find a description (first non-empty line after title)
                for (const line of lines) {
                    if (line.trim().length > 0 && !line.startsWith('#') && !line.startsWith('![')) {
                        description = line.trim().substring(0, 150) + (line.length > 150 ? '...' : '');
                        break;
                    }
                }

                // Escape quotes in title and description
                title = title.replace(/"/g, '\\"');
                description = description.replace(/"/g, '\\"');

                const newContent = `---
title: "${title}"
description: "${description}"
date: "${date}"
---

${lines.join('\n').trim()}
`;

                // Clean up filename
                let newFilename = file.replace('.md', '.mdx');
                // Remove prefixes like [drizzle]- and numbers if desired, but let's keep numbers for ordering
                newFilename = newFilename.replace(/^\[.*?\]-/, '');

                const newFilePath = path.join(dir, newFilename);

                fs.writeFileSync(newFilePath, newContent);

                if (filePath !== newFilePath) {
                    fs.unlinkSync(filePath);
                }

                console.log(`Migrated: ${file} -> ${newFilename}`);
            }
        } catch (error) {
            console.error(`Error processing ${filePath}:`, error.message);
        }
    });
}

migrateFiles(contentDir);
