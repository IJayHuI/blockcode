<script setup>
    const props = defineProps({
        title: { type: String, required: false, default: null },
        subtitle: { type: String, required: false, default: null }
    });
</script>
<template>
    <div class="flex flex-col gap-1">
        <p v-if="props.title" class="text-3xl font-bold">{{ props.title }}</p>
        <p v-if="props.subtitle" class="text-xl text-gray-600">{{ props.subtitle }}</p>
    </div>
    
</template>