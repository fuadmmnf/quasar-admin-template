<template>
  <q-item v-ripple clickable>
    <q-item-section avatar top>
      <q-avatar :icon="icon" :text-color="text_color" color="grey-2" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ value }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactDetailItem",
  props: ["icon", "text_color", "value", "label"],
});
</script>

<style scoped></style>