// code modified from: https://github.com/facebook/docusaurus/blob/e486d3d1b0e0a397f242368357fbedbe767104c7/packages/docusaurus-1.x/lib/static/js/scrollSpy.js
export interface ScrollSpyArgs {
  selector: string; // must contains anchor html tag
  offset?: number;
  cachingHeadings?: boolean;
  callback?: (hash: string) => void;
}

type Headings = NodeListOf<HTMLAnchorElement & { href: string }>;

export function scrollSpy({
  selector,
  offset = 10,
  cachingHeadings = true,
  callback,
}: ScrollSpyArgs) {
  let headingsCache: Headings;
  let activeHash: string = "";
  let timer: any;

  const findHeadings = (): Headings => {
    if (cachingHeadings && headingsCache) {
      return headingsCache;
    }
    return document.querySelectorAll(selector);
  };

  function onScroll() {
    if (timer) {
      // throttle
      return;
    }

    timer = setTimeout(() => {
      timer = null;

      let activeNavFound = false;
      const headings = findHeadings();

      for (let i = 0; i < headings.length; i++) {
        let currNavActive = !activeNavFound;

        if (currNavActive && i < headings.length - 1) {
          const heading = headings[i + 1];
          if (!heading.href) {
            return null;
          }

          const next = decodeURIComponent(heading.href.split("#")[1]);
          const nextHeader = document.getElementById(next);

          if (nextHeader) {
            const top = nextHeader.getBoundingClientRect().top;
            currNavActive = top > offset;
          } else {
            console.error("Can not find header element", {
              id: next,
              heading,
            });
          }
        }

        if (currNavActive && activeHash !== headings[i].hash) {
          activeNavFound = true;
          activeHash = headings[i].hash.slice(1);
          headings[i].classList.add("active");
          callback && callback(activeHash);
        } else {
          headings[i].classList.remove("active");
        }
      }
    }, 0);
  }

  function domContentLoaded() {
    headingsCache = findHeadings();
    onScroll();
  }

  function addListeners() {
    document.addEventListener("scroll", onScroll);
    document.addEventListener("resize", onScroll);
    document.addEventListener("DOMContentLoaded", domContentLoaded);
  }

  function removeListeners() {
    document.removeEventListener("scroll", onScroll);
    document.removeEventListener("resize", onScroll);
    document.removeEventListener("DOMContentLoaded", domContentLoaded);
  }

  addListeners();
  onScroll();
  return removeListeners;
}
