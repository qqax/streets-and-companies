Ext.define('StreetsEditor.store.Cities', {
    extend: 'Ext.data.Store',
    alias: 'store.cities',
    storeId: 'Cities',
    autoLoad: true,
    model: 'StreetsEditor.model.City',
    data: [
        {id: 1, name: 'Moscow', region: 'Central', population: 12655000},
        {id: 2, name: 'Saint Petersburg', region: 'North-West', population: 5384000},
        {id: 3, name: 'Novosibirsk', region: 'Siberian', population: 1620000},
        {id: 4, name: 'Yekaterinburg', region: 'Ural', population: 1495000},
        {id: 5, name: 'Kazan', region: 'Volga', population: 1257000},
        {id: 6, name: 'Nizhny Novgorod', region: 'Volga', population: 1244000},
        {id: 7, name: 'Chelyabinsk', region: 'Ural', population: 1200000},
        {id: 8, name: 'Samara', region: 'Volga', population: 1165000},
        {id: 9, name: 'Omsk', region: 'Siberian', population: 1154000},
        {id: 10, name: 'Rostov-on-Don', region: 'Southern', population: 1130000},
        {id: 11, name: 'Ufa', region: 'Volga', population: 1125000},
        {id: 12, name: 'Krasnoyarsk', region: 'Siberian', population: 1093000},
        {id: 13, name: 'Voronezh', region: 'Central', population: 1058000},
        {id: 14, name: 'Perm', region: 'Volga', population: 1048000},
        {id: 15, name: 'Volgograd', region: 'Southern', population: 1016000}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});