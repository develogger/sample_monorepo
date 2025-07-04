<template>
  <Card class="w-[300px]">
    <template #header>
      {{ header }}
    </template>
    <template #main>
      {{ main }}
    </template>
    <template #footer>
      {{ footer }}
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '../card/Card.vue';
interface Props {
  footer: unknown;
  header: unknown;
  main: unknown;
}

defineProps<Props>();
</script>
