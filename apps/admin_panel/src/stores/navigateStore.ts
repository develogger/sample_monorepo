import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum Nav {
  COLLAPSED,
  EXPANDED,
  HIDDEN,
}
export enum Status {
  VISIBLE,
  HIDDEN,
}

export const useNavigateStore = defineStore('navigateStore', () => {
  const { lg, xl } = useSize();
  // state values
  const navigateState = ref<Nav>(Nav.EXPANDED);
  const menuState = ref<Status>(Status.HIDDEN);
  const logoState = ref<Status>(Status.VISIBLE);
  const terminalSelectionState = ref<Status>(Status.HIDDEN);
  const currentTerminalState = ref<Status>(Status.VISIBLE);
  const insidebarItem = ref<Status>(Status.VISIBLE);
  const showTour = ref(false);
  const setNavigatorState = () => {
    if (lg.value) {
      navigateState.value = Nav.HIDDEN;
      menuState.value = Status.HIDDEN;
      logoState.value = Status.HIDDEN;
      terminalSelectionState.value = Status.VISIBLE;
      currentTerminalState.value = Status.HIDDEN;
    }
    if (!lg.value) {
      navigateState.value = Nav.COLLAPSED;
      menuState.value = Status.HIDDEN;
      logoState.value = Status.VISIBLE;
      terminalSelectionState.value = Status.HIDDEN;
      currentTerminalState.value = Status.VISIBLE;
    }

    if (!lg.value && xl.value) {
      navigateState.value = Nav.COLLAPSED;
      menuState.value = Status.HIDDEN;
      logoState.value = Status.VISIBLE;
      terminalSelectionState.value = Status.HIDDEN;
      currentTerminalState.value = Status.VISIBLE;
    }
    if (!xl.value) {
      navigateState.value = Nav.EXPANDED;
      menuState.value = Status.HIDDEN;
      logoState.value = Status.VISIBLE;
      terminalSelectionState.value = Status.HIDDEN;
      currentTerminalState.value = Status.VISIBLE;
    }
  };
  const toggleNavigator = () => {
    if (!xl.value) {
      if (navigateState.value === Nav.EXPANDED) {
        navigateState.value = Nav.COLLAPSED;
      } else if (navigateState.value === Nav.COLLAPSED) {
        navigateState.value = Nav.EXPANDED;
      }
    } else {
      menuState.value = Status.VISIBLE;
    }
  };
  const toggleNavigatorInSidebar = () => {
    if (showTour.value) return;
    menuState.value = Status.HIDDEN;
  };

  return {
    currentTerminalState,
    insidebarItem,
    logoState,
    menuState,
    navigateState,
    setNavigatorState,
    showTour,
    terminalSelectionState,
    toggleNavigator,
    toggleNavigatorInSidebar,
  };
});
