export const host = "http://localhost:5000";

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const addFriendRoute = `${host}/api/auth/addFriend`;
export const searchRoute = `${host}/api/auth/search`;

export const createRoomRoute = `${host}/api/room/addRoom`;
export const getAllRoomsRoute = `${host}/api/room/getAllRoom`;

export const sendMessageRoute = `${host}/api/message/addMsg`;
export const getAllMessagesRoute = `${host}/api/message/getMsg`;
export const sendMessageRoomRoute = `${host}/api/message/addMsgRoom`;
export const getAllMsgRoomRoute = `${host}/api/message/getAllMsgRoom`;