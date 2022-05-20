
const getStatusColor = (status) => {
  let statusDesc = 'Pending'
  let statusColor = 'primary'
  let backgroundColor = 'coral'
  if(status){
    if (status == 'P' || status == 'Pending' || status == 'Pending Bookings')  {
      statusDesc = 'Pending'
      statusColor = 'primary'
      backgroundColor = 'coral'
  
    }
    else if (status == 'A' || status == 'Approved' || status == 'Successfully Booked') {
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

const Signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg"
};

const detectMimeType = (b64) => {
  for (var s in Signatures) {
    if (b64.indexOf(s) === 0) {
      return Signatures[s];
    }
  }
}


export {getStatusColor,detectMimeType,Signatures}
