fetch ("https://api.open-meteo.com/v1/forecast?latitude=18.96&longitude=72.83&hourly=temperature_2m,wind_speed_10m&forecast_days=1")
.then (response => response.json())
.then (data => {console.log(data);} )
