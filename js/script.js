const imgs = document.querySelectorAll('.hands img');
const hands = document.querySelector('.hands');
const area = document.querySelector('.options');
const replay = document.querySelector('#replay');
const result = document.querySelector('#result');
const res = document.querySelector('#res');
const win = document.querySelector('#win');
const lost = document.querySelector('#lost');
const draw = document.querySelector('#draw');

let clicked = false;
let s, el, bot, offs, msg, w = 0, d = 0, l = 0;

let first = (localStorage.getItem("first") === null) ? true : localStorage.getItem("first");
if (first == true) {
    setTimeout(() => {
        if (first) {
            window.onload = whenOnload();
            localStorage.setItem('first', 'false');
        }
    }, 5300);
}
else {
    whenOnload();
}
function whenOnload() {
    console.log("Loaded");
    document.querySelector(".preload-cont").style.display = "none";
    document.querySelector("body").style.overflow = "visible";
}

replay.addEventListener('click', () => {
    area.removeChild(bot);
    area.removeChild(el);
    result.style.zIndex = '-1';
    result.style.opacity = '0';
    clicked = false;
    anime({
        targets: hands,
        duration: 300,
        opacity: 1,
        easing: 'easeInOutCubic'
    });
})
window.onresize = () => {
    scaleFixer();
};
function scaleFixer() {
    if (window.innerWidth < 350) {
        s = 0.65;
        offs = -15;
    }
    else if (window.innerWidth > 420) {
        s = 0.9;
        offs = -50
    }
    else {
        s = 0.7;
        offs = -20;
    }
}
scaleFixer();
imgs.forEach(i => {
    i.addEventListener('click', () => {
        if (!clicked) {
            el = i.cloneNode(true);
            let rand = Math.floor(Math.random() * 3);
            bot = imgs[rand].cloneNode(true);
            el.className = 'user-ch';
            bot.className = 'bot-ch';
            area.appendChild(el);
            area.appendChild(bot);
            fromLeft(el);
            fromRight(bot);
            checkWinner(el, bot);
            showRes();
            if (clicked) {
                clicked = false;
            }
            else {
                clicked = true;
            }
            anime({
                targets: hands,
                duration: 0,
                opacity: 0,
                easing: 'easeInOutCubic'
            });
        }
    });
});


function fromLeft(e) {
    anime({
        targets: e,
        translateX: [0, -50, -offs],
        translateY: -60,
        duration: 2000,
        opacity: [0, 1],
        rotate: [0, 90],
        scale: s,
        easing: 'easeInOutCubic'
    });
}


function fromRight(e) {
    anime({
        targets: e,
        translateX: [260, offs],
        translateY: -60,
        duration: 1800,
        rotate: -90,
        opacity: [0, 1],
        scale: s,
        easing: 'easeInQuad',
        rotateY: 180
    });
}

function showRes() {
    setTimeout(() => {
        result.style.zIndex = '1';
        res.innerHTML = msg;
        win.innerHTML = w;
        lost.innerHTML = l;
        draw.innerHTML = d;
        anime({
            targets: result,
            opacity: 1,
            duration: 200,
            easing: 'easeInQuad'
        });
    }, 1800);
}
function checkWinner(a, b) {
    if (a.alt == 'paper') {
        if (b.alt == 'rock') {
            console.log('W: P and R')
            msg = 'You Won';
            w++;
        }
        else if (b.alt == 'scissors') {
            msg = "You Lost";
            console.log('L: P and S')
            l++;
        }
        else {
            msg = "Draw";
            console.log('S: P and P')
            d++;
        }
    }
    else if (a.alt == 'rock') {
        if (b.alt == 'rock') {
            console.log('D: R and R')
            msg = 'Draw';
            w = d++;
        }
        else if (b.alt == 'scissors') {
            console.log('W: R and S')
            msg = "You Won";
            w++;
        }
        else {
            console.log('L: R and P')
            msg = "You Lost";
            l++;
        }
    }
    else if (a.alt == 'scissors') {
        if (b.alt == 'rock') {
            console.log('L: S and R')
            msg = 'You Lost';
            l++;
        }
        else if (b.alt == 'scissors') {
            console.log('D: S and S')
            msg = "Draw";
            d++;
        }
        else {
            console.log('W: S and P')
            msg = "You Won";
            w++;
        }
    }
}