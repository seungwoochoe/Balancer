// newUserAction should be a javascript objct which contains target music "title" and user "action".
async function storeUserActionList(userActionList, newUserAction) {
	userActionList = pruneUserActionList(userActionList);
  userActionList.push(newUserAction);

  try {
    const userActionListJsonString = JSON.stringify(userActionList);
    await AsyncStorage.setItem('userActionList', userActionListJsonString);
  } catch (err) {
    console.log(err);
  }
};

function pruneUserActionList(userActionList) {
  const USER_ACTION_LIST_MAX_SIZE = 50;

  if (userActionList.length === USER_ACTION_LIST_MAX_SIZE) {
    userActionList.shift();
  }
	return userActionList;
}