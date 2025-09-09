Ext.define('StreetsEditor.view.cities.CitiesGrid', {
    extend: 'Ext.grid.Grid',

    xtype: 'citiesgrid',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.plugin.PagingToolbar',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.field.Number'
    ],

    title: 'Cities',
    width: '25%',
    margin: 5,
    height: '100%',

    store: {
        type: 'cities'
    },

    columns: [{
        text: 'City Name',
        dataIndex: 'name',
        flex: 1
    }, {
        text: 'Region',
        dataIndex: 'region',
        flex: 1
    }, {
        text: 'Population',
        dataIndex: 'population',
        flex: 1,
        cell: {
            encodeHtml: false,
            renderer: function (value) {
                return '~' + Ext.util.Format.number(value, '0,000');
            }
        }
    }],

    plugins: {
        type: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true
    },

    applyAllFilters: function () {
        const grid = this;
        const store = grid.getStore();

        const cityValue = grid.down('textfield[label="City"]').getValue();
        const regionValue = grid.down('selectfield[label="Region"]').getValue();
        const populationValue = grid.down('numberfield[label="Population ≥"]').getValue();

        store.clearFilter();

        store.filterBy(function (record) {
            const matchCity = !cityValue || record.get('name').toLowerCase().includes(cityValue.toLowerCase());
            const matchRegion = !regionValue || record.get('region') === regionValue;
            const matchPopulation = !populationValue || record.get('population') >= populationValue;

            return matchCity && matchRegion && matchPopulation;
        });

        store.totalCount = store.getData().getCount();
        store.loadPage(1);
    },


    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'textfield',
            label: 'City',
            width: 200,
            clearable: true,
            listeners: {
                change: {
                    buffer: 300,
                    fn: function (field, value) {
                        const grid = field.up('grid');
                        grid.applyAllFilters();
                    }
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'selectfield',
            label: 'Region',
            editable: false,
            clearable: true,
            width: 200,
            store: {
                type: 'regions',
                filters: [{
                    property: 'name',
                    operator: '!=',
                    value: null
                }],
            },
            displayField: 'name',
            valueField: 'name',
            listeners: {
                change: function (field, value) {
                    const grid = field.up('grid');
                    grid.applyAllFilters();
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'numberfield',
            label: 'Population ≥',
            width: 200,
            minValue: 0,
            clearable: true,
            listeners: {
                change: function (field, value) {
                    const grid = field.up('grid');
                    grid.applyAllFilters();
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            xtype: 'button',
            text: 'Clear All Filters',
            handler: function () {
                const grid = this.up('grid');

                grid.down('textfield[label="City"]').setValue('');
                grid.down('selectfield[label="Region"]').setValue(null);
                grid.down('numberfield[label="Population ≥"]').setValue('');

                grid.applyAllFilters();
            }
        }]
    }],
});