<template>
    <common-form class="double-input-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'double',
            leftInputLabel: data.info.leftInputLabel,
            rightInputLabel: data.info.rightInputLabel,
        }">
            <el-input :model-value="data.value.left" @update:model-value="$emit('update:formData', {left: $event, right: data.value.right})" />
            <el-input :model-value="data.value.right" @update:model-value="$emit('update:formData', {left: data.value.left, right: $event})" />
        </input-with-label>
    </common-form>
</template>

<script setup lang="ts">
import type { DoubleInputForm, DoubleInputFormValue } from "@/composables/use-form-layout-parameters";
import { ElInput } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: DoubleInputForm;
}>();
defineEmits<{
    (e: "update:formData", value: DoubleInputFormValue): void;
}>();


</script>
