import * as fs from 'fs';
import ProgressBar from 'progress';

export function convertImageToBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const stats = fs.statSync(imagePath); // get the filesize
        const bar = new ProgressBar('Converting [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: stats.size,
        });

        let bitmapData = '';
        const stream = fs.createReadStream(imagePath);

        stream.on('data', (chunk) => {
            bitmapData += chunk;
            bar.tick(chunk.length); // update progress bar
        });

        stream.on('end', () => {
            const base64Image = Buffer.from(bitmapData).toString('base64');
            resolve(base64Image);
        });

        stream.on('error', (error) => {
            console.error(`Error reading file: ${error}`);
            reject(error);
        });
    });
}
