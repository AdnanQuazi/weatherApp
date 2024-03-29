const currentDate = document.querySelector('#date');
const weatherIcon = document.querySelector('weathericon');
const cityName = document.querySelector('#inp');
const btn = document.querySelector('#submit-btn');
const temp = document.querySelector('.temp');
const locationUsed = document.querySelector('.location');
const quote = document.querySelector('.quote');

let tempStatus = "Clouds";
let weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

let month = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
let currentTime = "";
let currentMonth = "";
let todayDate = "";
let hours = "";
let min = "";
 let getTime = ()=>{
     currentTime = new Date();
     currentMonth =  currentTime.getMonth();
     todayDate = currentTime.getDate();
     hours = currentTime.getHours();
     min = currentTime.getMinutes();

    if(min < '10'){
        min = "0" + min;

    }}
    
const getCurrentDay = () => {
    getTime();
    currentDate.innerHTML = `${weekday[currentTime.getDay()]}  |  ${month[currentMonth]} ${todayDate} | ${hours}:${min}`;
   
}

getCurrentDay();

let city_Name = "";
const getInfo = async()=>{
   
    if(cityName.value == ""){
        city_Name = "Pune"
    }else{
       city_Name = cityName.value;
    }
    if(city_Name == ""){
        alert('Please Write correct city Name');
        quote.classList.remove('hidden');
    }else{
      try{ 

        quote.classList.add('hidden'); 
        temp.classList.add('animation');
        temp.innerHTML = "Loading..."; 
        locationUsed.innerText = "Loading...";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_Name}&appid=f3efe161ff0aa76b321eba4d11a14c3a`;
        const res = await fetch(url);
        const data = await res.json();
        const arr = [data];
        temp.classList.remove('animation');
        temp.innerHTML = (arr[0].main.temp -273.15).toFixed(2) + "°C";
        locationUsed.innerText = `${arr[0].name},${arr[0].sys.country}`;

    }catch{
         
    }
    }
}

btn.addEventListener('click', getInfo);
getInfo();
setInterval(() => {
    getCurrentDay();
},20000);