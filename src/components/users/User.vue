<script setup lang="ts">
defineProps<{
  /** Имя пользователя */
  name: string;
  /** Телефон пользователя */
  phone: string;
}>();
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <p class="flex-[0_0_35%] border-t border-r border-black text-center p-2">
        {{ name }}
      </p>
      <p class="flex-[0_0_65%] text-center border-t border-black p-2">
        {{ phone }}
      </p>
    </div>
  </div>
</template>
