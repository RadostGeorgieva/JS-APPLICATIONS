function loadRepos() {
	let username = document.getElementById("username").value;
	const url = `https://api.github.com/users/${username}/repos`;
	let list = document.getElementById("repos");
	fetch (url)
	.then(onHeaders)
	.then(onSuccess)
	.catch(onError);

	function onHeaders(res) {
		if(!res.ok) {
			throw 'Error'
		}
		return res.json();
	}
	function onSuccess(data) {
		console.log(data[0]);
	list.replaceChildren(...data.map(createListItem));
	console.log(data)

	}
	function onError(error) {
		list.textContent = error;
	}
 	function createListItem({html_url,full_name}) {
		let li = document.createElement("li");
		let a = document.createElement("a");
		a.href = html_url;
		a.textContent = full_name;
		li.appendChild(a);
		return li;
	}
}