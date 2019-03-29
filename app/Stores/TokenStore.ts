import { action, observable } from 'mobx';

class TokenStore {
  @observable public token = '';

  @action public setToken(data) {
    this.token = data;
  }
}
export default new TokenStore();
