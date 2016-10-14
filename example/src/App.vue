<template>
  <div id="app">
    <img src="./assets/logo.png">
    <input type="text" v-model="newMessage" @keyup.enter="addMessage">
    <p v-for="msg in messages">
      {{ msg.text }}
    </p>
  </div>
</template>

<script>
export default {
  created () {
    this.$$messages
      .watch()
      .subscribe(
        documents => {
          this.messages = documents
        }
      )
  },
  data () {
    return {
      messages: [],
      newMessage: ''
    }
  },
  methods: {
    addMessage () {
      if (this.newMessage === '') return

      this.$$messages.store({
        text: this.newMessage
      })

      this.newMessage = ''
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
