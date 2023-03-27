class Storage{
  static getInstance(){
    if(!Storage.instance){
      Storage.instance = new localStorage()
    }
    return Storage.instance
  }

  get 
}