<template>
    <el-dialog :model-value="visible" title="抽出条件選択" width="500" destroy-on-close center @close="$emit('close')">
        <div class="wrap">
            <extract-condition-card v-for="item in extractContionOptions" :key="item.key" :label="item.label" @click="$emit('select', item.key)"/>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElDialog } from "element-plus";
import { computed } from "vue";
import ExtractConditionCard from "@/components/ExtractConditionCard.vue";

defineProps<{
    visible: boolean;
}>();
defineEmits<{
    (e: "select", key: string): void;
    (e: "close"): void;
}>();

type ExtractConditionOption = {
    key: string;
    label: string;
};

const extractContionOptions = computed<Array<ExtractConditionOption>>(() => [
    {
        key: "a",
        label: "抽出条件A",
    },
    {
        key: "b",
        label: "抽出条件B",
    },
    {
        key: "c",
        label: "抽出条件C",
    },
]);
</script>

<style scoped lang="scss">
.wrap {
    display: grid;
    grid-template-columns: 120px 120px 120px;
    gap: 16px;
    justify-content: center;
}
</style>
