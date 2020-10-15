import {makeAutoObservable} from 'mobx';

class TokenStore {
  constructor() {
    makeAutoObservable(this)
  }
  public isLoading = true;
  public token = '';

  public setToken(data: string) {
    this.token = data;
  }
  public setIsLoading(data: boolean) {
    this.isLoading = data;
  }
}
export default new TokenStore();
