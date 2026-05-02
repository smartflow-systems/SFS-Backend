const h=require('http');
  const d=JSON.stringify({orgName:'SmartFlow
  Systems',email:'boweazy123@gmail.com',password:'ChangeMe123!',firstName:'Garet'});
  const r=h.request({host:'localhost',port:5000,path:'/api/auth/register',method:'POST',headers:{'Content-Typ
  e':'application/json','Content-Length':Buffer.byteLength(d)}},res=>{let
  b='';res.on('data',c=>b+=c);res.on('end',()=>console.log(b))});
  r.write(d);r.end();