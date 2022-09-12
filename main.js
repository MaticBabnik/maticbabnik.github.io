document.body.classList.add('js');

let typewriter = document.querySelector('h1.typewriter')
let socials = [...document.querySelectorAll('.social')];
let scroll = document.querySelector('.scroll-hint')

const leetRegexArray = [
    { nr: /o/gi, normal: 'o', lr: /0/g, leet: '0' },
    { nr: /i/gi, normal: 'i', lr: /1/g, leet: '1' },
    { nr: /e/gi, normal: 'e', lr: /3/g, leet: '3' },
    { nr: /s/gi, normal: 's', lr: /5/g, leet: '5' },
    { nr: /g/gi, normal: 'g', lr: /6/g, leet: '6' },
    { nr: /t/gi, normal: 't', lr: /7/g, leet: '7' },
    { nr: /b/gi, normal: 'b', lr: /8/g, leet: '8' }
]

function makeLeet(str) {
    leetRegexArray.forEach(x => str = str.replace(x.nr, x.leet));
    return str;
}

async function delay(x) {
    return new Promise(r => setTimeout(r, x))
}

async function anim() {
    //type out the leet text
    for (let i = 0; i < typewriter.dataset.text.length; i++) {
        typewriter.innerHTML = `<span class="title-color">${makeLeet(typewriter.dataset.text.substr(0, i))}</span>_`;
        await delay(Math.random() * 20 + 100);
    }

    let text = makeLeet(typewriter.dataset.text)
    typewriter.innerHTML = `<span class="title-color">${text}</span>`;

    //"decrypt" the leet text
    for (leet of leetRegexArray) {
        text = text.replace(leet.lr, leet.normal)
        typewriter.innerHTML = `<span class="title-color">${text}</span>`;
        await delay(50);
    }
    typewriter.innerHTML = `<span class="title-color">${typewriter.dataset.text}</span>`;

    //show the links and scroll hint
    await delay(100)
    socials.forEach(x => x.classList.add('show'));
    await delay(300)
    scroll.classList.add('show');

}

anim();