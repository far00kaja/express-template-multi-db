// # const {Article} =require('../config/mongoose.js')

// # export const resolvers={
// #     Query:{
// #             getAllArticle:(root)=>{
// #                 return new Promise((resolve,reject)=>{
// #                     Article.find((err,articles)=>{
// #                         if(err) reject(err);
// #                         else resolve(articles);
// #                     })
// #                 })
// #             },
// #             findAArticle:(root,{id})=>{
// #                 return new Promise((resolve,reject)=>{
// #                     Article.findOne({_id:id},(err,articles)=>{
// #                     if(err) reject(err);
// #                     else resolve(articles);
// #                 })
// #             })
// #         }
// #     },
// #     Mutation:{
      
// #     },
// # };