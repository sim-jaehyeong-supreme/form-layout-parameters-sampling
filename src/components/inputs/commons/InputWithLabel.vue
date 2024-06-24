<template>
    <div class="input-with-label">
        <div class="single" v-if="text.type === 'single'">
            <div class="label">{{ text.inputLabel }}</div>
            <div class="content">
                <slot />
            </div>
        </div>
        <div class="double" v-else-if="text.type === 'double'">
            <div class="label">
                <div class="left">{{ text.leftInputLabel }}</div>
                <div class="right">{{ text.rightInputLabel }}</div>
            </div>
            <div class="content">
                <slot />
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { SingleInputLabel, DoubleInputLabel } from '@/composables/use-form-layout-parameters';

defineProps<{
    text: {
        type: "single",
    } & SingleInputLabel |
    {
        type: "double",
    } & DoubleInputLabel
}>();
</script>

<style scoped lang="scss">
.input-with-label {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    font-size: 12px;
    color: black;

    .single {
        width: 300px;
    }

    .double {
        width: 600px;
        .label {
            display: grid;
            grid-template-columns: 300px 300px;
            gap: 8px;
        }
        
        .content {
            display: grid;
            gap: 8px;
            grid-template-columns: 300px 300px;
        }
    }
}
</style>
