<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import User from "@/components/table/User.vue";
import Modal from "@/components/table/Modal.vue";
import { Utilizer, Form } from "@/types/table/Utilizer";

const showModal = inject<Ref<boolean>>("showModal");

const users = ref<Utilizer[]>(
  JSON.parse(localStorage.getItem("users") || "[]")
);

function addUser(form: Form) {
  if (form.chief === null) {
    users.value.push(form);
  } else {
    users.value[form.chief].subordinates.push(form);
  }
  localStorage.setItem("users", JSON.stringify(users.value));
}

function sortByUserName() {
  users.value.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByUserPhone() {
  users.value.sort((a, b) => a.phone.localeCompare(b.phone));
}
</script>

<template>
  <div
    class="flex gap-10 items-center md:justify-between md:items-start flex-col md:flex-row"
  >
    <div class="flex flex-col w-96 shrink-0 border border-black">
      <div class="flex items-center">
        <p
          @click="sortByUserName"
          class="flex-[0_0_35%] border-r border-r-black text-center cursor-pointer"
        >
          Имя
        </p>
        <p
          @click="sortByUserPhone"
          class="flex-[0_0_65%] text-center cursor-pointer"
        >
          Телефон
        </p>
      </div>
      <div class="flex flex-col">
        <User
          v-for="user in users"
          :key="user.name + user.phone"
          :name="user.name"
          :phone="user.phone"
          :subordinates="user.subordinates"
        />
      </div>
    </div>
    <Modal v-if="showModal" @save-user="addUser($event)" />
  </div>
</template>
