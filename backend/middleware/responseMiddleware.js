// const responseHandler = (req, res, next) => {
//   // Add custom headers
//   res.setHeader("X-Custom-Header", "Custom Value");
//   // Modify the response status and data based on certain conditions
//   if (res.statusCode === 200 && res.body) {
//     res.status(201).json({
//       message: "Resource created successfully",
//       data: res.body,
//     });
//   } else if (res.statusCode === 204) {
//     res.status(404).json({ message: "Resource not found" });
//   }

//   // Call the next middleware
//   res.send({ m: "success" });
// };

// export default responseHandler;
