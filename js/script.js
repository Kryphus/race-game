document.addEventListener('DOMContentLoaded', () => {
    const duckGifs = ["./img/duck1.gif", "./img/duck2.gif", "./img/duck3.gif", "./img/duck4.gif", "./img/duck5.gif", "./img/duck6.gif"];

    function changeDuckGif(event) {
        const imgElement = event.target;
        const currentGif = imgElement.src.split('/').pop();
        let currentIndex = duckGifs.findIndex(gif => gif.includes(currentGif));

        currentIndex = (currentIndex + 1) % duckGifs.length;
        imgElement.src = duckGifs[currentIndex];
    }

    const ducks = document.querySelectorAll('.duckGif');
    ducks.forEach(duck => {
        duck.addEventListener('click', changeDuckGif);
    });
});

console.log('test')

var idInterval;
var v1, v2, v3;
var x1 = 0, x2 = 0, x3 = 0;

function startAnimation() {
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnStop").disabled = false;

    v1 = Math.floor(Math.random() * 20) + 5;
    v2 = Math.floor(Math.random() * 20) + 5;
    v3 = Math.floor(Math.random() * 20) + 5;
    console.log(`starting`)
    idInterval = setInterval('move_a_step()', 100);

}

function move_a_step() {

    //Check for winner
    var goal1 = document.querySelector(".track1").clientWidth;
    var goal2 = document.querySelector(".track2").clientWidth;
    var goal3 = document.querySelector(".track3").clientWidth;

    if (x1 >= goal1 && x1 == Math.max(x1, x2, x3)) {
        clearInterval(idInterval);
        alert("Winner: Monster 1");
        window.location.reload(true);
        return;
    }

    if (x2 >= goal2 && x2 == Math.max(x1, x2, x3)) {
        clearInterval(idInterval);
        alert("Winner: Monster 2");
        window.location.reload(true);
        return;
    }

    if (x3 >= goal3 && x3 == Math.max(x1, x2, x3)) {
        clearInterval(idInterval);
        alert("Winner: Monster 3");
        window.location.reload(true);
        return;
    }


    x1 += v1;
    x2 += v2;
    x3 += v3;

    document.getElementById("m1").style.paddingLeft = x1 + "px";
    document.getElementById("m2").style.paddingLeft = x2 + "px";
    document.getElementById("m3").style.paddingLeft = x3 + "px";
    console.log(`moving...`)

}

function stopAnimation() {


    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnStop").disabled = true;
    clearInterval(idInterval);
}

