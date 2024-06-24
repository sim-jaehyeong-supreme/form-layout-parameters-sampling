<template>
    <common-form class="select-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'single',
            inputLabel: data.info.inputLabel,
        }">
            <el-select :model-value="data.value" @update:model-value="$emit('update:formData', $event as string)">
                <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </input-with-label>
    </common-form>
</template>

<script setup lang="ts">
import type { SelectForm } from "@/composables/use-form-layout-parameters";
import { ElSelect, ElOption } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: SelectForm;
}>();
defineEmits<{
    (e: "update:formData", value: string): void;
}>();
</script>
