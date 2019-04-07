let BASEURL = 'https://staging-dev-ce.meimiaoip.com/index.php';

if (__DEV__) {
  BASEURL = 'https://cy-api.meimiaoip.com/index.php';
}

export default { BASEURL };
