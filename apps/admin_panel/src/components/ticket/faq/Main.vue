<template>
  <div class="root">
    <div class="w-full md:w-2/3">
      <TicketFaqContent />
    </div>
    <div class="w-full md:w-1/3">
      <ui-Card>
        <template #main>
          <TicketFaqList />
        </template>
      </ui-Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  @apply flex flex-col-reverse md:flex-row gap-md font-yekanFa;
}
</style>
