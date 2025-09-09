Ext.define('StreetsEditor.store.Companies', {
    extend: 'Ext.data.Store',
    alias: 'store.companies',
    fields: ['id', 'name'],
    data: [
        {id: 1, name: 'Билайн'},
        {id: 2, name: 'Мегафон'},
        {id: 3, name: 'МТС'},
        {id: 4, name: 'Теле2'},
        {id: 5, name: 'Ростелеком'}
    ]
});