/* eslint-disable */
// @ts-nocheck

export default defineNuxtPlugin(() => {
  if (process.client) {
    (function (d, w, u, t, s, i) {
      w.addEventListener('readystatechange', function () {
        if (w.readyState === 'interactive') i = document.documentElement.scrollTop;
      });
      function ha() {
        s = w.createElement('script');
        d._hantanaSettings = { tId: t, i: i };
        (s.type = 'text/javascript'), (s.async = !0), (s.src = u + t);
        let h = w.getElementsByTagName('head')[0];
        h.appendChild(s);
      }
      'complete' === w.readyState
        ? ha()
        : d.attachEvent
        ? d.attachEvent('onload', ha)
        : d.addEventListener('load', ha, !1);
    })(window, document, 'https://hantana.org/widget/', '5f78e-f5719-31f52-362ab', 0);
  }
});
