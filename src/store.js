import { noop, testFuntion } from './tool';

// 组件间的数据通信,只管运输,不管储存
// 是一个仓库一对多组件的形式
// 只能有一个提供者,但可以有多个接收者
// 提供者也可以作为接受者
export class Store {
  constructor(responder, recipient) {
    testFuntion(responder);
    this.responder = responder;
    this.recipient = recipient || noop;
    this.wants = new Set();
  }

  send() {
    this.wants.forEach((d) => d());
  }

  unbind(want) {
    if (this.wants.has(want)) {
      this.wants.delete(want);
    }
  }

  //obtain send
  createTruck(receiver) {
    testFuntion(receiver);
    let want = () => {
      this.responder((data) => {
        receiver(data);
      });
    };
    let send = (data) => this.recipient(data);
    this.wants.add(want);
    return [want, send];
  }
}

export function createStore(...args) {
  return new Store(...args);
}
