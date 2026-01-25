const fs = require('fs');
const path = require('path');

// Create a tiny test image if it doesn't exist
const testImagePath = path.join(__dirname, 'test-data', 'test-image.png');
if (!fs.existsSync(path.dirname(testImagePath))) {
  fs.mkdirSync(path.dirname(testImagePath), { recursive: true });
}
if (!fs.existsSync(testImagePath)) {
  const tinyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=', 'base64');
  fs.writeFileSync(testImagePath, tinyPng);
  console.log('Created test image at', testImagePath);
}

// Now test the POST endpoint
const { spawn } = require('child_process');

console.log('Starting Next.js dev server...');
const server = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

setTimeout(() => {
  console.log('Server should be ready. Testing POST /api/ministries...');

  const curl = spawn('curl.exe', [
    '-v',
    '--form', 'title=API Test Ministry',
    '--form', 'description=Testing upload via script',
    '--form', 'schedule=Sundays 9am',
    '--form', 'icon=fas fa-cross',
    '--form', 'coordinator=Test User',
    '--form', 'contactEmail=test@example.com',
    '--form', 'active=true',
    '--form', `image=@${testImagePath};type=image/png`,
    'http://localhost:3000/api/ministries'
  ], { stdio: 'inherit' });

  curl.on('close', (code) => {
    console.log('Curl exited with code', code);
    server.kill();
  });
}, 5000);