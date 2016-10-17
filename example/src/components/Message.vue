<template>
  <article class="media" :class="{ 'hasBeenRead': data.hasBeenRead }">
    <div class="media-content">
      <div class="content">
        <p>
          <span class="new" v-if="!data.hasBeenRead"></span>
          <strong>{{ data.from }}</strong> <small>{{ data.handle }}</small> <small>{{ data.timestamp | relativeDate }}</small>
          <br>
          {{ data.msg }}
        </p>
      </div>
    </div>
    <div class="media-right" v-if="!data.hasBeenRead">
      <button class="delete" @click="dismiss(data.id)"></button>
    </div>
  </article>
</template>

<script>
  import relativeDate from 'relative-date'

  export default {
    methods: {
      dismiss (id) {
        this.$$messages.update({
          id,
          hasBeenRead: true
        })
      }
    },
    filters: {
      relativeDate (timestamp) {
        return relativeDate(timestamp)
      }
    },
    props: ['data']
  }
</script>

<style scoped>
  .hasBeenRead {
    opacity: .5;
    transition: opacity 200ms ease-in-out;
  }

  .hasBeenRead:hover { opacity: 1; }

  .new:before {
    content: '';
    background: rgba(0, 0, 0, .8);
    border-radius: 50%;
    display: inline-block;
    height: 8px;
    vertical-align: middle;
    width: 8px;
  }

  article { cursor: pointer; }
</style>
