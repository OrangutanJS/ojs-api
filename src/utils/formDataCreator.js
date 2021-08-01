export default function formDataCreator(obj) {
	const formData = new FormData();
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (obj[key] !== null && typeof obj[key] === 'object' && (obj[key].constructor === Object || obj[key].constructor === Array)) {
				formData.append(key, JSON.stringify(obj[key]));
			}else {
				formData.append(key, obj[key]);
			}
		}
	}
	return formData;
}