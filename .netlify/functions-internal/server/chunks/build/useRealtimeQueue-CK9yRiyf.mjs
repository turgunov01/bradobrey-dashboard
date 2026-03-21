globalThis.__timing__.logStart('Load chunks/build/useRealtimeQueue-CK9yRiyf');import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { f as useSessionStore, as as useState } from './server.mjs';
import { v as vueExports } from '../routes/renderer.mjs';

function useRealtimeQueue() {
  const branchStore = useBranchStore();
  const sessionStore = useSessionStore();
  const isConnected = useState("realtime-connected", () => false);
  const socketRef = useState("realtime-socket", () => null);
  function joinBranchRoom() {
    const branchId = branchStore.activeBranchId || sessionStore.barber?.branch_id;
    if (!branchId || !socketRef.value) {
      return;
    }
    socketRef.value.emit("join_branch", String(branchId));
  }
  vueExports.watch(
    () => branchStore.activeBranchId || sessionStore.barber?.branch_id,
    () => {
      joinBranchRoom();
    }
  );
  return {
    isConnected
  };
}

export { useRealtimeQueue as u };;globalThis.__timing__.logEnd('Load chunks/build/useRealtimeQueue-CK9yRiyf');
//# sourceMappingURL=useRealtimeQueue-CK9yRiyf.mjs.map
