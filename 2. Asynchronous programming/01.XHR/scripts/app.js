function loadRepos() {
   let div = document.getElementById("res");
   let httpRequest = new XMLHttpRequest();
   httpRequest.addEventListener('readystatechange', handler);
   let url = 'https://api.github.com/users/testnakov/repos';
  function handler() {
      if(httpRequest.readyState == 4 && httpRequest.status == 200) {
         div.textContent =httpRequest.responseText;
      }
   }
   httpRequest.open("GET",url);
   httpRequest.send();
}