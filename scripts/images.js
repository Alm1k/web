window.addEventListener('DOMContentLoaded', async () => {
    // 1 - swiper element class
    // 2 arg - config
    // pagination - pagination
    // pagination.el - pagination element class
    // pagination.clickable - clickable pagination
    // pagination.dynamicBullets - makes counts of bullets dynamic
    // slidesPerView - count of elements in one display
    // spaceBetween - space between elements
    // navigation - navigation element class
    // navigation.nextEl - right button element class
    // navigation.prevEl - left button element class
    const swiper = new Swiper(".swiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        slidesPerView: 5,
        spaceBetween: 11,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    const links = [
        'https://jsonplaceholder.typicode.com/photos?albumId=1',
        'https://jsonplaceholder.typicode.com/photos?albumId=2',
        'https://jsonplaceholder.typicode.com/photos?albumId=3'
    ];

    const responses = await Promise.all(links.map(url => makeRequest(url)))
        .catch(() => {
            document.querySelector('.gallery').appendChild(document.createTextNode('⚠ Что-то пошло не так'));
        })
        .finally(() => hideLoader());

    for (const [idx, data] of responses.entries()) {
        const gallery = document.querySelector('.swiper-wrapper');
        const filter = (item) => idx % 2 ? item.id % 2 === 0 : item.id % 2 === 1;
        data.filter(filter).forEach(item => {
            const img = document.createElement('img');
            const div = document.createElement('div');
            img.src = item.url;
            img.className = 'gallery__item';
            div.className = 'swiper-slide';
            div.appendChild(img);
            gallery.appendChild(div);
        })
    }
});

const makeRequest = (url) => {
    return fetch(url)
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error();
        })
        .then((responseJson) => { return responseJson; });
}

const hideLoader = () => {
    document.querySelector('.loading').remove();
}
