const http = require('http');

function post(path, data, token) {
  return new Promise((resolve) => {
    const body = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const req = http.request({ host: 'localhost', port: 5000, path, method: 'POST', headers }, res => {
      let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b)));
    });
    req.write(body); req.end();
  });
}

function get(path, token) {
  return new Promise((resolve) => {
    const headers = token ? { 'Authorization': 'Bearer ' + token } : {};
    const req = http.request({ host: 'localhost', port: 5000, path, method: 'GET', headers }, res => {
      let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b)));
    });
    req.end();
  });
}

async function run() {
  let token;

  console.log('\n--- Login (account already exists) ---');
  const login = await post('/api/auth/login', { email: 'boweazy123@gmail.com', password: 'ChangeMe123!' });
  console.log(JSON.stringify(login, null, 2));

  if (login.token) {
    token = login.token;
  } else {
    console.log('\n--- Login failed, trying register ---');
    const reg = await post('/api/auth/register', {
      orgName: 'SmartFlow Systems', email: 'boweazy123@gmail.com',
      password: 'ChangeMe123!', firstName: 'Garet'
    });
    console.log(JSON.stringify(reg, null, 2));
    if (!reg.token) { console.log('Both failed. Check server logs.'); return; }
    token = reg.token;
  }

  console.log('\n--- /api/auth/me ---');
  const me = await get('/api/auth/me', token);
  console.log(JSON.stringify(me, null, 2));

  console.log('\n--- Seeding product catalog ---');
  const seed = await post('/api/products/seed', {}, token);
  console.log(JSON.stringify(seed, null, 2));

  console.log('\n--- Your products ---');
  const mine = await get('/api/products/mine', token);
  console.log(JSON.stringify(mine, null, 2));

  console.log('\n=== SFS-Backend is live! Token: ===');
  console.log(token);
}

run().catch(console.error);
