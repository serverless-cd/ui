class Store {
  watchingData: object = {};
  setWatchingData(value: object) {
    this.watchingData = value;
  }
  schema: object = {};
  setSchema(value: object) {
    this.schema = value;
  }
}

export default new Store();
