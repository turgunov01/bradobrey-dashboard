globalThis.__timing__.logStart('Load chunks/build/JsonBlock-DvPUbwNJ');import { c as _sfc_main$3 } from './server.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "JsonBlock",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$3;
      _push(ssrRenderComponent_1(_component_UCard, vueExports.mergeProps({ class: "warm-card rounded-[1.5rem] border border-charcoal-200" }, _attrs), vueExports.createSlots({
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<pre class="overflow-auto text-xs leading-6 text-charcoal-700"${_scopeId}>${ssrInterpolate_1(JSON.stringify(__props.value, null, 2))}</pre>`);
          } else {
            return [
              vueExports.createVNode("pre", { class: "overflow-auto text-xs leading-6 text-charcoal-700" }, vueExports.toDisplayString(JSON.stringify(__props.value, null, 2)), 1)
            ];
          }
        }),
        _: 2
      }, [
        __props.label ? {
          name: "header",
          fn: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal-500"${_scopeId}>${ssrInterpolate_1(__props.label)}</p>`);
            } else {
              return [
                vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.22em] text-charcoal-500" }, vueExports.toDisplayString(__props.label), 1)
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/JsonBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main, { __name: "SharedJsonBlock" });

export { __nuxt_component_10 as _ };;globalThis.__timing__.logEnd('Load chunks/build/JsonBlock-DvPUbwNJ');
//# sourceMappingURL=JsonBlock-DvPUbwNJ.mjs.map
