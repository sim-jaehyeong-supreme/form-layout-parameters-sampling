<template>
    <common-form class="input-with-select-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'double',
            leftInputLabel: data.info.leftInputLabel,
            rightInputLabel: data.info.rightInputLabel,
        }">
            <el-input :model-value="data.value.input"
                @update:model-value="$emit('update:formData', { input: $event, select: data.value.select })" />
            <el-select :model-value="data.value.select"
                @update:model-value="$emit('update:formData', { input: data.value.input, select: $event })">
                <el-option v-for="item in data.selectOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
            </el-select>
        </input-with-label>
    </common-form>
</template>

<script setup lang="ts">
import type { InputWithSelectForm } from "@/composables/use-form-layout-parameters";
import { ElInput, ElSelect, ElOption } from "element-plus";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";

defineProps<{
    data: InputWithSelectForm;
}>();
defineEmits<{
    (e: "update:formData", value: {
        input: string;
        select: string;
    }): void;
}>();
</script>
