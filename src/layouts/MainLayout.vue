<template>
  <div class="WAL position-relative bg-grey-10" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>



      <q-page-container class="bg-dark">
        <router-view />
      </q-page-container>

      <q-footer>
        <!-- <q-toolbar class="bg-grey-3 text-black row">
          Addvertisement
        </q-toolbar> -->
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

const conversations = [
  {
    id: 1,
    person: 'Razvan Stoenescu',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    caption: 'I\'m working on Quasar!',
    time: '15:00',
    sent: true
  },
  {
    id: 2,
    person: 'Dan Popescu',
    avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
    caption: 'I\'m working on Quasar!',
    time: '16:00',
    sent: true
  },
  {
    id: 3,
    person: 'Jeff Galbraith',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    caption: 'I\'m working on Quasar!',
    time: '18:00',
    sent: true
  },
  {
    id: 4,
    person: 'Allan Gaunt',
    avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
    caption: 'I\'m working on Quasar!',
    time: '17:00',
    sent: true
  }
]

export default {
  name: 'WhatsappLayout',

  setup() {
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const search = ref('')
    const message = ref('')
    const currentConversationIndex = ref(0)

    const currentConversation = computed(() => {
      return conversations[currentConversationIndex.value]
    })

    const style = computed(() => ({
      height: $q.screen.height + 'px'
    }))

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function setCurrentConversation(index) {
      currentConversationIndex.value = index
    }

    return {
      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,
      conversations,

      currentConversation,
      setCurrentConversation,
      style,

      toggleLeftDrawer
    }
  }
}
</script>

<style lang="sass">
 
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
