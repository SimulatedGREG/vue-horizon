<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Messages</h1>
      <button class="button is-dark is-pulled-right" @click="reset">Reset</button>
      <message v-for="msg in messages" :data="msg"></message>
    </div>
  </div>
</template>

<script>
import Message from './components/Message.vue'

export default {
  components: { Message },
  created () {
    this.reset()
    this.$$messages
      .watch()
      .subscribe(
        documents => {
          this.messages = [
            ...documents.filter(m => !m.hasBeenRead),
            ...documents.filter(m => m.hasBeenRead)
          ]
        }
      )
  },
  data () {
    return { messages: [] }
  },
  methods: {
    reset () {
      this.$$messages.removeAll([...this.messages])
      this.$$messages.store(require('./messages.js').default)
    }
  }
}
</script>

<style>
  #app {
    margin-top: 120px;
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    max-width: 600px !important;
  }

  h1 {
    display: inline-block;
    margin-bottom: 30px !important;
  }
</style>
