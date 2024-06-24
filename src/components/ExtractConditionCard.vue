<template>
    <el-card shadow="hover">
        <div class="wrap">
            {{ label }}
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { ElCard } from "element-plus";

defineProps<{
    label: string;
}>();
</script>

<style lang="scss">
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
}
</style>