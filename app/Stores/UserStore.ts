import {makeObservable, action, observable} from 'mobx';

class UserStore {
  public infoEdit = false;
  public info = {};

  public baseInfo = {
    name: '',
    phone: '',
    location: '',
  };

  constructor() {
    makeObservable(this, {
      infoEdit: observable,
      info: observable,
      baseInfo: observable,
      setInfo: action,
      setInfoEdit: action,
      setBaseInfo: action,
    });
  }

  public setInfo(data: {}) {
    this.info = data;
  }

  public setInfoEdit(data: boolean) {
    this.infoEdit = data;
  }

  public setBaseInfo(data: {name: string; phone: string; location: string}) {
    this.baseInfo = {...this.baseInfo, ...data};
  }
}
export default UserStore;
