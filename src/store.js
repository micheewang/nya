import { testFuntion, warn } from './tool';

// 组件间的数据通信,只管运输,不管储存
// 是一个仓库一对多组件的形式
// 只能有一个提供者,但可以有多个接收者
// 提供者也可以作为接受者
export class Store {
  constructor(request, response) {
    testFuntion(request);

    this.request = request;
    this.response = response;
    this.wants = new Set();
  }

  //主动发送给所有的组件
  emit() {
    this.wants.forEach((want) => want());
  }

  //解绑
  unbind(want) {
    if (this.wants.has(want)) {
      this.wants.delete(want);
    }
  }

  //创建want|send
  createBranch(receiver) {
    testFuntion(receiver);

    //want
    const want = () => {
      this.request(orign, orign.from);
    };

    //send
    const send = (data) => {
      if (this.response) {
        this.response(data, orign.from);
      } else {
        warn('The store has no function to receive this parameter');
      }
    };

    //传递给request函数的参数
    function orign(data) {
      receiver(data);
    }

    //监控来源
    orign.from = function () {
      return { receiver, want, send };
    };

    this.wants.add(want);
    return [want, send];
  }
}

export function createStore(...args) {
  return new Store(...args);
}
