const { createComponent, useChapter, useMouted, useUnMouted, TAG } = nya;
const { Div } = TAG;

export default createComponent(() => {
  const [getData, setData] = useChapter(new Date().toTimeString());
  let timer = null;

  useMouted(() => {
    setInterval(() => {
      setData(new Date().toTimeString());
    }, 1000);
  });

  useUnMouted(() => {
    clearInterval(timer);
  });

  return (time) => Div({ class: 'clock' }, [time]);
});
