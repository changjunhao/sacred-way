import {makeObservable, observable, action} from 'mobx';

class TokenStore {
  public isLoading = true;
  public token = '';

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      token: observable,
      setToken: action,
      setIsLoading: action,
    });
  }

  public setToken(data: string) {
    this.token = data;
  }
  public setIsLoading(data: boolean) {
    this.isLoading = data;
  }
}
export default new TokenStore();
