<template>
  <div>
    <div class="flex gap-sm justify-end flex-col items-end m-xs">
      <!-- description -->
      <div class="rounded-sm flex gap-sm justify-between p-xs w-full">
        <ui-Skeleton :width="16" :height="16" />
        <div class="flex gap-sm">
          <div class="flex flex-col gap-2xs items-end">
            <ui-Skeleton :width="64" :height="16" />
            <ui-Skeleton :width="96" :height="12" />
          </div>
          <ui-Skeleton :width="40" :height="40" />
        </div>
      </div>
      <!-- badges -->
      <div class="flex justify-end items-center pr-[60px] pb-md mt-sm">
        <div>
          <ui-Skeleton :width="16" :height="16" />
        </div>
        <div>
          <ui-Divider type="vertical" :height="24" class="mx-sm" />
        </div>
        <div>
          <ui-Skeleton :width="56" :height="20" />
        </div>
      </div>
    </div>
  </div>
</template>
