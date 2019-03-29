import { action, observable } from 'mobx';

class UserStore {
  @observable public info = {};

  @action public setInfo(data) {
    this.info = data;
  }
}
export default UserStore;
