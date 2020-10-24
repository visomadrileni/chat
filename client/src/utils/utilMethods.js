import {fetch} from 'whatwg-fetch';
import _ from 'lodash';
import moment from 'moment';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';
import queryString from 'querystring';
import {createBrowserHistory} from 'history';
import store from '../store/store';
import {reset} from '../actions/main';
import {stopChannel} from '../actions/socket';

const history = createBrowserHistory();

export function isDevelopmentEnv () {
	return process.env.NODE_ENV.toLowerCase() === 'development';
}

export function setCookie(key,value,expires) {
	return Cookies.set(key, value, { expires });
}

export function removeCookie(key){  return Cookies.remove(key); }
export function getCookieJson(key){ return Cookies.getJSON(key); }
export function getCookie(key){     return Cookies.get(key); }
export function setToken(value){ return setCookie("token", value,7); }
export function setUser(value){  return setCookie("user", value,7); }
export function getToken(){      return getCookieJson("token"); }
export function getUser () {     return getCookieJson("user"); }
export function removeToken () { return removeCookie("token"); }
export function removeUser () {  return removeCookie("user"); }

export function createAcronym (param) {
	return (param || '').toUpperCase().slice(0, 2);
}

export const resetRedux = () => {
	const {dispatch} = store;
	dispatch(reset());
}

export const logout = async () => {
	const {dispatch} = store;

	dispatch(stopChannel());
	removeToken();
	removeUser();
	resetRedux();
	history.push('/signin');
}

export const login = async (token,user) => {
	await setToken(token);
	await setUser(user);
	await resetRedux();
	await history.push('/');
}

export const sendRequest = async ({url,method,body,query}) => {
	const token = getToken();
	const fetchParams = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': token
		},
		body
	};

	if (body) {
		fetchParams.body = JSON.stringify(body);
	}

	const result = await fetch(query ? `${url}?${queryString.stringify(query)}` : url, fetchParams);

	switch (result.status) {
		case 401:
			logout();
			break;

		case 500:
			toast.error("Sorry, we've run into a problem :( try again later)");
			break;

		default:
			break;
	}

	return result.json();
}

export function searchParam (array, params) {
	let result = array;

	_.mapKeys(params, (value, key) => {
		if (value) {
			result = _.filter(array, (model) => {
				return _.includes(model[key], value.toLowerCase());
			});
		}
	});

	return result;
}

export const setConversationLastMessageDateTime = (date) => {
	const diffHours = moment(new Date()).diff(moment(date), 'hour');
	const diffDays = moment(new Date()).startOf('day').diff(moment(date).startOf('day'), 'day');

	if (diffHours <= 0) { return moment(date).fromNow(true);}
	if (diffDays <= 0)  { return moment(date).format('HH:mm'); }
	if (diffDays <= 6) {
		if (diffDays === 1) { return 'yesterday';	}
		return moment(date).format('dddd');
	}

	return moment(date).format('DD/MM/YYYY');
}
