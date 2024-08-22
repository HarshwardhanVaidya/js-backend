//2. code with promises
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)). 
    catch((err) => next(err))
  } 
}


export {asyncHandler}









// const asyncHandler =  () => {}  ----
// const asyncHandler =  (func) => () => {}
// const asyncHandler =  (func) => async () => {}


//1.code with try catch 

// const asyncHandler = (fn) => async(req, res, next) => {
//   try {
//     await fn(req, res, next)
//   } catch(error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message
//     })
//   }
// }