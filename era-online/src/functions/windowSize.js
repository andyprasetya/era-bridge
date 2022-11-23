// Get window dimension
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const isSmallWindow = () => {
  const windowDimensions = getWindowDimensions();
  if (windowDimensions.width >= 1024) {
    return false;
  }
  return true;
};
