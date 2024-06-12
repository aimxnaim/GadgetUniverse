class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        ////console.log(`queryStr: ${this.queryStr}`);
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword, // $regex is a MongoDB operator ; dont want to search exact name just a part of it
                    $options: 'i' // case insensitive
                }
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    };
    filter() {
        const queryCopy = { ...this.queryStr };

        // Fields to remove 
        const fieldstoRemove = ['keyword', 'page'];
        fieldstoRemove.forEach(el => delete queryCopy[el]);

        ////console.log(`queryCopy: ${JSON.stringify(queryCopy)}`);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        // ? regular expression meaning ; /g means global ; \b means word boundary ; \b(g|gte|lt|lte)\b means g or gte or lt or lte ; $${match} means $g or $gte or $lt or $lte

        this.query = this.query.find(JSON.parse(queryStr)); // change from JSON string to JS object
        ////console.log(`query: ${this.query}`);
        return this;
    };

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; // default page 1
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
    }
}

module.exports = APIFilters;