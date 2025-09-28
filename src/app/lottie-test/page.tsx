"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useMapLoadingGate } from "@/hooks/useMapLoadingGate";
import { NODES } from "@/components/trade-map/TradeMap.data";

// Load lottie-react only on the client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
type LottieRef = import("lottie-react").LottieRefCurrentProps;

// Load TradeMap only on the client (arcs disabled here; only regions/nodes as base)
const TradeMap = dynamic(() => import("@/components/trade-map/TradeMap"), { ssr: false });

const IMPORTANT_REGIONS = ["TR", "UZ", "KZ", "AZ", "HU"];

export default function LottieTradeMapTest() {
  const reduced = useReducedMotion();
  const ref = useRef<LottieRef | null>(null);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [url, setUrl] = useState("/lottie/trade-map.json");
  const [loop, setLoop] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [geoReady, setGeoReady] = useState(false);
  const [stablePaint, setStablePaint] = useState(false);
  const [stage, setStage] = useState<"loading" | "map" | "reveal" | "flows">("loading");
  const [revealedRegions, setRevealedRegions] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { spinnerVisible, spinnerFading } = useMapLoadingGate(
    { geoReady, stablePaint },
    { minMs: 600, maxMs: 6000, fadeMs: 150 }
  );

  // Speed control
  useEffect(() => { ref.current?.setSpeed?.(speed); }, [speed]);

  // Preload default Lottie JSON if present
  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) { setStatus("Varsayılan Lottie bulunamadı: " + url); return; }
        const j = await res.json();
        if (!canceled) setData(j);
        setStatus("Yüklendi: " + url);
      } catch (e) {
        setStatus("Varsayılan Lottie yüklenemedi");
      }
    })();
    return () => { canceled = true; };
  }, []);

  // Mobile detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Stage machine (same mantık): reveal regions sequentially, then start flows
  useEffect(() => {
    if (reduced) {
      setRevealedRegions(IMPORTANT_REGIONS);
      setStage("flows");
      return;
    }
    if (!geoReady) return;
    const t0 = performance.now();
    const spinner = window.setTimeout(() => {
      setStage("map");
      const order = IMPORTANT_REGIONS.slice();
      let i = 0;
      const step = () => {
        if (i >= order.length) { window.setTimeout(() => setStage("flows"), 250); return; }
        const iso = order[i++];
        setRevealedRegions((prev) => (prev.includes(iso) ? prev : [...prev, iso]));
        window.setTimeout(step, 180);
      };
      window.setTimeout(step, 120);
    }, Math.max(0, 600 - (performance.now() - t0)));
    return () => window.clearTimeout(spinner);
  }, [geoReady, reduced]);

  // When entering flows stage, ensure Lottie starts
  useEffect(() => {
    if (stage === "flows" && data && autoplay) {
      try { ref.current?.goToAndPlay?.(0, true); } catch {}
    }
  }, [stage, data, autoplay]);

  const visibleNodes = useMemo(
    () => NODES.filter((n) => revealedRegions.includes(n.region)),
    [revealedRegions]
  );

  const onPickFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const j = JSON.parse(text);
      setData(j);
      setStatus("Yerel dosya yüklendi: " + f.name);
      // Reset stage to re-play when new JSON loaded
      setStage("flows");
    } catch {
      setStatus("Geçersiz JSON");
    }
  };

  const onLoadFromUrl = async () => {
    try {
      setStatus("Yükleniyor …");
      const res = await fetch(url);
      if (!res.ok) { setStatus("İstek başarısız (" + res.status + ")"); return; }
      const j = await res.json();
      setData(j);
      setStatus("Yüklendi: " + url);
      setStage("flows");
    } catch {
      setStatus("JSON alınamadı");
    }
  };

  const MapArea = (
    <motion.div className="absolute inset-0" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
      <TradeMap
        nodes={visibleNodes}
        arcs={[]}
        showGraticule
        showActiveOverlay
        revealedRegions={revealedRegions}
        reducedMotionFallback={!!reduced}
        className="h-full w-full"
        disableNodeAnimation={isMobile || !!reduced}
        onReady={() => setGeoReady(true)}
        onStablePaint={() => setStablePaint(true)}
      />
      {/* Lottie flows overlay */}
      {data ? (
        // @ts-expect-error dynamic import type
        <Lottie
          lottieRef={ref as any}
          animationData={data}
          loop={loop}
          autoplay={autoplay}
          className="pointer-events-none absolute inset-0"
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice", progressiveLoad: true, hideOnTransparent: true }}
        />
      ) : null}
    </motion.div>
  );

  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
      <main className="min-h-screen bg-white text-[color:var(--ink)]">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <h1 className="text-3xl font-bold mb-2">Lottie TradeMap Test</h1>
          <p className="text-gray-600 mb-6">TradeMap mantığını koruyarak (bölgeleri sırasıyla aç, sonra akışlar) Lottie ile akışları üstte oynatıyoruz.</p>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Controls */}
            <div className="md:col-span-1 space-y-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">Lottie Kaynağı</div>
                <div className="space-y-2">
                  <input type="file" accept="application/json,.json" onChange={onPickFile} className="block w-full text-sm" />
                  <div className="flex gap-2">
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…/file.json veya /lottie/file.json" className="flex-1 border rounded-lg px-3 py-2 text-sm" />
                    <button onClick={onLoadFromUrl} className="btn btn-primary px-4 py-2">Yükle</button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">Varsayılan: /lottie/trade-map.json</div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Loop</label>
                  <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Autoplay</label>
                  <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Speed: {speed.toFixed(2)}x</label>
                  <input type="range" min={0.25} max={2} step={0.05} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full" />
                </div>
                <div className="text-xs text-gray-500">Durum: {status}</div>
              </div>
            </div>

            {/* Preview */}
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-b">Önizleme (1024×520 oran; altta TradeMap, üstte Lottie akışları)</div>
                <div className="relative" style={{ width: "100%", aspectRatio: "1024/520" }}>
                  {MapArea}
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                İpucu: AE/Bodymovin ile path animasyonlarını export ederek akışları Lottie’ye taşıyın. Bu sayfada mantık aynı: bölgeler sırayla açılır, sonra akışlar döngüye girer.
              </div>
            </div>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}
