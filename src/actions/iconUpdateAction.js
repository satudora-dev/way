import { firebaseDB, firebaseStorage } from '../firebase';
import EXIF from 'exif-js';
import { storage } from 'firebase';

const userRef = firebaseDB.ref('users');
const storageRef = firebaseStorage.ref();

export const updateIcon = (icon, userKey) =>
  dispatch => {
    if (!icon) return;

    /*
    optimizeImage(icon, 
        iconFile => uploadIcon(iconFile, userKey, dispatch));
    */
    uploadIcon(icon, userKey, dispatch);
  }

function uploadIcon(iconFile, userKey, dispatch) {
  let key = 'icons/' + userKey;
  let targetRef = storageRef.child(key);
  targetRef.put(iconFile).then(snapshot => {
    targetRef.getDownloadURL().then(url => {
      userRef.child(userKey).update({//onで呼ばない
        icon: url,
      }).catch(error => {
        dispatch({
          type: 'UPDATE_IMAGE_ERROR',
          message: error.message,
        });
      });
    });
  });
}

function optimizeImage(iconFile, uploadIcon) {
  let image = new Image();
  image.onload = () => {
    let width = image.naturalWidth;
    let height = image.naturalHeight;
    let maxWidth = 512;
    if (width < maxWidth) {
      uploadIcon(iconFile);
    }
    else {
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');

      var orientation;

      EXIF.getData(iconFile, () => {
        orientation = iconFile.exifdata.Orientation;

        var image_aspect, canvas_width, canvas_height, draw_width, draw_height;
        //アスペクト取得
        image_aspect = (orientation == 5 || orientation == 6 || orientation == 7 || orientation == 8) ? image.width / image.height : image.height / image.width;

        canvas_width = image.width;
        canvas_height = Math.floor(canvas_width * image_aspect);

        // リサイズ
        const scale = maxWidth / canvas_width;
        const dst_width = maxWidth;
        const dst_height = canvas_height * scale;
        canvas.width = dst_width;
        canvas.height = dst_height;
        ctx.scale(scale, scale);

        //image.src = resizeImage(image, maxWidth);
        console.log(image);

        // iPhoneで撮った写真はブラウザ上で回転してしまう。
        // exifに応じて画像の変換(上下左右反転と回転）

        var draw_width = canvas_width;
        var draw_height = canvas_height;

        switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, canvas_width, 0);
            break;

          case 3:
            ctx.transform(-1, 0, 0, -1, canvas_width, canvas_height);
            break;

          case 4:
            ctx.transform(1, 0, 0, -1, 0, canvas_height);
            break;

          case 5:
            ctx.transform(-1, 0, 0, 1, 0, 0);
            ctx.rotate((90 * Math.PI) / 180);
            draw_width = canvas_height;
            draw_height = canvas_width;
            break;

          case 6:
            ctx.transform(1, 0, 0, 1, canvas_width, 0);
            ctx.rotate((90 * Math.PI) / 180);
            draw_width = canvas_height;
            draw_height = canvas_width;
            break;

          case 7:
            ctx.transform(-1, 0, 0, 1, canvas_width, canvas_height);
            ctx.rotate((-90 * Math.PI) / 180);
            draw_width = canvas_height;
            draw_height = canvas_width;
            break;

          case 8:
            ctx.transform(1, 0, 0, 1, 0, canvas_height);
            ctx.rotate((-90 * Math.PI) / 180);
            draw_width = canvas_height;
            draw_height = canvas_width;
            break;

          default:
            break;
        }

        ctx.drawImage(image, 0, 0, draw_width, draw_height);

        canvas.toBlob(blob => {
          uploadIcon(blob);
        }, 'image/png');
      });
    }
  };
  image.src = URL.createObjectURL(iconFile);
}

// iPhoneで撮った写真はブラウザ上で回転してしまう。
// exifに応じて画像の変換(上下左右反転と回転）
function alignImageOrient(image, orientation) {
  let canvas = document.createElement('canvas');
  let width = image.width;
  let height = image.height;
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');

  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, width, 0);
      break;

    case 3:
      ctx.transform(-1, 0, 0, -1, width, height);
      break;

    case 4:
      ctx.transform(1, 0, 0, -1, 0, height);
      break;

    case 5:
      ctx.transform(-1, 0, 0, 1, 0, 0);
      break;

    case 6:
      ctx.transform(1, 0, 0, 1, width, 0);
      break;

    case 7:
      ctx.transform(-1, 0, 0, 1, width, height);
      break;

    case 8:
      ctx.transform(1, 0, 0, 1, 0, height);
      break;

    default:
      break;
  }

  let drawWidth, drawHeight;
  if (orientation >= 5) {
    ctx.rotate((-90 * Math.PI) / 180);
    drawWidth = height;
    drawHeight = width;
  }
  else {
    drawWidth = width;
    drawHeight = height;
  }
  ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
  return canvas.toDataURL();
}

function resizeImage(image, maxWidth) {
  let canvas = document.createElement('canvas');
  let width = image.width;
  let height = image.height;

  let scale = maxWidth / width.width;
  const dstWidth = maxWidth;
  const dstHeight = height * scale;
  canvas.width = dstWidth;
  canvas.height = dstHeight;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, dstWidth, dstHeight);
  return canvas.toDataURL('image/png');
}