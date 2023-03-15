export const uid = (function () {
  let uid = 0;
  return () => uid++;
})();
