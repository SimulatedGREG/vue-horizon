var Horizon = require('@horizon/client')

module.exports = {
  install: function (Vue, opts) {
    // Instantiate Horizon
    var horizon = new Horizon(opts || {})

    // Bind instance to Vue
    Vue.prototype.$horizon = horizon

    /**
     * Attach optional Horizon models to Vue
     * [this.$$model]
     */
    if (opts.models) {
      opts.models.forEach(function (model) {
        Vue.prototype['$$' + model] = horizon(model)
      })
    }

    horizon.onReady(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[vue-horizon] Ready. Connected to ' + opts.host)
      }
    })

    horizon.connect()
  }
}
