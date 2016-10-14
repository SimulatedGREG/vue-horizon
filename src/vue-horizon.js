var Horizon = require('@horizon/client')

module.exports = {
  install: function (Vue, opts) {
    var horizon = new Horizon(opts || {})

    horizon.onReady(() => {
      Vue.prototype.$horizon = horizon
      if (process.env.NODE_ENV !== 'production') {
        console.log('[vue-horizon] Ready. Connected to ' + opts.host)
      }

      if (opts.models) {
        for (var i = 0; i < opts.models.length; i++) {
          Vue.prototype['$$' + opts.models[i]] = horizon(opts.models[i])
        }
      }
    })
    horizon.connect()
  }
}
