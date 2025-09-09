Ext.define('StreetsEditor.model.City', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'regionId', type: 'int'},
        {name: 'region', type: 'string', persist: true, convert: function(v, record) {
                const regionStore = Ext.getStore('Regions');
                const region = regionStore && regionStore.findRecord('id', record.get('regionId'));
                return region ? region.get('name') : '';
            }},
        {name: 'population', type: 'int'}
    ]
});