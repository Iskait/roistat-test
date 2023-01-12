<script setup lang="ts">
import { ref } from "vue";
import { IMaskDirective as vIMaskDirective } from "vue-imask";
import { Form } from "@/types/users/Form";

/** Маска для ввода телефона */
const mask = { mask: "{+7} 000 000-00-00" };

const form = ref<Form>({
  name: "",
  phone: "",
  chief: [],
});

const emit = defineEmits<{
  (event: "save-user", form: Form): void;
}>();

function handleForm() {
  emit("save-user", form.value);
}
</script>

<template>
  <form
    class="flex flex-col p-4 gap-y-6 w-96 border border-black"
    @submit.prevent="handleForm"
  >
    <h1>Добавление пользователя</h1>
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
          type="text"
          v-model="form.phone"
        />
      </div>
      <div class="flex justify-between gap-x-3">
        <label for="chief">Начальник</label>
        <input id="chief" type="text" />
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
