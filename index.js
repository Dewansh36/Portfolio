const express=require('express');
const path=require('path');
const app=express();
const ejsmate=require('ejs-mate');
const axios=require('axios');

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const cfData=await axios.get('https://codeforces.com/api/user.info?handles=Dewansh05');
    const cfInfo=cfData.data.result[0];
    console.log(cfInfo);

    // const ccData=await axios.get('https://competitive-coding-api.herokuapp.com/api/codechef/dewansh_36');
    // const ccInfo=ccData.data;
    // console.log(ccInfo);
    res.render('pages/home.ejs', { cfInfo });
});

app.get('/cp', (req, res) => {
    res.render('pages/cp.ejs');
});

app.get('/projects', (req, res) => {
    res.render('pages/projects.ejs');
});

app.get('*', (req, res) => {
    res.send('404 Page Not Found!');
});

const port=process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Listning on Port ${port}`);
});