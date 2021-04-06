const { useChapter, useUnMouted } = nya;

export function useTruck(store) {
  let [getValue, setValue] = useChapter();
  let [want, send] = store.createTruck(setValue);

  useUnMouted(function () {
    store.unbind(want);
  });

  return [want, send, getValue, setValue];
}
