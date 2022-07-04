const noCacheMiddleware = (req, res ,next) => {
  try {
    res.send('Cache-control', 'no-cache')
    next()
  } catch (error) { console.log(error) }
}