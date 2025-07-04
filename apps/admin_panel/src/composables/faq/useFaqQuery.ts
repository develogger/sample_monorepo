import type { Query } from '@/graphql/graphql';

export interface SlugCountType {
  [key: string]: Ref<number>;
}
interface SlugInfo {
  length: number;
  value: string;
}
const slugs = (result: Ref<Query | undefined>) => {
  const value = result.value?.Faqs;
  const slugCount: SlugCountType = {};
  const slugArray: SlugInfo[] = [];
  if (value) {
    for (const faq of value) {
      const slug = String(faq?.slug);
      if (!slugCount[slug]) {
        slugCount[slug] = ref(0);
      }
      slugCount[slug].value++;
    }
    for (const slug in slugCount) {
      slugArray.push({ length: slugCount[slug].value, value: slug });
    }

    return slugArray;
  }

  return [];
};
export const useFaqQuery = () => {
  const { loading, onError, result } = useQuery<Query>(FaqSchema);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: result,
    loading,
    slugs: computed(() => slugs(result)),
  };
};
