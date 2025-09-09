Ext.define('Streets.Application', {
    extend: 'Ext.app.Application',

    name: 'Streets',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        'StreetsEditor.store.Cities',
        'StreetsEditor.store.Companies',
        'StreetsEditor.store.Streets'
    ],

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
