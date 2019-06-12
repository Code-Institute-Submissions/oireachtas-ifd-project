var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.oireachtas.ie/v1/debates");
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
    }
}