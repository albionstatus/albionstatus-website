import { computed, onBeforeMount, ref } from "vue";

const AD_SLOT_ID = "2610490971";

function createBaitElement() {
  const element = document.createElement("div");
  element.setAttribute(
    "class",
    "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
  );
  element.setAttribute(
    "style",
    "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
  );
  document.body.appendChild(element);
  return element;
}

function checkForAdblock(): Promise<boolean> {
  return new Promise((resolve) => {
    const bait = createBaitElement();
    setTimeout(() => {
      const style = window.getComputedStyle(bait, null);
      const isBaitHidden =
        style.getPropertyValue("display") === "none" ||
        style.getPropertyValue("visibility") === "hidden";

      const adElement = document.querySelector(".adsbygoogle");
      const adNotProcessed =
        adElement instanceof HTMLElement ? adElement.dataset.adsbygoogleStatus !== "done" : true;

      // AdSense injects a 1x1px empty iframe when it can't serve an ad (e.g. domain not approved)
      const adUnfilled =
        adElement instanceof HTMLElement
          ? adElement.dataset.adStatus === "unfilled" ||
            (adElement.querySelector("iframe")?.clientHeight ?? 0) <= 1
          : false;

      document.body.removeChild(bait);
      resolve(isBaitHidden || adNotProcessed || adUnfilled);
    }, 1);
  });
}

export function useAdLogic(_currentPath: string) {
  const notInLegalView = computed(() => true);
  const hasAdblock = ref(false);

  onBeforeMount(async () => {
    if (document.readyState === "complete") {
      hasAdblock.value = await checkForAdblock();
    } else {
      window.addEventListener(
        "load",
        async () => {
          hasAdblock.value = await checkForAdblock();
        },
        { once: true },
      );
    }
  });

  return {
    hasAdblock,
    notInLegalView,
    adSlotId: AD_SLOT_ID,
  };
}
