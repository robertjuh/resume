import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const photos = [
  { source: 'portrait', widths: [360, 720] },
  { source: 'white-shirt', widths: [480, 960] },
  { source: 'side-profile', widths: [160, 400, 800] }
];
const output = 'public/assets/profile';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const photo of photos) {
    const input = await readFile('docs/source-photos/' + photo.source + '.jpg');
    for (const width of photo.widths) {
      const result = await page.evaluate(async ({ source, width }) => {
        const image = new Image();
        image.src = source;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(width, image.naturalWidth);
        canvas.height = Math.round(image.naturalHeight * canvas.width / image.naturalWidth);
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not create image canvas.');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return { data: canvas.toDataURL('image/webp', 0.86).split(',')[1], width: canvas.width, height: canvas.height };
      }, { source: 'data:image/jpeg;base64,' + input.toString('base64'), width });
      const bytes = Buffer.from(result.data, 'base64');
      const name = photo.source + '-' + width + '.webp';
      await writeFile(output + '/' + name, bytes);
      console.log(name + ': ' + result.width + 'x' + result.height + ', ' + bytes.length + ' bytes');
    }
  }
} finally { await browser.close(); }
