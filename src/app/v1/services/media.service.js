class MediaService {
  async uploadS3() {
    const data = {
      id: "id",
      name: "name",
    };
    return data;
  }
  async RemoveS3(data) {
    console.log(data);
    return data;
  }
}

module.exports = new MediaService();
