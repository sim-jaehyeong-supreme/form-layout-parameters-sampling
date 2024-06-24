<template>
    <common-form class="double-input-list-form" :title="data.info.title" :description="data.info.description">
        <input-with-label :text="{
            type: 'double',
            leftInputLabel: data.info.leftInputLabel,
            rightInputLabel: data.info.rightInputLabel,
        }" />
        <div class="content">
            <div class="item" v-for="(item, index) in innerValue">
                <el-input :model-value="item.left" @update:model-value="innerValue[index].left = $event" />
                <el-input :model-value="item.right" @update:model-value="innerValue[index].right = $event" />
                <el-button :icon="Delete" circle @click="innerValue.splice(index, 1)" />
            </div>
        </div>

        <div class="add-button">
            <el-button :icon="Plus" type="primary" circle @click="innerValue.push({ left: '', right: '' })" />
        </div>
    </common-form>
</template>

<script setup lang="ts">
import type { DoubleInputListForm, DoubleInputFormValue } from "@/composables/use-form-layout-parameters";
import { ElInput, ElButton } from "element-plus";
import { Delete, Plus } from "@element-plus/icons-vue";
import CommonForm from "@/components/inputs/commons/CommonForm.vue";
import InputWithLabel from "@/components/inputs/commons/InputWithLabel.vue";
import { ref, watch } from "vue";

const props = defineProps<{
    data: DoubleInputListForm;
}>();

const emits = defineEmits<{
    (e: "update:formData", value: Array<DoubleInputFormValue>): void;
}>();

const innerValue = ref(props.data.value.length === 0 ? [{ left: "", right: "" }] : props.data.value)

watch(innerValue.value, () => {
    emits("update:formData", innerValue.value);
});
</script>

<style scoped lang="scss">
.double-input-list-form {
    .content {
        width: 700px;
        .item {
            display: grid;
            gap: 8px;
            grid-template-columns: 300px 300px 100px;
        }
    }
    .add-button {
        width: 600px;
        display: flex;
        justify-content: center;
        margin-top: 8px;
    }
}
</style>
