globalThis.__timing__.logStart('Load chunks/build/MetricCard-CDSLylAv');import { c as _sfc_main$3, j as _sfc_main$f } from './server.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MetricCard",
  __ssrInlineRender: true,
  props: {
    description: {},
    icon: {},
    label: {},
    value: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$3;
      const _component_UIcon = _sfc_main$f;
      _push(ssrRenderComponent_1(_component_UCard, vueExports.mergeProps({ class: "warm-card rounded-[1.75rem] border border-charcoal-200" }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between gap-4"${_scopeId}><div class="space-y-2"${_scopeId}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId}>${ssrInterpolate_1(__props.label)}</p><p class="barbershop-heading text-3xl text-charcoal-950"${_scopeId}>${ssrInterpolate_1(__props.value)}</p>`);
            if (__props.description) {
              _push2(`<p class="text-sm leading-6 text-charcoal-500"${_scopeId}>${ssrInterpolate_1(__props.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.icon) {
              _push2(`<div class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brass-100 text-brass-800"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: __props.icon,
                class: "size-5"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                vueExports.createVNode("div", { class: "space-y-2" }, [
                  vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, vueExports.toDisplayString(__props.label), 1),
                  vueExports.createVNode("p", { class: "barbershop-heading text-3xl text-charcoal-950" }, vueExports.toDisplayString(__props.value), 1),
                  __props.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                    key: 0,
                    class: "text-sm leading-6 text-charcoal-500"
                  }, vueExports.toDisplayString(__props.description), 1)) : vueExports.createCommentVNode("", true)
                ]),
                __props.icon ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brass-100 text-brass-800"
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: __props.icon,
                    class: "size-5"
                  }, null, 8, ["name"])
                ])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/MetricCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main, { __name: "DashboardMetricCard" });

export { __nuxt_component_5 as _ };;globalThis.__timing__.logEnd('Load chunks/build/MetricCard-CDSLylAv');
//# sourceMappingURL=MetricCard-CDSLylAv.mjs.map
