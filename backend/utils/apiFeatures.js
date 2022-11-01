class ApiFeature {
  // query: database query e.g: find
  // queryStr: query in url e.g: https://some-url/keyword?findThis, so keyword is queryStr having value findThis
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchByName() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
            // i telling case in-sensitive means case not matter
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // filter is for category and price range: filter categories

    // const queryStrCopy = this.queryStr
    // we will not use up one because object is passed by refrence always in javascript
    // so wo will use {...this.queryStr} instead of this.queryStr so it will create copy of it.
    const queryStrCopy = { ...this.queryStr };

    // removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryStrCopy[key]);

    // filter for Price
    // we can pass gt or lt in query string e.g http://som..?price[gt]= but we also need '$' sign along with them to apply to mongo
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|lt|lte|gte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skipProducts = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skipProducts);

    return this;
  }
}

module.exports = ApiFeature;
