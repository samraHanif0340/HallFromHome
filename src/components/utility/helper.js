
const getStatusColor = (status) => {
  let statusDesc = 'Pending'
  let statusColor = 'primary'
  let backgroundColor = 'coral'
  if(status){
    if (status == 'P' || status == 'Pending') {
      statusDesc = 'Pending'
      statusColor = 'primary'
      backgroundColor = 'coral'
  
    }
    else if (status == 'A' || status == 'Approved') {
      statusDesc = 'Approved'
      statusColor = 'success'
      backgroundColor = '#1E9E4D'
    }
    else if(status == 'R' || status == 'Rejected') {
      statusDesc = 'Rejected'
      statusColor = 'error'
      backgroundColor = '#DF2D11'
    }
    else if(status == 'C' || status == 'Completed') {
      statusDesc = 'Booked'
      statusColor = 'error'
      backgroundColor = '#1E779E'
    }
    else{
  
    }
  
    let obj = {
      statusDecription: statusDesc,
      color: statusColor,
      backgroundColor: backgroundColor
    }
  
    return obj
  }

}

export {getStatusColor}
