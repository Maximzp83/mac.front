import isEmpty from 'lodash.isempty'

export const setHttpToken = (token) => {
    if (isEmpty(token)) {
        window.axios.defaults.headers.common['Authorization'] = null
    }

    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const getErrorMessage = (originalError) => {
	var notifyText = '';

	// console.log(originalError.data)
	var error = !!originalError.data ? originalError.data : originalError.response;
	if (!!error ) {
	  if (error.message) {
	  	notifyText += '<p>'+error.message+'</p>';
	  } else if (error.data.message) {
	  	notifyText += '<p>'+error.data.message+'</p>';
	  }

	  if (error.errors && !isEmpty(error.errors) ) {
		  let errors = error.errors;
	  // console.log(errors)
		  for (let errorMessages in errors) {
		    notifyText += '<p><b>'+errorMessages+':</b></p>';
		    // console.log(errors[errorMessages])
		    for (let i = 0; i < errors[errorMessages].length; i++) {
		      notifyText += '<p>'+errors[errorMessages][i]+'</p>';
		    }
		  }
		}
	}

	return notifyText
}

export const getSuccessMessage = (response, settings) => {
	let notifyText = '';
	// console.log(response)
	// message: 'User '+response.data.data.user_name+' succesfuly saved'

	if (!!response.data && !!response.data.data) {
		if ( !isEmpty(settings.metaData) && !!settings.metaData.name) {
			notifyText += settings.metaData.name +' <b>'+ response.data.data[settings.metaData.propertyName] + '</b> succesfuly '+settings.operation+'d';
		} 
	} else if (response.data.message) {
			notifyText += response.data.message;
		}


  // console.log(notifyText)
	
	return notifyText
}

/*export const isValidImage = (file, size) => {
	const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

	let isFileImage = file && acceptedImageTypes.includes(file['type'])
	let acceptedImageSize = file && file.size < (size || 6291456) //2097152
	// console.log(isFileImage, acceptedImageSize)
	return !!isFileImage && !!acceptedImageSize	
}*/

/*export const isValidFile = (file, customSize) => {
	// const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
	// console.log(file)
	var size = customSize || 6291456;

	return file && file.size <= size 
	// let isFileImage = file && acceptedImageTypes.includes(file['type'])
}*/

export const isImage = (fileObj) => {
	return (/\.(gif|jpg|jpeg|tiff|png)$/gmi).test(fileObj.path)
}

export const findItemBy = (property, value, itemsList) => {
	let result = null;
	if (itemsList.length) {
		for (let i = 0; i < itemsList.length; i++) {
			if (itemsList[i][property]) {
				if (itemsList[i][property] === value) {
					result = itemsList[i];
					break;
				}
			}
		}
		return result;
	}
}

/*export const getIds = (itemsList, options) => {
	var ids = [];
	
	if (options && options.string) {
		for (var i = 0; i < itemsList.length; i++) {
			itemsList[i].id ? ids.push( itemsList[i].id + '') : null;
		}
		return ids;		
	}

	for (var i = 0; i < itemsList.length; i++) {
		itemsList[i].id ? ids.push( itemsList[i].id ) : null;
	}

	return ids;
}*/

/*export const bs64toFile = (url, filename, mimeType) => {
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename, {type:mimeType});})
  )
}*/

/*export const hasRightsTo = (userRole, item) => {
	if (item.meta && item.meta.roles && item.meta.roles.length) {
		if (userRole) {
			return item.meta.roles.some((role) => {
				return userRole === role
			})          
		}
	}
	return true
}*/

/*export const defaultDateTimeFormat = (dateStr) => {
	if (dateStr) {
	  let arr = dateStr.split(' ');
	  let resultDate;

	  if (arr.length) {
	    let date = arr[0], time = arr[1];
	    let dateArr = date.split('-');
	    let resultDateArr = []

	    for (var i = dateArr.length - 1 ; i >= 0 ; i--) {
	      resultDateArr.push(dateArr[i])
	    }

	    if (resultDateArr.length) {
	      resultDate = resultDateArr.join('.')
	      resultDate += time ? ' '+time : '';
	      return resultDate
	    }
	  }
	  return dateStr
	}
	return 'date not set'
}*/