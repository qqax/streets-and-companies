Ext.define('StreetsEditor.store.Streets', {
    extend: 'Ext.data.Store',
    alias: 'store.streets',
    storeId: 'Streets',
    autoLoad: true,
    model: 'StreetsEditor.model.Street',
    data: [
        {id: 1, name: 'Тверская', houses: 150, companyId: 1, cityId: 1},
        {id: 2, name: 'Арбат', houses: 89, companyId: 4, cityId: 1},
        {id: 3, name: 'Невский проспект', houses: 210, companyId: 3, cityId: 2},
        {id: 4, name: 'Лиговский проспект', houses: 120, companyId: 4, cityId: 2},
        {id: 5, name: 'Красный проспект', houses: 95, companyId: 1, cityId: 3},
        {id: 6, name: 'Ленина', houses: 78, companyId: 1, cityId: 4},
        {id: 7, name: 'Проспект Победы', houses: 112, companyId: 1, cityId: 5},
        {id: 8, name: 'Баумана', houses: 64, companyId: 5, cityId: 5},
        {id: 9, name: 'Мира', houses: 83, companyId: 2, cityId: 6},
        {id: 10, name: 'Советская', houses: 91, companyId: 5, cityId: 7}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});