Ext.define('StreetsEditor.store.Cities', {
    extend: 'Ext.data.Store',
    alias: 'store.cities',
    storeId: 'Cities',
    autoLoad: true,
    model: 'StreetsEditor.model.City',
    data: [
        {id: 1, name: 'Москва'},
        {id: 2, name: 'Санкт-Петербург'},
        {id: 3, name: 'Новосибирск'},
        {id: 4, name: 'Екатеринбург'},
        {id: 5, name: 'Казань'},
        {id: 6, name: 'Нижний Новгород'},
        {id: 7, name: 'Челябинск'},
        {id: 8, name: 'Самара'},
        {id: 9, name: 'Омск'},
        {id: 10, name: 'Ростов-на-Дону'}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});