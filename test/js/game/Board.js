import { TAG, createComponent } from '../../../dist/index.esm.js';
import Square from './Square.js';

const { Div } = TAG;

export default createComponent(({ props }) => {
  const getSquare = (i) => {
    return Square({
      value: props.squares[i],
      onClick() {
        props.onClick(i);
      },
    });
  };

  return () =>
    Div([
      Div({ class: 'board-row' }, [getSquare(0), getSquare(1), getSquare(2)]),
      Div({ class: 'board-row' }, [getSquare(3), getSquare(4), getSquare(5)]),
      Div({ class: 'board-row' }, [getSquare(6), getSquare(7), getSquare(8)]),
    ]);
});
