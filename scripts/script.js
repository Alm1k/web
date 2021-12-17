let oldTime = new Date().getTime();

window.onload = () => {
    let difference = new Date().getTime() - oldTime;
    let footer = document.querySelector('footer .headline');
    let node = document.createTextNode(`Page load time is ${difference / 1000} seconds.`);
    footer.insertBefore(node, footer.firstChild);

    document.querySelectorAll('.menu__item-link').forEach(item => {
        if (window.location.href.includes(item.getAttribute('href'))) {
            item.classList.add('menu__item-link-selected')
        }
    });
}
