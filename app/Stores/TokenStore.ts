import {action, observable} from 'mobx';

class TokenStore {
  @observable public isLoading = true;
  @observable public token = '';

  @action public setToken(data: string) {
    this.token = data;
  }
  @action public setIsLoading(data: boolean) {
    this.isLoading = data;
  }
}
export default new TokenStore();
