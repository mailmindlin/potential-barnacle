function doPromise(fn, self) {
	var args = Array.prototype.slice.call(arguments, 2);
	return new Promise((yay, nay)=>{
		args.push(function(e){chrome.runtime.lastError?nay(chrome.runtime.lastError, e):yay(e);});
		fn.apply(self, args);
	});
}
window.ce=(e)=>(document.createElement(e));
var Storage = {
	ls: ()=>(doPromise(chrome.storage.sync.get, chrome.storage.sync, null)),
	getAll: files=>(doPromise(chrome.storage.sync.get, chrome.storage.sync, files)),
	get: file=>(Storage.getAll(file).then((e)=>(e[file]))),
	put: data=>(doPromise(chrome.storage.sync.set, chrome.storage.sync, data)),
	rm: file=>(doPromise(chrome.storage.sync.remove, chrome.storage.sync, file)),
	clear: file=>(doPromise(chrome.storage.sync.clear, chrome.storage.sync))
};
var View = {
	transitionTo: (name)=>{$('.view-active:not(#view-'+name+')').removeClass('view-active');$(document.getElementById('view-'+name)).addClass('view-active');}
}
