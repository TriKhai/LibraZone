
<template>
  <div class="m-5">
    <p>
      Enter "date" to display the current date, "greet {0}" for a message and "random" to get a
      random number.
    </p>
    <Terminal
      welcomeMessage="Welcome to Library"
      prompt="Library $"
      aria-label="PrimeVue Terminal Service"
    />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import TerminalService from 'primevue/terminalservice'
import Terminal from 'primevue/terminal'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  TerminalService.on('command', commandHandler)
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler)
})

const commandHandler = (text) => {
  let response
  let argsIndex = text.indexOf(' ')
  let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text

  switch (command) {
    case 'date':
      response = 'Today is ' + new Date().toDateString()
      break

    case 'greet':
      response = 'Hola ' + text.substring(argsIndex + 1)
      break

    case 'random':
      response = Math.floor(Math.random() * 100)
      break

    case 'books':
      response = 'books opening...'
      router.push({ name: 'books' })
      break

    case 'user':
      response = 'user opening...'
      router.push({ name: 'users' })
      break

    case 'pub':
      response = 'publishers opening...'
      router.push({ name: 'publisher' })
      break

    default:
      response = 'Unknown command: ' + command
  }

  TerminalService.emit('response', response)
}
</script>
