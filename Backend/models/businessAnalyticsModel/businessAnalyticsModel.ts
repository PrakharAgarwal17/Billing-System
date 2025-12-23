import mongoose , {Schema,Model,Document, mongo, trusted} from "mongoose"

export interface businessAnalyticsInterface extends Document{
    userId:mongoose.Types.ObjectId,
    shopId:mongoose.Types.ObjectId,
    orderId:mongoose.Types.ObjectId,
    expenseId:mongoose.Types.ObjectId,
    createdAt:Date,
    totalmonthlyincome:Number,
    starProducts:insideStarProducts[]
}

interface insideStarProducts{
    productName:string,
    productQtySold:Number,
    salesDone:Number
}

const businessAnalyticsSchema = new Schema<businessAnalyticsInterface>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    expenseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Expense",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
      
    },
    totalmonthlyincome:{
        type:Number,
        required:true
    },
    starProducts:{
        type:[{
            productName:{
                type:String
            },
            productQtySold:{
                type:Number
            },
            salesDone:{
                type:Number
            }
        }]
    }
})
businessAnalyticsSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

const businessAnalytics:Model<businessAnalyticsInterface>=mongoose.model<businessAnalyticsInterface>("businessAnalytics",businessAnalyticsSchema)

export default businessAnalytics