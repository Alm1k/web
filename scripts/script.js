const oldTime = new Date().getTime();

window.onload = () => {
    const difference = new Date().getTime() - oldTime;
    const footer = document.querySelector('footer .headline');
    const node = document.createTextNode(`Page load time is ${difference / 1000} seconds.`);
    footer.insertBefore(node, footer.firstChild);

    document.querySelectorAll('.menu__item-link').forEach(item => {
        if (window.location.href.includes(item.getAttribute('href'))) {
            item.classList.add('menu__item-link-selected')
        }
    });

    todo.init();
}

let todo = {
    template: null,
    create(text, completed = false) {
        let list = null;
        if (!todo.template) {
            list = document.createElement('li');
            list.appendChild(document.createTextNode(text));
            let span = document.createElement('span');
            span.className = 'todo__action todo__action_delete';
            span.appendChild(document.createTextNode("\u00D7"));
            list.appendChild(span);
            todo.template = list.cloneNode(true);
        } else {
            list = todo.template.cloneNode(true);
            list.firstChild.nodeValue = text;
        }
        list.lastChild.onclick = () => {
            list.remove();
            todo.save();
        }
        list.className = completed ? 'completed' : '';
        list.onclick = () => {
            if (list.classList.contains('completed')) {
                list.classList.remove('completed');
            } else {
                list.classList.add('completed');
            }
            todo.save();
        }

        return list;
    },

    save: () => {
        const res = [];
        document.querySelector('.todo__items').childNodes.forEach(item => {
            res.push({
                value: item.firstChild.nodeValue,
                completed: item.className === 'completed'
            });
        });
        localStorage.setItem('todo', JSON.stringify(res));
    },

    update: () => {
        const option = document.querySelector('.todo__options').value;
        document.querySelector('.todo__items').childNodes.forEach(item => {
            item.classList.remove('d-none')
            if (option === 'completed' && item.className !== 'completed') item.classList.add('d-none');
            if (option === 'active' && item.className === 'completed') item.classList.add('d-none');
        });
        document.querySelector('.todo__text').disabled = option === 'completed';
    },

    add: () => {
        const elemText = document.querySelector('.todo__text');
        if (elemText.disabled || !elemText.value.trim().length) {
            return;
        }
        document.querySelector('.todo__items').appendChild(todo.create(elemText.value));
        elemText.value = '';
        todo.save();
    },

    init: () => {
        const fromStorage = JSON.parse(localStorage.getItem('todo'));
        if (fromStorage) {
            fromStorage.forEach(item => {
                document.querySelector('.todo__items').appendChild(todo.create(item.value, item.completed));
            });
        }
        document.querySelector('.todo__options').addEventListener('change', todo.update);
        document.querySelector('.todo__add').addEventListener('click', todo.add);
    },
}
