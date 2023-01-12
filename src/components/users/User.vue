<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  /** Имя пользователя */
  name: string;
  /** Телефон пользователя */
  phone: string;
}>();

// const children = ref([]);
</script>

<template>
  <div class="flex items-center">
    <p class="flex-[0_0_35%] border-r border-t border-black text-center p-2">
      {{ name }}
    </p>
    <p class="flex-[0_0_65%] text-center border-t border-black p-2">
      {{ phone }}
    </p>
  </div>
</template>
