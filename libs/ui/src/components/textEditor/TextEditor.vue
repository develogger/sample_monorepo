<template>
  <div dir="rtl" class="flex flex-col border border-border-divider rounded-sm input">
    <!-- Toolbar -->
    <div class="border-b border-border-divider p-xs flex gap-sm items-center">
      <Button type="tertiary" icon="TextStyleBold" @click="applyBold" />
      <Button type="tertiary" icon="TextStyletalic" @click="applyItalic" />
      <Divider type="vertical" />
      <Button type="tertiary" icon="CodeBlock" @click="applyCode" />
      <Button type="tertiary" icon="BulletList" @click="applyList" />
    </div>

    <!-- Contenteditable Editor -->
    <div
      ref="editorDiv"
      class="min-h-[192px] text-editor rounded-t-0"
      contenteditable="true"
      :class="styleValue"
      @input="onInput"
      @keydown="onKeyDown"
    ></div>
  </div>
  <div class="input__description">
    <!-- helper -->
    <div>
      <div v-if="helper" class="input__description__helper" dir="rtl">
        <div v-if="helper.type === 'error'" class="input__description__helper--error">
          <Icon name="InfoFill" />
          {{ helper.message }}
        </div>
        <div v-if="helper.type === 'success'" class="input__description__helper--success">
          <Icon name="CheckMarkCircleFill" />
          {{ helper.message }}
        </div>
        <div v-if="helper.type === 'info'" class="input__description__helper--info">
          {{ helper.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue';
import { useField } from 'vee-validate';
import Divider from '../divider/Divider.vue';
import Button from '../button/Button.vue';

export interface Props {
  name: string;
  modelValue?: string;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  helper: undefined,
});
const { modelValue } = toRefs(props);
const { handleChange, errors } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const styleValue = computed(() => {
  if (!!errors.value.length) {
    return 'input__inner--error';
  }

  return 'input__inner--default';
});
const emit = defineEmits(['update:modelValue']);
const editorDiv = ref();
const markdownContent = ref('');
const htmlToMarkdown = (html: string) => {
  const tempEl = document.createElement('div');
  tempEl.innerHTML = html;

  const convertNode: (node: Node) => string | null = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes).map(convertNode).join('');
      const element = node as Element;
      switch (element.tagName.toLowerCase()) {
        case 'strong':
        case 'b':
          return `**${children}**`;
        case 'em':
        case 'i':
          return `*${children}*`;
        case 'code':
          return `\`\`\`${children}\`\`\``;
        case 'li':
          return `* ${children}\\n`;
        case 'ul':
          return children;
        default:
          return children;
      }
    }

    return '';
  };

  return convertNode(tempEl);
};
const updateMarkdown = () => {
  if (editorDiv.value) {
    let html = editorDiv.value.innerHTML;
    html = html.replaceAll('<p>', '\\n');
    markdownContent.value = htmlToMarkdown(html) as string;
    handleChange(markdownContent.value);
    emit('update:modelValue', markdownContent.value);
  }
};
const wrapSelectionWithTag = (tagName: string) => {
  const selection = window.getSelection();
  if (selection && !selection.rangeCount) {
    return;
  }
  const range = selection?.getRangeAt(0);
  if (range?.collapsed) {
    return;
  }

  const selectedText = range?.toString();
  const element = document.createElement(tagName);
  element.textContent = selectedText as string;
  range?.deleteContents();
  range?.insertNode(element);
  selection?.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(element);
  selection?.addRange(newRange);

  updateMarkdown();
};
const applyBold = () => wrapSelectionWithTag('strong');
const applyItalic = () => wrapSelectionWithTag('em');
const applyCode = () => wrapSelectionWithTag('code');
const applyList = () => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) {
    return;
  }
  const range = selection.getRangeAt(0);
  const selectedText = (range.commonAncestorContainer as HTMLElement)?.innerText.toString();
  const items = selectedText.split(/\r?\n/).filter((item: string) => item.trim() !== '');
  const ul = document.createElement('ul');
  items.forEach((item: string) => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  range.deleteContents();
  range.insertNode(ul);

  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(ul);
  selection.addRange(newRange);

  updateMarkdown();
};
const onInput = () => {
  updateMarkdown();
};
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection?.getRangeAt(0);
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      range.collapse(false);
      range.insertNode(p);
      range.setStart(p, 0);
      range.setEnd(p, 0);
      selection?.removeAllRanges();
      selection?.addRange(range);
      updateMarkdown();
    }
  }
};
onMounted(() => {
  if (modelValue.value) {
    handleChange(modelValue.value);
  }
});
</script>
<style lang="scss" scoped>
@use './texteditor.scss';
</style>
