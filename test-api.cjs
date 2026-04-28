const http = require('http');

function post(path, data) {
  return new Promise((resolve) => {
    const body = JSON.stringify(data);
    const req = http.request({
      host: 'localhost', port: 5000, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.write(body);
    req.end();
  });
}

function get(path, token) {
  return new Promise((resolve) => {
    const req = http.request({
      host: 'localhost', port: 5000, path, method: 'GET',
      headers: token ? { 'Authorization': 'Bearer ' + token } : {}
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.end();
  });
}

async function run() {
  console.log('\n--- Registering owner account ---');
  const reg = await post('/api/auth/register', {
    orgName: 'SmartFlow Systems',
    email: 'boweazy123@gmail.com',
    password: 'ChangeMe123!',
    firstName: 'Garet'
  });
  console.log(JSON.stringify(reg, null, 2));

  if (!reg.token) { console.log('Registration failed, stopping.'); return; }

  console.log('\n--- Seeding product catalog ---');
  const seed = await post('/api/products/seed', {});
  // seed needs auth - rebuild with token
  const seedAuth = await new Promise((resolve) => {
    const req = http.request({
      host: 'localhost', port: 5000, path: '/api/products/seed', method: 'POST',
      headers: { 'Authorization': 'Bearer ' + reg.token, 'Content-Type': 'application/json', 'Content-Length': 2 }
    }, res => { let b=''; res.on('data',c=>b+=c); res.on('end',()=>resolve(JSON.parse(b))); });
    req.write('{}');
    req.end();
  });
  console.log(JSON.stringify(seedAuth, null, 2));

  console.log('\n--- Fetching /api/auth/me ---');
  const me = await get('/api/auth/me', reg.token);
  console.log(JSON.stringify(me, null, 2));

  console.log('\nDone. Save your token:');
  console.log(reg.token);
}

run().catch(console.error);
