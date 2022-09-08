
figlet(`www.jackchen7003.com`,{
  font:'Banner3-D',
  whitespaceBreak: true,
  horizontalLayout: 'full',
  verticalLayout:'full'
}, function(err, data){
  if(err){
    console.log('Something went wrong')
    console.dir(err)
    return
  }
  console.log(data)
})