const NEWS_API = "https://blog.babnik.io",
    NEWS_KEY = "eecf82821bb710e6dd0b947bc7";

document.body.classList.add("js");

const typewriter = document.querySelector("h1.typewriter");
const socials = [...document.querySelectorAll(".social")];
const scroll = document.querySelector(".scroll-hint");
const content = document.querySelector("#content");

const leetRegexArray = [
    { nr: /o/gi, normal: "o", lr: /0/g, leet: "0" },
    { nr: /i/gi, normal: "i", lr: /1/g, leet: "1" },
    { nr: /e/gi, normal: "e", lr: /3/g, leet: "3" },
    { nr: /s/gi, normal: "s", lr: /5/g, leet: "5" },
    { nr: /g/gi, normal: "g", lr: /6/g, leet: "6" },
    { nr: /t/gi, normal: "t", lr: /7/g, leet: "7" },
    { nr: /b/gi, normal: "b", lr: /8/g, leet: "8" },
];

function makeLeet(str) {
    leetRegexArray.forEach((x) => (str = str.replace(x.nr, x.leet)));
    return str;
}

async function delay(x) {
    return new Promise((r) => setTimeout(r, x));
}

async function anim() {
    //type out the leet text
    for (let i = 0; i < typewriter.dataset.text.length; i++) {
        typewriter.innerHTML = `<span class="title-color">${makeLeet(
            typewriter.dataset.text.substr(0, i)
        )}</span>_`;
        await delay(Math.random() * 20 + 100);
    }

    let text = makeLeet(typewriter.dataset.text);
    typewriter.innerHTML = `<span class="title-color">${text}</span>`;

    //"decrypt" the leet text
    for (leet of leetRegexArray) {
        text = text.replace(leet.lr, leet.normal);
        typewriter.innerHTML = `<span class="title-color">${text}</span>`;
        await delay(50);
    }
    typewriter.innerHTML = `<span class="title-color">${typewriter.dataset.text}</span>`;

    //show the links and scroll hint
    await delay(100);
    socials.forEach((x) => x.classList.add("show"));
    await delay(300);
    scroll.classList.add("show");
}

async function fetchNews(baseUrl, key, limit = 5) {
    const url = new URL(baseUrl);
    url.pathname = "/ghost/api/content/posts";
    url.searchParams.set("key", key);
    url.searchParams.set("limit", limit);
    url.searchParams.set("include", "tags");

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return data;
}

/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} tn
 * @param {Partial<HTMLElementTagNameMap[T]>} options
 * @returns {HTMLElementTagNameMap[T]}
 */
function el(tn, options) {
    const el = document.createElement(tn);
    for (const prop in options) {
        el[prop] = options[prop];
    }
    return el;
}

function renderArticle(data) {
    const post = el("a", { className: "post", href: data.url });

    post.appendChild(
        el("h4", {
            innerText: data.title,
        })
    );
    post.appendChild(
        el("img", {
            src: data.feature_image,
        })
    );
    post.appendChild(
        el("p", {
            innerText: data.excerpt,
        })
    );
    post.appendChild(
        el("span", {
            innerText: `In: ${data.tags.map((x) => x.name).join(", ")}`,
        })
    );

    return post;
}

fetchNews(NEWS_API, NEWS_KEY).then((data) => {
    console.log({ data });

    const posts = document.getElementById("posts");
    posts.innerHTML = "";

    for (const post of data.posts) {
        posts.appendChild(renderArticle(post));
    }
});

scroll.addEventListener("click", () => {
    content.scrollIntoView({ behavior: "smooth" });
});
anim();
