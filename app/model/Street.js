Ext.define('StreetsEditor.model.Street', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'houses', type: 'int'},
        {name: 'companyId', type: 'int'},
        {name: 'cityId', type: 'int'},
        {name: 'companyName', type: 'string', persist: false, convert: function(v, record) {
                const companyStore = Ext.getStore('Companies');
                const company = companyStore && companyStore.findRecord('id', record.get('companyId'));
                return company ? company.get('name') : '';
            }},
        {name: 'cityName', type: 'string', persist: false, convert: function(v, record) {
                const cityStore = Ext.getStore('Cities');
                const city = cityStore && cityStore.findRecord('id', record.get('cityId'));
                return city ? city.get('name') : '';
            }},
        {name: 'population', type: 'int', persist: false, convert: function(v, record) {
                return record.get('houses') * 750;
            }}
    ],

    validators: {
        name: {type: 'length', min: 4},
        houses: {type: 'range', min: 1, max: 10000},
        companyId: {type: 'presence'}
    }
});