export const useSessionAction = () => {
  const actionHandle = (
    id: string,
    value: string,
    callback: ((id: string, value: string, type: string) => void) | undefined
  ) => {
    const t = useI18n();

    return [
      {
        active: true,
        command: () => callback && callback(id, value, 'edit'),
        divider: true,
        icon: 'PenEdit',
        id: 1,
        label: t('_common.buttons.edit'),
      },
      {
        active: true,
        command: () => callback && callback(id, value, 'delete'),
        icon: 'Trash',
        id: 2,
        label: t('common.delete'),
        style: 'color:rgb(201 54 55)',
      },
    ];
  };

  return {
    actionHandle,
  };
};
