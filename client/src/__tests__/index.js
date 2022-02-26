const axios = require('axios');

const getData = async (id) => {
  const result = await axios.request({
    method: 'get',
    url: `/${id}/products?_limit=3`
});
const { data } = result;
return data;
};

module.exports = getData;