import {makeAutoObservable} from 'mobx';

class UserStore {

  constructor() {
    makeAutoObservable(this)
  }
  public infoEdit = false;
  public info = {};

  public baseInfo = {
    name: '',
    phone: '',
    location: '',
  };

  public setInfo(data: {}) {
    this.info = data;
  }

  public setInfoEdit(data: boolean) {
    this.infoEdit = data;
  }

  public setBaseInfo(data: {
    name: string;
    phone: string;
    location: string;
  }) {
    this.baseInfo = {...this.baseInfo, ...data};
  }
}
export default UserStore;
