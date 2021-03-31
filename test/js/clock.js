const {
  createComponent,
  useChapter,
  useMouted,
  useUnMouted,
  useUpdate,
  TAG,
} = nya;

const { Div } = TAG;

export default createComponent(() => {
  const [getTime, setTime] = useChapter(new Date().toTimeString());
  let timer = null;

  useMouted(() => {
    setInterval(() => {
      setTime(new Date().toTimeString());
    }, 1000);
  });

  useUpdate(() => {
    document.title = getTime();
  });

  useUnMouted(() => {
    clearInterval(timer);
  });

  return (time) => Div({ class: 'clock' }, [time]);
});
