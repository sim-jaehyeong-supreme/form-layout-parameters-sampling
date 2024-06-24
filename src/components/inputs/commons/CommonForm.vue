<template>
    <div class="common-form">
        <div class="header">
            <div class="title">{{ title }}</div>
            <div v-if="description" class="description">{{ description }}</div>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description?: string;
}>();
</script>

<style scoped lang="scss">
.common-form {
    margin: 16px 0px;
    .header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .title {
            font-size: 14px;
            color: black;
        }

        .description {
            font-size: 12px;
            color: gray;
        }
    }
}
</style>
