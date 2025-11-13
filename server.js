const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('../frontend')); // serve frontend files
app.use(bodyParser.json());

let users = []; // demo: replace with DB in real project

// simple register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.json({success:false, message:'Missing fields'});
  if(users.find(u=>u.email === email)) return res.json({success:false, message:'Email already registered'});
  users.push({id: users.length+1, name, email, password}); // store hashed in real app
  return res.json({success:true, message:'Registered successfully'});
});

// simple login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if(!user) return res.json({success:false, message:'Invalid credentials'});
  // for demo, return user object; in real app issue token/session
  return res.json({success:true, message:'Login success', user});
});

// endpoints for Orders, Wishlist, Reviews (demo)
const demoData = {
  orders: [
    {id:1, items:[{name:'Book', qty:1}], total:250, status:'Delivered'}
  ],
  wishlist: [
    {id:1, name:'Wireless Mouse', price:499}
  ],
  reviews:[
    {id:1, product:'Headphones', user:'Riya', rating:4, text:'Good value'}
  ]
};

app.get('/api/user/orders', (req,res)=> res.json(demoData.orders));
app.get('/api/user/wishlist', (req,res)=> res.json(demoData.wishlist));
app.get('/api/product/reviews', (req,res)=> res.json(demoData.reviews));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));
