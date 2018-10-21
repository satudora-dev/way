export const firebaseConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      apiKey: "AIzaSyCBXWCzAv-oAT-HlUgNdHHIgh7fl2O5uDE",
      authDomain: "whoareyou-dev.firebaseapp.com",
      databaseURL: "https://whoareyou-dev.firebaseio.com",
      projectId: "whoareyou-dev",
      storageBucket: "whoareyou-dev.appspot.com",
      messagingSenderId: "944348152216"
    };
  } else if (process.env.NODE_ENV === 'test') {
    // developmentととりあえず同じ
    return {
      apiKey: "AIzaSyCBXWCzAv-oAT-HlUgNdHHIgh7fl2O5uDE",
      authDomain: "whoareyou-dev.firebaseapp.com",
      databaseURL: "https://whoareyou-dev.firebaseio.com",
      projectId: "whoareyou-dev",
      storageBucket: "whoareyou-dev.appspot.com",
      messagingSenderId: "944348152216"
    };
  } else if (process.env.NODE_ENV === 'production') {
    return {
      apiKey: "AIzaSyAPqTg9vMyEenl5t7XR9pdakgaUqa4WdOY",
      authDomain: "whoareyou-c231f.firebaseapp.com",
      databaseURL: "https://whoareyou-c231f.firebaseio.com",
      projectId: "whoareyou-c231f",
      storageBucket: "whoareyou-c231f.appspot.com",
      messagingSenderId: "43340297718"
    };
  }
  return {}
}
