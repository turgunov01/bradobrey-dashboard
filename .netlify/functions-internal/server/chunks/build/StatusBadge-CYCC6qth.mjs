globalThis.__timing__.logStart('Load chunks/build/StatusBadge-CYCC6qth');import { _ as _sfc_main$1 } from './Badge-CHxj5N7w.mjs';
import { a as formatStatusLabel } from './display-CyQec-Wd.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "StatusBadge",
  __ssrInlineRender: true,
  props: {
    label: {}
  },
  setup(__props) {
    const props = __props;
    const color = vueExports.computed(() => {
      const value = String(props.label || "").toLowerCase();
      if (["completed", "done", "paid", "active", "ready", "success"].includes(value)) {
        return "primary";
      }
      if (["pending", "waiting", "called", "started", "in_progress"].includes(value)) {
        return "warning";
      }
      if (["cancelled", "no_show", "not_in_time", "inactive", "error"].includes(value)) {
        return "error";
      }
      return "neutral";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$1;
      _push(ssrRenderComponent_1(_component_UBadge, vueExports.mergeProps({
        color: vueExports.unref(color),
        variant: "soft"
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate_1(vueExports.unref(formatStatusLabel)(__props.label))}`);
          } else {
            return [
              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatStatusLabel)(__props.label)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/StatusBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main, { __name: "SharedStatusBadge" });

export { __nuxt_component_7 as _ };;globalThis.__timing__.logEnd('Load chunks/build/StatusBadge-CYCC6qth');
//# sourceMappingURL=StatusBadge-CYCC6qth.mjs.map
