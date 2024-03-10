<template>
  <div class="border-brand-gray1 w-full border-b border-solid">
    <div class="mx-auto my-16 text-center">
      <slot name="title">Sample title</slot>
      <slot name="subtitle">Sample subtitle</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderContainer",
};
</script>
