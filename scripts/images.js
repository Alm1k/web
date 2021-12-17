window.addEventListener('DOMContentLoaded', async () => {
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
        const gallery = document.querySelector('.gallery');
        const filter = (item) => idx % 2 ? item.id % 2 === 0 : item.id % 2 === 1;
        data.filter(filter).forEach(item => {
            const img = document.createElement('img');
            img.className = 'gallery__item';
            img.src = item.url;
            gallery.appendChild(img);
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
