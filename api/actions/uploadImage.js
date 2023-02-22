import fs from 'fs';
import mkdirp from 'mkdirp';
import moment from 'moment';

export default function uploadImage(req) {
  let fstream;
  req.pipe(req.busboy);
  return new Promise((resolve, reject) => {
    req.busboy.on('file', (fieldname, file, filename) => {
      console.log("Uploading: " + filename);
      const pre_path = __dirname + '/../../static';
      const base_path = '/upload/images/' + moment().format('YYYYMMDD') + '/';
      const real_path = pre_path + base_path;
      const image_name = (new Date()).getTime() + '_' + filename;

      mkdirp.sync(real_path);

      fstream = fs.createWriteStream(real_path + image_name);
      file.pipe(fstream);
      fstream.on('close', () => {
        resolve({
          success: true,
          status: 200,
          data: {
            link: base_path + image_name
          }
        });
      })
    })
  });
}
