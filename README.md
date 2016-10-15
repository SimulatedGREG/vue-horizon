# vue-horizon

> The vue plugin that wraps @horizon/client APIs to the Vue object and more.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installing
Install using NPM
```bash
npm install vue-horizon --save
``` 
Then import using webpack or browserify

**main.js**
```js
import Vue from 'vue'
import VueHorizon from 'vue-horizon'

Vue.use(VueHorizon, { host: '127.0.0.1' })
```
*The use of a module loader is required in order to pass the needed Horizon contructor arguments.*

### Usage
When installing `vue-horizon` through the use of `Vue.use()`, make sure to pass a second argument that contains the [Horizon contructor arguments](http://horizon.io/api/horizon/#constructor). Note that these arguments are used directly with `new Horizon()`. Since we are using the `@horizon/client` module, **we must** at minimum specify the `host` of our Horizon server.

### `this.$horizon`
Once installed, all `@horizon/client` APIs are exposed through `this.$horizon`.

### Binding Horizon Models
`vue-horizon` provides a convenience method to easily bind models to the Vue object so that they can be used throughout the entire component tree. The primary advantage of doing this is to limit the amount of connections to the horizon server by letting the plugin set up the references in a one-shot manner. This method is recommened for smaller sized applications. Larger apps should maybe ignore this feature as models should be tied together with `vuex`.

#### Use Case
Let's say we know our database has the models `messages` and `members`, and we also know we want to access them on multiple occasions within multiple components. Let's bind items to the Vue object.

Within the Horizon contructor arguements let's pass in an array of string models and let the plugin do the rest...

**main.js**
```js
  Vue.use(VueHorizon, {
    host: '127.0.0.1',
    models: ['messages', 'members']
  })
```

Now both the `messages` and `members` models are available via **`this.$$messages`** and **`this.$$members`**. Let's use one!

**Messages.vue**
```html
<template>
  <div>
    <h1>Messages</h1>
    <div v-for="msg in msgs">
      {{ msg.text }}
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.$$messages.watch()
        .subscribe(
          docs => {
            this.msgs = docs
          }
        )
    },
    data () {
      return {
      	msgs: []
      }
    }
  }
</script>
```

