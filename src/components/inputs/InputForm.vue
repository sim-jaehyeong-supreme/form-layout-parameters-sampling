<template>
    <common-form class="input-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'single',
            inputLabel: data.info.inputLabel,
        }">
            <el-input :model-value="data.value" @update:model-value="$emit('update:formData', $event)"/>
        </input-with-label>
    </common-form>
</template>

<script setup lang="ts">
import type { InputForm } from "@/composables/use-form-layout-parameters";
import { ElInput } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: InputForm;
}>();
defineEmits<{
    (e: "update:formData", value: string): void;
}>();
</script>
