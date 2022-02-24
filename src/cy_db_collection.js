
var AWS = require("aws-sdk");
const DateTime = require('luxon').DateTime

AWS.config.update({
  region: process.env.AWS_REGION || "us-east-2",
});

var docClient = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues:true
});

const CyclicIndex = require('./cy_db_index')
const CyclicItem = require('./cy_db_item')

class CyclicCollection{
    constructor(collection, props={}){
        this.collection = collection
    }
    item(key){
      return new CyclicItem(this.collection,key)
    } 
    async get(key){
      let item = new CyclicItem(this.collection,key)
      return item.get()
    }
    async set(key,props,opts){
      let item = new CyclicItem(this.collection,key)
      return item.set(props,opts)
    }
    async list(limit){
          let next = null
          let results = []
          do{
            var params = {
              TableName: process.env.CYCLIC_DB,
              Limit: limit,
              IndexName: 'keys_gsi',
              KeyConditions:{
                keys_gsi:{
                  ComparisonOperator:'EQ',
                  AttributeValueList: [this.collection]
                }
              },
              ScanIndexForward:false,
              ExclusiveStartKey: next
            };
            var res = await docClient.query(params).promise();
            next = res.LastEvaluatedKey
            results = results.concat(res.Items)
          }while(results && results.length<limit)
          
          return results;
    }

    async latest(){
        let params = {
            TableName : process.env.CYCLIC_DB,
            Limit: 1,
            IndexName: 'keys_gsi',
            KeyConditions:{
              keys_gsi:{
                ComparisonOperator:'EQ',
                AttributeValueList: [this.collection]
              }
            },
            ScanIndexForward:false
          };
          let res = await docClient.query(params).promise();
          return res.Items[0]
    }

    index(name){
      return new CyclicIndex(name, this.collection)
    }

}


module.exports = CyclicCollection