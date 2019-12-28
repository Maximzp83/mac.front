// import isEmpty from 'lodash.isempty';

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
import store from 'redux/store';

const initialUserRules = {create:false, update:false, delete:false, view:false};


const isImage = fileObj => {
	return /\.(gif|jpg|jpeg|tiff|png)$/gim.test(fileObj.path);
};

const findItemBy = (property, value, itemsList, returnIndex=false) => {
	let result = null; let index;
	if (itemsList.length) {
		for (let i = 0; i < itemsList.length; i++) {
			if (itemsList[i][property]) {
				if (itemsList[i][property] === value) {
					result = JSON.parse(JSON.stringify(itemsList[i]));
					index = i;
					break;
				}
			}
		}
	}
	return returnIndex ? {item: result, index: index} : result;
};

const getUserRules = (ruleType) => {
	const authUser = JSON.parse(JSON.stringify( store.getState().auth.authData.authUser ));
	let rules;
	if (authUser.role && authUser.role.rules.length) {
		rules = findItemBy('ruleType', ruleType, authUser.role.rules);
	} 
	return rules || initialUserRules;
}

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

export { isImage, findItemBy, getUserRules };
