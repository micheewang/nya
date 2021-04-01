import { createComponent, TAG, useChapter } from '../../../dist/index.esm.js';
import Board from './Board.js';

const { Div, Ol, Li, Button } = TAG;

export default createComponent(() => {
  //数据声明
  const [getState, setState] = useChapter({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    step: 0,
    status,
    xIsNext: true,
  });

  //点击事件回调函数
  const handler = (i) => {
    //获取当前状态
    const state = getState();
    const history = state.history.slice();
    const current = history[0];
    const squares = current.squares.slice();

    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    }
    squares[i] = state.xIsNext ? 'X' : 'O';

    history.unshift({ squares });
    //修改数据
    setState({
      history,
      status,
      step: 0,
      xIsNext: !state.xIsNext,
    });
  };

  //跳转
  const moves = () =>
    getState().history.map((move, step) => {
      const desc = step ? 'Go to move #' + step : 'Go to game start';
      return Li([
        Button(
          {
            onClick() {
              jumpTo(step);
            },
          },
          [desc]
        ),
      ]);
    });
  const jumpTo = (move) => {
    let state = getState();
    setState(Object.assign({}, state, { step: state.history.length - move - 1 }));
  };

  return (state) =>
    Div({ class: 'game' }, [
      Div({ class: 'game-board' }, [
        //实例
        Board({
          squares: state.history[state.step].squares,
          onClick: (i) => handler(i),
        }),
      ]),
      Div({ class: 'game-info' }, [
        //获胜box
        Div(status),
        Ol(moves()),
      ]),
    ]);
});

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
