const https = require("https");
const express= require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req,res){
  res.render("home");
});
app.post('/', function (req,res){
  var today=new Date();
  var date = today.getDate()+'-0'+(today.getMonth()+1)+'-'+today.getFullYear();
  var dis=req.body.dis;
  var disid=0;
  var name="";
  if(dis=="alipdis"){
    name="Alipurduar District";
    disid=710;
  }else if(dis=="bankura"){
    name="Bankura";
    disid=711;
  }else if(dis=="basin24"){
    name="Basirhat HD (North 24 Parganas)";
    disid=712;
  }else if(dis=="birbhum"){
    name="Birbhum";
    disid=713;
  }else if(dis=="bishhd"){
    name="Bishnupur HD (Bankura)";
    disid=714;
  }else if(dis=="cooch"){
    name="Cooch Behar";
    disid=783;
  }
  else if(dis=="ddin"){
    name="Dakshin Dinajpur";
    disid=716;
  }else if(dis=="darjee"){
    name="Darjeeling";
    disid=717;
  }else if(dis=="diah"){
    name="Diamond Harbor HD (S 24 Parganas)";
    disid=718;
  }else if(dis=="ebardh"){
    name="East Bardhaman";
    disid=719;
  }else if(dis=="hoogly"){
    name="Hoogly";
    disid=720;
  }else if(dis=="howrah"){
    name="Howrah";
    disid=721;
  }else if(dis=="jalpai"){
    name="Jalpaiguri";
    disid=722;
  }else if(dis=="jhargram"){
    name="Jhargram";
    disid=723;
  }else if(dis=="kalim"){
    name="Kalimpong";
    disid=724;
  }else if(dis=="kolkata"){
    name="Kolkata";
    disid=725;
  }else if(dis=="malda"){
    name="Malda";
    disid=726;
  }else if(dis=="murshi"){
    name="Murshidabad";
    disid=727;
  }else if(dis=="nadia"){
    name="Nadia";
    disid=728;
  }else if(dis=="nandi"){
    name="Nandigram HD (East Medinipore)";
    disid=729;
  }else if(dis=="n24pgns"){
    name="North 24 Parganas";
    disid=730;
  }else if(dis=="pasmed"){
    name="Paschim Medinipore";
    disid=731;
  }else if(dis=="purmed"){
    name="Purba Medinipore";
    disid=732;
  }else if(dis=="purulia"){
    name="Purulia";
    disid=733;
  }else if(dis=="rampu"){
    name="Rampurhat HD (Birbhum)";
    disid=734;
  }else if(dis=="s24pgns"){
    name="South 24 Parganas";
    disid=735;
  }else if(dis=="udin"){
    name="Uttar Dinajpur";
    disid=736;
  }else if(dis=="wbardh"){
    name="West Bardhaman";
    disid=737;
  }
    const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+disid+"&date="+date;
    fetch(url)
      .then(res=>res.json())
      .then((out)=>{
        var data = out;
        var count=0;
        data.centers.forEach(function(item){
          item.sessions.forEach(function(sess){
            if(sess.available_capacity>0){
              count=count+1;
            }
          });
        });
        if(count==0){
          res.render("noslots",{title:name});
        }else{
          res.render("index",{data:data.centers,title:name});
        }

      }).catch(err => console.error(err));


});

app.listen(3000, function (){
  console.log("The server is running on port 3000");
});
