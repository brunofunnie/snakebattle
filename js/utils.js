export const findObjectsWithCoordinates = (arr, targetX, targetY) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].x === targetX && arr[i].y === targetY) {
        return arr[i];
      }
    }
  }