Ext.define('StreetsEditor.store.Regions', {
    extend: 'Ext.data.Store',
    alias: 'store.regions',
    storeId: 'Regions',
    autoLoad: true,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    data: [
        { id: 1, name: 'Central' },
        { id: 2, name: 'North-West' },
        { id: 3, name: 'Siberian' },
        { id: 4, name: 'Ural' },
        { id: 5, name: 'Volga' },
        { id: 6, name: 'Southern' },
        { id: 7, name: 'Far-Eastern' },
        { id: 8, name: 'North-Caucasian' }
    ],
});