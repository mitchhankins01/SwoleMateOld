import { observable } from 'mobx';

class ObservableStore {
  @observable showSuccessDropdown = false;

}

export default new ObservableStore();
