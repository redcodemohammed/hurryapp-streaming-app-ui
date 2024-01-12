<script setup lang="ts">
const username = "redcodemohammed";
</script>

<template>
  <header class="font-ibm-plex-sans-arabic bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-40 w-full">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5 flex items-center gap-4 justify-end">
      <UButton variant="soft" :label="$t('components.header.startAParty')" icon="i-tabler-device-tv" />
      <div class="flex-1"></div>
      {{ username }}
      <UiThemeSwitcher />
      <UiProfileButton />
    </div>
  </header>
</template>
