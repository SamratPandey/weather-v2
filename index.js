const API_KEY = "";// Enter your openweather API KEY here

// Swap between YourWeather and Search Weather
const yourWeather = document.getElementById('yourWeather');
const searchElement = document.getElementById('searchWeather');
yourWeather.addEventListener("click",function(){
    var fSection = document.getElementById("fSection");
    var sSection = document.getElementById("sSection");

    if(!fSection.classList.contains('active')){
        fSection.classList.add('active')
        fSection.classList.remove('remove')
        sSection.classList.remove('active')
        sSection.classList.add('remove')
        yourWeather.classList.add('hover')
        searchElement.classList.remove('hover')
    }else{
        sSection.classList.remove('active')
        sSection.classList.add('remove')
        searchElement.classList.remove('hover')
    }
});
searchElement.addEventListener("click",function(){
    var fSection = document.getElementById("fSection");
    var sSection = document.getElementById("sSection");
    let sectionS = document.querySelector('#sectionSecond');
    if(!sSection.classList.contains('active')){
        sSection.classList.add('active')
        sSection.classList.remove('remove')
        fSection.classList.remove('active')
        fSection.classList.add('remove')
        searchElement.classList.add('hover')
        yourWeather.classList.remove('hover')
        sectionS.classList.add('remove')

    }else{
        fSection.classList.remove('active')
        fSection.classList.add('remove')
        yourWeather.classList.remove('hover')
        sectionS.classList.add('remove') 
    }
});
//end


//search button eventListner
const searchButton = document.querySelector('#search');
searchButton.addEventListener("click",function(){
    let sectionS = document.querySelector('#sectionSecond');
    sectionS.classList.remove('remove');
});





// Get your loaction latitude and longitude
(function() {
        if( navigator.geolocation )
        {
           navigator.geolocation.getCurrentPosition( success, fail );
        }
        else
        {
           alert("Sorry, your browser does not support geolocation services.");
        }
})();
function success(position){
       document.getElementById('long').innerText = position.coords.longitude;
       document.getElementById('let').innerText = position.coords.latitude ;
};

function fail(){
        alert("Could not obtain location");
};



// Get weather data using latitude and longitude
(async function getWeatherByLetLong(){

    let lat = document.getElementById('let').innerText;
    let lon = document.getElementById('long').innerText;



    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const weatherD = await data.json();
    
    let newCity = document.querySelector('#newCity');
    newCity.textContent = `${weatherD?.name}`;
    
    let flag = document.querySelector('#nflag');
    let code = `${weatherD?.sys?.country}`;
    let codeLower = code.toLowerCase();
    let flagSrc ='https://flagcdn.com/144x108/'+ codeLower +'.png';
    flag.setAttribute('src',flagSrc)
    
    let newDetails = document.querySelector('#newDetails');
    newDetails.textContent =`${weatherD?.weather[0]?.description}`;
    
    let newImg= document.querySelector('#newImg');
    let icon = `${weatherD?.weather[0]?.icon}`;
    let url ='http://openweathermap.org/img/w/'+icon+'.png';
    newImg.setAttribute('src',url);
    
    
    let newTemp = document.querySelector('#newTemp');
    newTemp.textContent = `${weatherD?.main?.temp.toFixed(2)} C°`;
    
    let newWindSpeed = document.querySelector('.windData');
    newWindSpeed.innerText =`${weatherD?.wind?.speed} m/s`;
       
    let newHuminity = document.querySelector('.huminityData');
    newHuminity.innerText =`${weatherD?.main?.humidity}%`;
       
    let newCloud = document.querySelector('.cloudData');
    newCloud.innerText =`${weatherD?.clouds?.all}%`; 
    
    
    let yourD = document.querySelector('#yourWeather');
    if(!yourD.classList.contains('hover')){
        yourD.classList.add('hover');
        
    }
})();



//Get Weater data using city name
async function getWeatherByCity(cityName){
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    let weatherData = await data.json();

    let newCity = document.querySelector('#nCity');
    newCity.textContent = `${weatherData?.name}`;
    
    

    let flag = document.querySelector('#flag');
    let code = `${weatherData?.sys?.country}`;
    let codeLower = code.toLowerCase();
    let flagSrc ='https://flagcdn.com/144x108/'+ codeLower +'.png';
    flag.setAttribute('src',flagSrc)

    let newDetails = document.querySelector('#nDetails');
    newDetails.textContent =`${weatherData?.weather[0]?.description}`;
    
    let newImg= document.querySelector('#nImg');
    let icon = `${weatherData?.weather[0]?.icon}`;
    let url ='http://openweathermap.org/img/w/'+icon+'.png';
    newImg.setAttribute('src',url);
    
    
    let newTemp = document.querySelector('#nTemp');
    newTemp.textContent = `${weatherData?.main?.temp.toFixed(2)} C°`;
    
    let newWindSpeed = document.querySelector('.windData2');
    newWindSpeed.innerText =`${weatherData?.wind?.speed} m/s`;
       
    let newHuminity = document.querySelector('.huminityData2');
    newHuminity.innerText =`${weatherData?.main?.humidity}%`;
       
    let newCloud = document.querySelector('.cloudData2');
    newCloud.innerText =`${weatherData?.clouds?.all}%`; 
}


let btn = document.querySelector('#search');
btn.addEventListener("click",function(){ 
        let cityName = document.getElementById('city').value;
        getWeatherByCity(cityName); 
})
