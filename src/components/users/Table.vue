<script setup lang="ts">
import { ref } from "vue";
import User from "@/components/users/User.vue";
import Modal from "@/components/modal/Modal.vue";
import { Utilizer } from "@/types/users/Utilizer";
import { Form } from "@/types/users/Form";

defineProps<{
  /** Показывать ли модальное окна */
  showModal: boolean;
}>();

const users = ref<Utilizer[]>([]);

function addUser(form: Form) {
  users.value.push(form);
}
</script>

<template>
  <div
    class="flex gap-10 items-center md:justify-between md:items-start flex-col md:flex-row"
  >
    <div class="flex flex-col border border-black w-96 shrink-0">
      <div class="flex items-center">
        <p class="flex-[0_0_35%] border-r border-r-black text-center">Имя</p>
        <p class="flex-[0_0_65%] text-center">Телефон</p>
      </div>
      <User v-for="user in users" :name="user.name" :phone="user.phone" />
    </div>
    <Modal v-if="showModal" @save-user="addUser($event)" />
  </div>
</template>
