export interface SmoothScrollArgs {
  enableSmoothScroll?: boolean;
  pushStateBehavior?: (hash: string) => void;
}

export function smoothScroll({
  enableSmoothScroll = false,
  pushStateBehavior,
}: SmoothScrollArgs) {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  for (const item of anchorLinks as any) {
    item.addEventListener("click", (e: Event) => {
      e.preventDefault();

      const hashValue = item.getAttribute("href");
      let target = document.querySelector(hashValue);

      const scrollIntoView = target.scrollIntoView;
      if (
        enableSmoothScroll &&
        scrollIntoView &&
        typeof scrollIntoView === "function"
      ) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        let top = 0;
        while (target) {
          top += target.offsetTop;
          target = target.offsetParent;
        }
        window.scrollTo(0, top);
      }

      pushStateBehavior
        ? pushStateBehavior(hashValue)
        : window.history.pushState(null, "", hashValue);
    });
  }
}
