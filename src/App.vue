<script setup lang="ts">
import { ref } from "vue";
import Table from "@/components/users/Table.vue";

const showModal = ref(false);
</script>

<template>
  <div class="container flex flex-col gap-y-5 mx-auto py-10">
    <button
      @click="showModal = !showModal"
      class="self-center md:self-start border border-black rounded-full px-3 py-1"
    >
      {{ showModal ? "Отменить" : "Добавить" }}
    </button>
    <Table :show-modal="showModal" />
  </div>
</template>
