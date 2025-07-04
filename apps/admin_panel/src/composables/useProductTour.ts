/* eslint-disable perfectionist/sort-objects */
import type { ComponentPublicInstance } from 'vue';

import { useShepherd } from 'vue-shepherd';

export const tour = useShepherd({
  useModalOverlay: true,
});

type ComponentRef = ComponentPublicInstance & {
  $refs: Record<number | string, HTMLElement[]>;
};
export const useProductTour = () => {
  const store = useNavigateStore();
  const authStore = useAuthStore();
  const handleAddStep = (componentRef: Ref<ComponentRef>, t: (str: string) => string) => {
    const findNextAccessibleKey = (currentKey: string, accessObject: Record<string, boolean>) => {
      const keys = Object.keys(accessObject);
      const startIndex = keys.indexOf(currentKey) + 1;
      if (keys.slice(startIndex).find(key => accessObject[key]) === 'user') {
        store.showTour = false;
        store.toggleNavigatorInSidebar();
      }

      return keys.slice(startIndex).find(key => accessObject[key]);
    };
    tour.addStep({
      attachTo: { element: '#userDefault_product_tour', on: 'bottom-end' },
      cancelIcon: {
        enabled: true,
      },
      classes: 'rtl-tour !bg-primary !text-text-onPrimary custom-tour-step mt-sm',
      id: 'userDefault',
      text: t('_helper.tour_steps.text_userDefault'),
      title: t('_common.page_title.user_profile'),
    });
    setTimeout(() => {
      const access = {
        dashboard: !!componentRef.value.$refs.dashboard,
        session: !!componentRef.value.$refs.session,
        reconciliation: !!componentRef.value.$refs.reconciliation,
        'instant-payout': !!componentRef.value.$refs['instant-payout'],
        payout: !!componentRef.value.$refs.payout,
        product: !!componentRef.value.$refs.product,
        coupon: !!componentRef.value.$refs.coupon,
        'zarin-link': !!componentRef.value.$refs['zarin-link'],
        settings: !!componentRef.value.$refs.settings,
        user: true,
      };
      componentRef.value.$refs.dashboard &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.dashboard[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                if (breakpoint.sm < window.innerWidth) {
                  tour.show('terminal');
                } else {
                  store.showTour = false;
                  store.toggleNavigatorInSidebar();
                  tour.show('menu');
                }
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('dashboard', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'dashboard',
          text: t('_helper.tour_steps.text_dashboard'),
          title: t('_common.links.dashboard'),
        });
      componentRef.value.$refs.session &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.session[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('session', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'session',
          text: t('_helper.tour_steps.text_session'),
          title: t('_common.links.session'),
        });
      componentRef.value.$refs.reconciliation &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.reconciliation[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('reconciliation', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'reconciliation',
          text: t('_helper.tour_steps.text_reconciliation'),
          title: t('_common.links.reconcile'),
        });
      componentRef.value.$refs['instant-payout'] &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs['instant-payout'][0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('instant-payout', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'instant-payout',
          text: t('_helper.tour_steps.text_instant_payout'),
          title: t('_common.links.instant_payout'),
        });
      componentRef.value.$refs.payout &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.payout[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('payout', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'payout',
          text: t('_helper.tour_steps.text_payout'),
          title: t('_common.links.payout'),
        });
      componentRef.value.$refs.product &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.product[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('product', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'product',
          text: t('_helper.tour_steps.text_product'),
          title: t('_common.links.product'),
        });
      componentRef.value.$refs.coupon &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.coupon[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('coupon', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'coupon',
          text: t('_helper.tour_steps.text_coupon'),
          title: t('_common.links.coupon'),
        });
      componentRef.value.$refs['zarin-link'] &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs['zarin-link'][0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                tour.show(findNextAccessibleKey('zarin-link', access));
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'zarin-link',
          text: t('_helper.tour_steps.text_zarinLink'),
          title: t('_common.links.zarin_link'),
        });
      componentRef.value.$refs.settings &&
        tour.addStep({
          attachTo: {
            element: componentRef.value.$refs.settings[0],
            on: breakpoint.sm < window.innerWidth ? 'left' : 'bottom',
          },
          buttons: [
            {
              action() {
                tour.back();
              },
              classes: '!bg-primary !text-surface',
              text: t('_common.buttons.previews'),
            },
            {
              action() {
                store.showTour = false;
                store.toggleNavigatorInSidebar();
                tour.show('user');
              },
              classes: '!bg-surface !text-text',
              text: t('_common.buttons.next'),
            },
          ],
          cancelIcon: {
            enabled: true,
          },
          classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-28px] md:mt-0 mt-sm',
          id: 'settings',
          text: t('_helper.tour_steps.text_settings'),
          title: t('_common.links.terminal_settings'),
        });
      tour.addStep({
        attachTo: { element: '#user_product_tour', on: 'bottom-end' },
        buttons: [
          {
            action() {
              if (breakpoint.sm > window.innerWidth) {
                store.showTour = true;
                store.menuState = Status.VISIBLE;
              }
              tour.back();
            },
            classes: '!bg-primary !text-surface',
            text: t('_common.buttons.previews'),
          },
          {
            action() {
              tour.show('notification');
            },
            classes: '!bg-surface !text-text',
            text: t('_common.buttons.next'),
          },
        ],
        cancelIcon: {
          enabled: true,
        },
        classes: 'rtl-tour !bg-primary !text-text-onPrimary mt-sm',
        id: 'user',
        text: t('_helper.tour_steps.text_user'),
        title: t('_common.page_title.user_profile'),
      });
      tour.addStep({
        attachTo: { element: '#notification_product_tour', on: 'bottom-end' },
        buttons: [
          {
            action() {
              tour.back();
            },
            classes: '!bg-primary !text-surface',
            text: t('_common.buttons.previews'),
          },
          {
            action() {
              tour.show('ticket');
            },
            classes: '!bg-surface !text-text',
            text: t('_common.buttons.next'),
          },
        ],
        cancelIcon: {
          enabled: true,
        },
        classes: 'rtl-tour !bg-primary !text-text-onPrimary mt-sm',
        id: 'notification',
        text: t('_helper.tour_steps.text_notification'),
        title: t('sandbox.notifications.title'),
      });
      tour.addStep({
        attachTo: { element: '#ticket_product_tour', on: 'bottom-end' },
        buttons: [
          {
            action() {
              tour.back();
            },
            classes: '!bg-primary !text-surface',
            text: t('_common.buttons.previews'),
          },
          {
            action() {
              tour.complete();
            },
            classes: '!bg-surface !text-text',
            text: t('date.end'),
          },
        ],
        cancelIcon: {
          enabled: true,
        },
        classes: 'rtl-tour !bg-primary !text-text-onPrimary mt-sm',
        id: 'ticket',
        text: t('_helper.tour_steps.text_ticket'),
        title: t('_common.page_title.tickets'),
      });
      tour.addStep({
        attachTo: {
          element:
            breakpoint.sm < window.innerWidth
              ? '#product_tour_terminal'
              : '#terminal_product_tour_sm',
          on: breakpoint.sm < window.innerWidth ? 'left-end' : 'bottom',
        },
        buttons: [
          {
            action() {
              breakpoint.sm < window.innerWidth ? tour.show('dashboard') : tour.show('menu');
            },
            classes: '!bg-surface !text-text',
            text: t('_common.buttons.next'),
          },
        ],
        cancelIcon: {
          enabled: true,
        },
        classes: 'rtl-tour !bg-primary !text-text-onPrimary md:ml-[-12px] lg:mt-0 mt-sm',
        id: 'terminal',
        text: t('_helper.tour_steps.text_terminal'),
        title: t('sandbox.terminals.title'),
      });
      tour.addStep({
        attachTo: { element: '#product_tour_menu', on: 'bottom' },
        buttons: [
          {
            action() {
              tour.show('terminal');
            },
            classes: '!bg-primary !text-surface',
            text: t('_common.buttons.previews'),
          },
          {
            action() {
              store.showTour = true;
              store.menuState = Status.VISIBLE;
              tour.show('dashboard');
            },
            classes: '!bg-surface !text-text',
            text: t('_common.buttons.next'),
          },
        ],
        cancelIcon: {
          enabled: true,
        },
        classes: 'rtl-tour !bg-primary !text-text-onPrimary mt-sm',
        id: 'menu',
        text: t('_helper.tour_steps.text_menu'),
        title: t('_common.page_title.menu_item'),
      });
    }, 1000);
  };

  return {
    handleAddStep,
  };
};
