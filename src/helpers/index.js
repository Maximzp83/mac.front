// import isEmpty from 'lodash.isempty';

/*const getSuccessMessage = (response, settings) => {
	let notifyText = '';
	// console.log(response)
	// message: 'User '+response.data.data.user_name+' succesfuly saved'

	if (!!response.data && !!response.data.data) {
		if (!isEmpty(settings.metaData) && !!settings.metaData.name) {
			notifyText += `${settings.metaData.name} <b>${
				response.data.data[settings.metaData.propertyName]
			}</b> succesfuly ${settings.operation}d`;
		}
	} else if (response.data.message) {
		notifyText += response.data.message;
	}

	// console.log(notifyText)

	return notifyText;
};
*/
/* const isValidImage = (file, size) => {
	const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

	let isFileImage = file && acceptedImageTypes.includes(file['type'])
	let acceptedImageSize = file && file.size < (size || 6291456) //2097152
	// console.log(isFileImage, acceptedImageSize)
	return !!isFileImage && !!acceptedImageSize	
} */

/* const isValidFile = (file, customSize) => {
	// const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
	// console.log(file)
	let size = customSize || 6291456;

	return file && file.size <= size 
	// let isFileImage = file && acceptedImageTypes.includes(file['type'])
} */

const isImage = fileObj => {
	return /\.(gif|jpg|jpeg|tiff|png)$/gim.test(fileObj.path);
};

const findItemBy = (property, value, itemsList) => {
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
};

/* const getIds = (itemsList, options) => {
	let ids = [];
	
	if (options && options.string) {
		for (let i = 0; i < itemsList.length; i++) {
			itemsList[i].id ? ids.push( itemsList[i].id + '') : null;
		}
		return ids;		
	}

	for (let i = 0; i < itemsList.length; i++) {
		itemsList[i].id ? ids.push( itemsList[i].id ) : null;
	}

	return ids;
} */

/* const bs64toFile = (url, filename, mimeType) => {
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename, {type:mimeType});})
  )
} */

/* const hasRightsTo = (userRole, item) => {
	if (item.meta && item.meta.roles && item.meta.roles.length) {
		if (userRole) {
			return item.meta.roles.some((role) => {
				return userRole === role
			})          
		}
	}
	return true
} */

/* const defaultDateTimeFormat = (dateStr) => {
	if (dateStr) {
	  let arr = dateStr.split(' ');
	  let resultDate;

	  if (arr.length) {
	    let date = arr[0], time = arr[1];
	    let dateArr = date.split('-');
	    let resultDateArr = []

	    for (let i = dateArr.length - 1 ; i >= 0 ; i--) {
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
} */

export {
	isImage,
	findItemBy,
}
