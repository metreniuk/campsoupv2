import uuid from 'uuid/v4'
let storage = {}

let methods = {
    add: item => {
        let id = uuid()
        storage[id] = item
    },
    remove:  id => {
        delete storage[id]
    },
    update: item => {
        storage[item.id] = {...storage[item.id], ...item}
    },
    'get': id => storage[id]
}

export const getStorage = () => methods

// {items: [{title: 'День писем'}, {title: 'Собиралочка'}, {title: 'Большие гонки'}, {title: '"Начало мудрости - страх Господень."'}]},
// getStorage().add({title})