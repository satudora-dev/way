import { firebaseDB,firebaseStorage } from '../firebase';
import EXIF from 'exif-js';
import { storage } from 'firebase';

const userRef = firebaseDB.ref('users');
const storageRef = firebaseStorage.ref();

export const updateIcon = (icon, userKey) =>
    dispatch => {
        if (!icon) return;

        optimizeImage(icon, 
            iconFile => uploadIcon(iconFile, userKey, dispatch));
    }

function uploadIcon(iconFile, userKey, dispatch) {
    let key = 'icons/' + userKey;
    let targetRef = storageRef.child(key);
    targetRef.put(iconFile).then(snapshot => {
        targetRef.getDownloadURL().then(url => {
            userRef.child(userKey).update({//on�ŌĂ΂Ȃ�
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
        let width = image.width;
        let height = image.height;
        let maxWidth = 512;
        console.log(width);
        console.log(height);
        if (width < maxWidth) {
            uploadIcon(iconFile);
        }
        else {
            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');

            var orientation;
            console.log("onResize");

            EXIF.getData(iconFile, () => {
                orientation = iconFile.exifdata.Orientation;

                var image_aspect, canvas_width, canvas_height, draw_width, draw_height;
                //�A�X�y�N�g�擾
                image_aspect = (orientation == 5 || orientation == 6 || orientation == 7 || orientation == 8) ? image.width / image.height : image.height / image.width;

                canvas_width = image.width;
                canvas_height = Math.floor(canvas_width * image_aspect);

                // ���T�C�Y
                const scale = maxWidth / canvas_width;
                const dst_width = maxWidth;
                const dst_height = canvas_height * scale;
                canvas.width = dst_width;
                canvas.height = dst_height;
                ctx.scale(scale, scale);

                // iPhone�ŎB�����ʐ^�̓u���E�U��ŉ�]���Ă��܂��B
                // exif�ɉ����ĉ摜�̕ϊ�(�㉺���E���]�Ɖ�]�j

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
                        console.log("6!")
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

                // �ϊ���̉摜���X�e�[�g�ɐݒ�
                let transformedImage = canvas.toDataURL('image/png');
                canvas.toBlob(blob => {
                    console.log("upload");
                    uploadIcon(blob);
                }, 'image/png');
            });
        }
    };
    image.src = URL.createObjectURL(iconFile);
}

// iPhone�ŎB�����ʐ^�̓u���E�U��ŉ�]���Ă��܂��B
// exif�ɉ����ĉ摜�̕ϊ�(�㉺���E���]�Ɖ�]�j
/*
function alignImageOrient(iconFile,ctx){
    orientation = iconFile.exifdata.Orientation;

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

    if (orientation >= 5) {
        ctx.rotate((-90 * Math.PI) / 180);
        draw_width = canvas_height;
        draw_height = canvas_width;
    }
}
*/

function resizeImage(){

}