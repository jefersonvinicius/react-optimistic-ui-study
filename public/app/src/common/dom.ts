export function scrollToEndPageAfterTime(time = 500) {
  setTimeout(() => {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: document.body.scrollHeight,
    });
  }, time);
}
