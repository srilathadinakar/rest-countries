function element(tag,id,classname,text){
  let tags = document.createElement(tag);
  tags.id = id;
  tags.classList=classname;
  tags.innerHTML = text;
  return tags;
}
const container = element("div"," ","container"," ")
const h1 = element("h1","title","text-center","Restcountries Weather")
const row = element("div","", "row","")

const response = fetch("https://restcountries.com/v3.1/all");
//console.log(response)
response.then((data)=>{ data.json()
  //console.log(data);
  .then((result)=>{
    console.log(result);

    for(let i=0;i<result.length;i++){
      const col = document.createElement("div")
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4"
      col.innerHTML = `
      <div class="card h-100 ">
      <div class="card-header">
      <h5 class="card-title text-center">${result[i].name.common}</h5>
      </div>
      <div class="image">
      <img src="${result[i].flags.png}" class="card-img-top" alt="${result[i].name.common} Flag Image" />
      </div>
      <div class="card-body">
      <div class="card-text text-center">Region : ${result[i].region}</div>
      <div class="card-text text-center">Capital : ${result[i].capital}</div>
      <div class="card-text text-center">Country Code : ${result[i].ccn3}</div>
      <button class="btn btn-primary">Click for wheather</button>
      </div>
      </div>
      `;
    row.append(col)
    }

    let buttons = document.querySelectorAll("button");
    //console.log(buttons);
    buttons.forEach((btn,i)=>{
      //console.log(i)
      btn.addEventListener("click",()=>{
        let latlng = result[i].latlng;
        //console.log(latlng);
        let lat = latlng[0];
        let lng = latlng[1];

        let weather = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=8a0114e6bb4789cf5b444d69e207fe3d`
        );
        weather.then((data1)=>data1.json())
        .then((res)=>{
          //alert(result[i].name.common)
          alert(`Weather of ${result[i].name.common} is ${Math.floor(res.main.temp)}°c`)
         }) 
      })
    })

  })
})

container.append(row)
document.body.append(h1,container)