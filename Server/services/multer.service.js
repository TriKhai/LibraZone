// multer upload file: Lưu hình vào file server
const multer = require("multer");

// tạo dir dựa vào path
const mkdirp = require("mkdirp");

class MulterService {
  async uploadImage(type) {
    try {
      // tạo dir type dựa vào path
      mkdirp.sync(`./public/data/uploads/${type}`);

      // tạo nơi lưu và tên file
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          console.log(file);
          cb(null, `./public/data/uploads/${type}`); //Tao đường dẫn lưu file
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + "_" + file.originalname); //Tạo tên file = time hiện tại + tên file
        },
      });

      // filter file dựa vào đuôi
      const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
          console.log(file);
          const extensionImageList = [".png", ".jpg"];
          const extension = file.originalname.slice(-4); // lấy 4 ký tự cuối
          const check = extensionImageList.includes(extension); // check coi có trong extensionImageList không
          if (check) {
            cb(null, true);
          } else {
            cb(new Error("extention không hợp lệ !"), false);
          }
        },
      });

      // upload file dựa vào key là type
      return upload.single("image");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteImgage(imagePath) {
    const fullPath = path.join(__dirname, "..", imagePath);
    try {
      fs.unlinkSync(fullPath);
      console.log("Ảnh đã bị xóa thành công:", imagePath);
    } catch (err) {
      console.error("Lỗi khi xóa ảnh:", err);
    }
  }
}

module.exports = new MulterService();
