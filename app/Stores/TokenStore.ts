import {action, observable} from 'mobx';

class TokenStore {
  @observable public token = '';

  @action public setToken(data: string) {
    this.token = data;
  }
}
export default new TokenStore();
