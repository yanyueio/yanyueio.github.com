// Time to show the spinner
function hideLoader() {
  var loader = document.getElementById("loading");
  var app_top = document.getElementById("top");
  var app_main = document.getElementById("main");
  var app_footer = document.getElementById("footer");

  loader.style.display = "none";
  app_top.style.display = "block";
  app_main.style.display = "block";
  app_footer.style.display = "block";
}

window.addEventListener('load', function () {
  setTimeout(hideLoader, 500);
}, false);