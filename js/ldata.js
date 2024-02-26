const gid = document.getElementById.bind(document);
const gls = localStorage.getItem.bind(localStorage);

let theme;

// Creates DOM object, setting type, class and inner text
function mkobj(type, cl, txt) {

    let ret = document.createElement(type);

    if(cl !== undefined && cl != "") ret.classList.add(cl);

    if(txt !== undefined) {
        const tc = document.createTextNode(txt);
        ret.appendChild(tc);
    }

    return ret;
}

// Add section to data
function addsection(sec) {

    const hline = mkobj("div", "hline");
    const hdr = mkobj("h2", "hcol", sec.hdr);
    const gap = mkobj("div", "smallgap");
    const pdiv = gid("data");

    pdiv.appendChild(hline);
    pdiv.appendChild(hdr);
    pdiv.appendChild(gap);

    for(const o of sec.data) {
        let sect = mkobj("h3", "hcol", o.title);
        let secw = mkobj("div", "secdate", o.when);
        let secl = mkobj("div", "secloc", o.loco);
        let secd = mkobj("div", "secdata", o.text);
        let sgap = mkobj("div", "smallgap");

        pdiv.appendChild(sect);
        pdiv.appendChild(secw);
        pdiv.appendChild(secl);
        pdiv.appendChild(secd);
        pdiv.appendChild(sgap);
    }
}

// Toggles between light and dark theme
function toggletheme() {
    if(theme == "dark.css") theme = "light.css";
    else theme = "dark.css";

    settheme(theme);
}

// Activates selected theme & load stylesheet
function settheme(theme) {

    gid("theme").href = "css/" + theme;

    localStorage.setItem("bnaucler-se-theme", theme);
}

// Scrolls smoothly to top of page
function scrollup() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Captures scrolling event and conditionally displays top button
function scrollcap() {

    const y = window.scrollY;
    const tbtn = gid("scrollup");

    if(y > 500) tbtn.style.display = "block";
    else tbtn.style.display = "none";
}

// Initialize page
function init() {

    theme = gls("bnaucler-se-theme");
    if(theme == undefined || theme == "") theme = "dark.css";
    settheme(theme);

    const ddiv = gid("data");

    ddiv.innerHTML = "";

    for(const o of wdata) {
        addsection(o);
    }
}

// Call init on (re)load
window.onload = () => init();
window.onbeforeunload = () => init();
window.addEventListener("scroll", scrollcap);
