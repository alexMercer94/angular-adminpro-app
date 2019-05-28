export enum EApi {
  // * User
  userServices = '/user',
  getAllUsers = '/user?desde=',

  // * Login
  getLogin = '/login',
  getLoginGoogle = '/login/google',

  // *Images
  getImage = '/img',

  // * Upload images
  uploadImages = '/upload',

  // * Search in especific collection
  searchSpecificCollection = '/busqueda/coleccion/'
}
