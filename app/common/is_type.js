const isType = type =>(/^\[object\s(.*)\]$/.exec(Object.prototype.toString.call(type)))[1];
const isArray = function(a) {
	return isType(a) == 'Array';
};// 注意首字母大写
const isSymbol = function(a) {
	return isType(a) == 'Symbol';
};
const isBoolean = function(a) {
	return isType() == 'Boolean';
};

const isNumber = function(a) {
	return isType(a) == 'Number';
};
const isUndefined = function(a) {
	return isType(a) == 'Undefined';
};
const isNull = function(a) {
	return isType(a) == 'Null';
};
const isObject = function(a) {
	return isType(a) == 'Object';
};
const isString = function(a) {
	return isType(a) == 'String';
};
const isFunction = function(a) {
	return isType(a) == 'Function';
};
const isDate = function(a) {
	return isType(a) == 'Date';
};
const isRegExp = function(a){
	return isType(a) == 'RegExp';
};

export {isType, isArray, isSymbol, isBoolean, isString, isNumber, isUndefined, isNull, isObject, isFunction, isDate, isRegExp}