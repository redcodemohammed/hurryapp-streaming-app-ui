<script setup lang="ts">
const { t: $t } = useI18n();
const username = "redcodemohammed";

const items = [
  [
    {
      label: username,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: $t("pages.home.title"),
      icon: "i-tabler-home",
      to: "/",
    },
  ],
  [
    {
      label: $t("common.actions.logout"),
      icon: "i-tabler-logout-2",
      to: "/logout",
    },
  ],
];
</script>
<template>
  <u-dropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-56' }" :popper="{ placement: 'bottom-start' }">
    <u-avatar :alt="username" />
    <template #account>
      <div class="text-right">
        {{ $t("common.welcome", { key: username }) }}
      </div>
    </template>
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <u-icon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </u-dropdown>
</template>

<style></style>
