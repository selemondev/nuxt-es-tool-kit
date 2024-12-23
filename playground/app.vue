<script setup lang="ts">
const result = /abc/
</script>

<template>
  <div>
    {{ isRegExp(result) }}
  </div>
</template>
