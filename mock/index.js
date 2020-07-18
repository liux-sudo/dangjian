const baseURL = axios.defaults.baseURL;
const Random = Mock.Random;
const template = {
  "msg|20-40": [
    {
      "pbId|+1": 1,
      "pbImg": () => `./img/photo/img${Random.natural(1, 50)}.jpg`,
      "pbDate|1": "@date",
      "type": () => Number(Random.boolean()),
      "pbDescription": () => Random.cparagraph(0, 5)
    }
  ],
  "code": 0
}

Mock.mock(`${baseURL}party_building/list`, template)
Mock.setup({
  timeout: '200-600'
})