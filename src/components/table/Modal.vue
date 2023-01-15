<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import { IMaskDirective as vIMaskDirective } from "vue-imask";
import { Utilizer, Form } from "@/types/table/Utilizer";

/** Маска для ввода телефона */
const mask = { mask: "{+7} 000 000-00-00" };

const form = ref<Form>({
  name: "",
  phone: "",
  chief: null,
  subordinates: [],
});

const allUsers = JSON.parse(
  localStorage.getItem("users") || "[]"
) as Utilizer[];

const emit = defineEmits<{
  (event: "save-user", form: Form): void;
}>();

const showModal = inject<Ref<boolean>>("showModal");

function handleForm() {
  emit("save-user", form.value);
  if (showModal) {
    showModal.value = false;
  }
}
</script>

<template>
  <form
    class="flex flex-col p-4 gap-y-6 w-96 border border-black"
    @submit.prevent="handleForm"
  >
    <div class="flex justify-between">
      <h1>Добавление пользователя</h1>
      <button type="button" @click="showModal = false">X</button>
    </div>

    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between gap-x-3">
        <label for="name">Имя</label>
        <input required id="name" type="text" v-model="form.name" />
      </div>
      <div class="flex justify-between gap-x-3">
        <label for="phone">Телефон</label>
        <input
          v-i-mask-directive="mask"
          placeholder="+7 999 123-45-67"
          id="phone"
          required
          type="text"
          v-model="form.phone"
          maxlength="16"
        />
      </div>
      <div v-if="allUsers.length" class="flex justify-between gap-x-3">
        <label for="chief">Начальник</label>
        <select
          name="chief"
          id="chief"
          class="w-52"
          @change="form.chief = +($event.target as HTMLOptionElement).value"
        >
          <option value="#"></option>
          <option
            v-for="(user, index) in allUsers"
            :value="index"
            :key="user.name + index"
          >
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>
    <button
      type="submit"
      class="border border-black rounded-full px-3 py-1 self-start"
    >
      Сохранить
    </button>
  </form>
</template>
