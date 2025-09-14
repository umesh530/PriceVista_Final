import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the products/360 directory if it doesn't exist
const productsDir = path.join(__dirname, '../public/products/360');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Create a simple HTML file that generates actual image files
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate 360° Images</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        canvas {
            border: 1px solid #ddd;
            border-radius: 4px;
            margin: 10px 0;
        }
        button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background: #2563eb;
        }
        button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }
        .status {
            margin: 10px 0;
            padding: 10px;
            background: #f0f9ff;
            border-radius: 4px;
            border-left: 4px solid #3b82f6;
        }
        .progress {
            width: 100%;
            height: 20px;
            background: #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .progress-bar {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>360° Image Generator</h1>
        <p>This tool generates sample 360-degree images for testing the immersive product viewer.</p>
        
        <div>
            <label for="productId">Product ID:</label>
            <input type="text" id="productId" value="laptop" style="margin-left: 10px; padding: 5px;">
        </div>
        
        <div>
            <label for="imageCount">Number of images:</label>
            <input type="number" id="imageCount" value="36" min="12" max="72" style="margin-left: 10px; padding: 5px;">
        </div>
        
        <button id="generateBtn" onclick="startGeneration()">Generate Images</button>
        <button id="downloadBtn" onclick="downloadAll()" disabled>Download All</button>
        
        <div class="progress">
            <div class="progress-bar" id="progressBar" style="width: 0%"></div>
        </div>
        
        <div class="status" id="status">Ready to generate images...</div>
        
        <canvas id="canvas" width="400" height="300"></canvas>
        
        <div id="preview"></div>
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const status = document.getElementById('status');
        const progressBar = document.getElementById('progressBar');
        const generateBtn = document.getElementById('generateBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const preview = document.getElementById('preview');
        
        let generatedImages = [];
        let currentIndex = 0;
        let totalImages = 36;
        let productId = 'laptop';
        
        function updateStatus(message) {
            status.textContent = message;
        }
        
        function updateProgress(percent) {
            progressBar.style.width = percent + '%';
        }
        
        function drawLaptop(angle) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set background
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Calculate rotation
            const rad = (angle * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            
            // Draw laptop base
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rad);
            
            // Base rectangle with perspective
            const baseWidth = 160 + Math.abs(sin) * 20;
            const baseHeight = 100;
            
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(-baseWidth/2, -baseHeight/2, baseWidth, baseHeight);
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 2;
            ctx.strokeRect(-baseWidth/2, -baseHeight/2, baseWidth, baseHeight);
            
            // Screen with perspective effect
            const screenHeight = 60 + Math.abs(cos) * 20;
            const screenWidth = 140 + Math.abs(sin) * 10;
            
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(-screenWidth/2, -80, screenWidth, screenHeight);
            ctx.strokeStyle = '#475569';
            ctx.strokeRect(-screenWidth/2, -80, screenWidth, screenHeight);
            
            // Screen content
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(-screenWidth/2 + 10, -70, screenWidth - 20, screenHeight - 20);
            
            // Keyboard
            ctx.fillStyle = '#64748b';
            const keySize = 12;
            const keySpacing = 15;
            const startX = -60;
            const startY = -30;
            
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 4; j++) {
                    ctx.fillRect(startX + i * keySpacing, startY + j * keySpacing, keySize, 8);
                }
            }
            
            // Trackpad
            ctx.fillStyle = '#94a3b8';
            ctx.fillRect(-40, 20, 80, 20);
            
            ctx.restore();
            
            // Add angle indicator
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(\`\${angle}°\`, centerX, 30);
            
            // Add product info
            ctx.fillStyle = '#475569';
            ctx.font = '14px Arial';
            ctx.fillText(\`Sample \${productId}\`, centerX, canvas.height - 20);
        }
        
        function generateImage(angle, index) {
            return new Promise((resolve) => {
                drawLaptop(angle);
                
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    generatedImages[index] = {
                        url: url,
                        angle: angle,
                        index: index + 1,
                        blob: blob
                    };
                    resolve();
                }, 'image/jpeg', 0.9);
            });
        }
        
        async function startGeneration() {
            productId = document.getElementById('productId').value || 'laptop';
            totalImages = parseInt(document.getElementById('imageCount').value) || 36;
            
            generatedImages = [];
            currentIndex = 0;
            preview.innerHTML = '';
            
            generateBtn.disabled = true;
            downloadBtn.disabled = true;
            updateStatus('Generating images...');
            updateProgress(0);
            
            const angleStep = 360 / totalImages;
            
            for (let i = 0; i < totalImages; i++) {
                const angle = i * angleStep;
                await generateImage(angle, i);
                
                currentIndex = i + 1;
                const progress = (currentIndex / totalImages) * 100;
                updateProgress(progress);
                updateStatus(\`Generated \${currentIndex}/\${totalImages} images (\${angle.toFixed(1)}°)\`);
                
                // Add preview
                if (i < 6) { // Show first 6 images as preview
                    const img = document.createElement('img');
                    img.src = generatedImages[i].url;
                    img.style.width = '80px';
                    img.style.height = '60px';
                    img.style.objectFit = 'cover';
                    img.style.margin = '5px';
                    img.style.borderRadius = '4px';
                    img.style.border = '1px solid #ddd';
                    preview.appendChild(img);
                }
                
                // Small delay to prevent browser freezing
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            updateStatus(\`Generated \${totalImages} images successfully! Click "Download All" to save them.`);
            downloadBtn.disabled = false;
            generateBtn.disabled = false;
        }
        
        function downloadAll() {
            generatedImages.forEach((image, index) => {
                const a = document.createElement('a');
                a.href = image.url;
                a.download = \`\${productId}-\${image.index}.jpg\`;
                a.click();
            });
            
            updateStatus('All images downloaded! Move them to public/products/360/ folder.');
        }
        
        // Draw initial preview
        drawLaptop(0);
    </script>
</body>
</html>
`;

const htmlPath = path.join(__dirname, 'generate-images.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log(`HTML file created at: ${htmlPath}`);
console.log('Open this file in a browser to generate the 360° images.');
console.log('The images will be automatically downloaded to your Downloads folder.');
console.log('Move them to: public/products/360/');
