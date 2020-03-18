import {action, observable} from 'mobx';

class UserStore {
  @observable public info = {};

  @observable public baseInfo = {
    name: '',
    phone: '',
    location: '',
  };

  @action public setInfo(data: {}) {
    this.info = data;
  }

  @action public setBaseInfo(data: {
    name: string;
    phone: string;
    location: string;
  }) {
    this.baseInfo = {...this.baseInfo, ...data};
  }
}
export default UserStore;
