Ext.define('StreetsEditor.store.Companies', {
    extend: 'Ext.data.Store',
    storeId: 'Companies',
    autoLoad: true,
    alias: 'store.companies',
    fields: ['id', 'name'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    data: [
        {id: 1, name: 'Билайн'},
        {id: 2, name: 'Мегафон'},
        {id: 3, name: 'МТС'},
        {id: 4, name: 'Теле2'},
        {id: 5, name: 'Ростелеком'},
        {id: 6, name: 'Яндекс'},
        {id: 7, name: 'Сбер'},
        {id: 8, name: 'Тинькофф'},
        {id: 9, name: 'ВТБ'},
        {id: 10, name: 'Газпром'},
        {id: 11, name: 'Лукойл'},
        {id: 12, name: 'М.Видео'},
        {id: 13, name: 'Додо Пицца'},
        {id: 14, name: 'Wildberries'},
        {id: 15, name: 'Ozon'}
    ],
});