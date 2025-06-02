
window.onload = () => {
  if (localStorage.getItem("locationGranted") === "true") {
    requestLocation();
  } else {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("locationAlert").style.display = "block";
  }
};

function requestLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    localStorage.setItem("locationGranted", "true");
    document.getElementById("overlay").style.display = "none";
    document.getElementById("locationAlert").style.display = "none";
    getLocation(pos);
  }, () => {
    alert("❌ Joylashuvga ruxsat berilmadi.");
  });
}

function getLocation(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  fetch(`https://api.weatherapi.com/v1/current.json?key=30542e8a87364944b29141639252105&q=${lat},${lon}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("temperature").innerText = Math.round(data.current.temp_c) + "°";
    });

  fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2&school=1`)
    .then(res => res.json())
    .then(data => {
      const times = data.data.timings;
      const list = document.getElementById("prayerList").getElementsByClassName("time");
      list[0].innerText = times.Fajr;
      list[1].innerText = times.Dhuhr;
      list[2].innerText = times.Asr;
      list[3].innerText = times.Maghrib;
      list[4].innerText = times.Isha;
    });
}
