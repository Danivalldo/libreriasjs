import 'overlayscrollbars/overlayscrollbars.css';
import './style.css'
import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin
} from 'overlayscrollbars';

const osLeft = OverlayScrollbars(document.querySelector('.left-pan'), { paddingAbsolute: false });
const osRight = OverlayScrollbars(document.querySelector('.right-pan'), { paddingAbsolute: true });

document.querySelectorAll('.gallery').forEach((el) => {
  OverlayScrollbars(el, {
    plugins: {
      ScrollbarsHidingPlugin,
      SizeObserverPlugin,
      ClickScrollPlugin
    }
  });
});

const updateScrolls = (islandId) => {
  document.querySelectorAll('.mark').forEach(mark => {
    mark.classList.remove('active');
  });
  document.querySelectorAll('.nav-element').forEach(navElement => {
    navElement.classList.remove('active');
  });
  updateScrollLeft(islandId);
  updateScrollRight(islandId);
}

const updateScrollLeft = (islandId) => {
  const { scrollOffsetElement } = osLeft.elements();

  const introIcon = document.querySelector(`.island-description[data-island="${islandId}"]`).querySelector('.intro-island-icon');

  const scrollTop = introIcon.offsetTop - 150;

  scrollOffsetElement.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: scrollTop,
  });
}

const updateScrollRight = (islandId) => {

  const { scrollOffsetElement } = osRight.elements();

  const mark = document.querySelector(`.mark[data-island="${islandId}"]`);
  const navElement = document.querySelector(`.nav-element[data-island="${islandId}"]`);
  const panRight = document.querySelector('.right-pan');

  const panRightSizes = panRight.getBoundingClientRect();
  const markSize = mark.getBoundingClientRect();

  mark.classList.add('active');
  navElement.classList.add('active');

  const scrollLeft = mark.offsetLeft;
  const scrollTop = mark.offsetTop;

  scrollOffsetElement.scrollTo({
    behavior: 'smooth',
    left: scrollLeft - (panRightSizes.width / 2),
    top: scrollTop - (panRightSizes.height / 2) + (markSize.height / 2),
  });
}


document.querySelectorAll('[data-island]').forEach(islandLink => {
  islandLink.addEventListener('click', (e) => {
    e.preventDefault();
    updateScrolls(islandLink.dataset.island);
  })
})
