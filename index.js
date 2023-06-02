const express = require("express");
const db = require("./connection");
const exphbs = require("express-handlebars");
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post("/employee", (req, res) => {
  console.log(req.body)
  const user = {
    name: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
  };
  let sql = "INSERT INTO `user` SET?";
  db.query(sql, user, (err, result) => {
    if (err) console.log(err)
    else
    res.redirect('employee')
    
  });
});

app.get("/employee",(req,res)=>{
  let sql = "SELECT * FROM `user`"
  db.query(sql, (err, result) => {
    if (err) console.log(err)
    else
   res.render('show',{data:result})
   })
})

app.get("/add-emp", (req, res) => {
  res.render("home");
});

app.get("/del/:id",(req,res)=>{
  let sql = "DELETE FROM `user` Where id = "+req.params.id
  db.query(sql,(err,result)=>{
    if(err) console.log(err)
    else
    res.redirect('/employee')
  })
})

app.get('/update/:id',(req,res)=>{
  let sql = "SELECT * FROM `user` WHERE id = "+req.params.id
  db.query(sql,(err,result)=>{
    if(err)console.log(err)
    else
    res.render('update',{data:result[0],id:req.params.id})
  })
 
})

app.post('/finalupdate',(req,res)=>{
let name = req.body.fullName
let email = req.body.email
let phone = req.body.phone
let city = req.body.city
let sql = `UPDATE user SET name='${name}',email='${email}',phone='${phone}',city='${city}' where id=${req.body.eid}`
db.query(sql,(err,result)=>{
  if(err) console.log(err)
  else{
    res.redirect('/employee')
  }
})
})

app.listen(4000, () => console.log("Server is running"));
