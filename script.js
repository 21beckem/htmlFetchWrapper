const homeURL = document.currentScript.getAttribute('homeURL');
function GrabPage(thisUrl) {
    fetch(thisUrl)
    .then((response) => response.text())
    .then((text) => {
        OverwritePage(text);
    });
}
function fixUrl(text, regex, linkType) {
    return text.replace(regex, function (match, capture) {
        console.log(capture, match);
        if (capture.includes('https://') || capture.includes('https://')) {
            return linkType + '="' + new URL(capture).href + '"';
        } else {
            return linkType + '="' + new URL(capture, homeURL).href + '"';
        }
    });
}
function OverwritePage(text) {
    //console.log(text);

    //replace src and href urls
    text = fixUrl(text, /src\s*=\s*"(.+?)"/gi, 'src');
    text = fixUrl(text, /href\s*=\s*"(.+?)"/gi, 'href');
    

    // fix all links
    document.write(text);
}
GrabPage(homeURL);
document.addEventListener(`click`, e => {
    const origin = e.target.closest(`a`);
  
    if (origin) {
        const href = origin.href;
        console.log(href);
        e.preventDefault();
    }
});
