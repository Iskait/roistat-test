<script setup lang="ts">
import { inject, provide, Ref, ref } from "vue";
import User from "@/components/table/User.vue";
import Modal from "@/components/table/Modal.vue";
import { Utilizer } from "@/types/table/Utilizer";

const showModal = inject<Ref<boolean>>("showModal");

const users = ref<Utilizer[]>(
  JSON.parse(localStorage.getItem("users") || "[]")
);

provide("users", users);

function sortByUserName(users: Utilizer[]) {
  users.sort((a, b) => {
    if (a.subordinates.length) {
      sortByUserName(a.subordinates);
    }
    return a.name.localeCompare(b.name);
  });
}

function sortByUserPhone(users: Utilizer[]) {
  users.sort((a, b) => {
    if (a.subordinates.length) {
      sortByUserName(a.subordinates);
    }
    return a.phone.localeCompare(b.phone);
  });
}
</script>

<template>
  <div
    class="flex gap-10 items-center md:justify-between md:items-start flex-col md:flex-row"
  >
    <table class="flex flex-col w-96 shrink-0">
      <tr class="flex items-center">
        <th
          @click="sortByUserName(users)"
          class="flex-[0_0_35%] text-center cursor-pointer"
        >
          Имя
        </th>
        <th
          @click="sortByUserPhone(users)"
          class="flex-[0_0_65%] text-center cursor-pointer"
        >
          Телефон
        </th>
      </tr>

      <User
        v-for="user in users"
        :key="user.id"
        :id="user.id"
        :name="user.name"
        :phone="user.phone"
        :subordinates="user.subordinates"
        :chief="user.chief"
      />
    </table>

    <Modal v-if="showModal" />
  </div>
</template>
