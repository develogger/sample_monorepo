<template>
  <div class="card">
    <div><slot name="header" /></div>
    <div class="h-full"><slot name="main" /></div>
    <div><slot name="footer" /></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use './card.scss';
</style>
